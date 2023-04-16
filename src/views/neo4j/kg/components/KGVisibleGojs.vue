<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2023/4/10 16:05
 * @description：基于gojs的流域关系拓扑图显示
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div id="chart-wrap">
    <div id="myDiagram" style="width:950px; height:700px; background-color: #DAE4E4; margin: 0 auto" v-show="!visibles.nullVisible"></div>
    <el-empty description="暂无内容" v-show="visibles.nullVisible" image-size="500"></el-empty>
  </div>
</template>

<script>
import go from 'gojs'
import RelationApi from "../../../../api/neo4j/relationApi";

export default {
  name: "KGVisibleGojs",
  data(){
    return{
      nodes:[],
      links:[],
      currentDbId:0,
      currentDbName:'',
      currentNodeId:0,
      visibles:{
        nullVisible:false
      },
      queryParams:{
        database:null,
        nodeId:0,
        length:30,
        relType:["上游"],
        searchEntity:null
      }
    }
  },
  props:{
    currentNode: {
      type: Array,
      default: () => [{}]
    },
    queryProps:{
      type:Object,
      default: () => {}
    }
  },
  methods:{
    initDbInfo(){
      this.currentDbName = localStorage.getItem("instanceName")
      // this.currentId = this.$route.params.id
      this.currentDbId = localStorage.getItem("instanceId")
      this.queryParams.database = this.currentDbId
    },
    init(){
      const $ = go.GraphObject.make; // 通过go.GraphObject的make属性，创建一个GoJS对象

      //使用 go 对象创建：
      // var diagram = new go.Diagram("myDiagram");

      //或以构造器方式创建；
      const diagram = $(go.Diagram, "myDiagram", {
        initialContentAlignment: go.Spot.Center, // 绘制的元素相对画布居中
        "undoManager.isEnabled": true, // 是否可撤销编辑
        layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
          { angle: 0, layerSpacing: 75 }),
        hoverDelay : 100,
        "toolManager.hoverDelay": 100, //tooltip提示显示延时
        "toolManager.toolTipDuration": 10000, //tooltip持续显示时间
      });

      diagram.nodeTemplate =
        $(go.Node, "auto",
          { background: "#44CCFF" },
          $(go.TextBlock, "Default Text",
            { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
            new go.Binding("text", "name")),
          {mouseHover:(e, node) => {
              console.log("e:",e)
            }},
          {//  悬浮提示
            toolTip:
              $("ToolTip",
                $(go.TextBlock, { margin: 4 },
                  new go.Binding("text", "tooltip"))
              ),
          }
        );

      diagram.linkTemplate = $(go.Link, {
          selectable: true, //连接线是否可选
          relinkableFrom: true,//出发点是否可以改变
          relinkableTo: true,//目标点是否可以改变
        },new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),//记录loc
        $(go.Shape, {
          strokeWidth: 2,//节点连接线宽度
          stroke: "#F60"//颜色
        }),
        $(go.Shape, {
          toArrow: "Standard",
          fill: "red",//箭头填充色
          stroke: "blue"//外边框颜色
        }),//箭头
        $(go.TextBlock, "Default Text",
          { margin: 0 , stroke: "black", font: "bold 16px sans-serif" },
          new go.Binding("text", "label")),
      );
      let nodelist = []
      for (let node of this.nodes){
        let item = {
          key:node.key,
          name:node.name,
          color:"aliceblue",
          tooltip:`水位信息
                    1000000m
                    2000000m
                    3000000m`
        }
        nodelist.push(item)
      }

      let linklist = []
      for (let link of this.links){
        let item = {
          from:link.from,
          to:link.to,
          label:link.label
        }
        linklist.push(item)
      }
      diagram.model = new go.GraphLinksModel(nodelist, linklist);

    },
    getLinks(){
      const _this = this
      if (null == this.queryParams.database){
        this.$message.error("流域概化图必须要指定图谱")
        this.visibles.nullVisible = true
        return false;
      }

      if (this.queryParams.relType.length == 0){
        this.$message.error("流域概化图必须要指定关系")
        this.visibles.nullVisible = true
        return false;
      }

      if (null == this.queryParams.nodeId || this.queryParams.nodeId == 0){
        this.$message.error("流域概化图必须要指定起点")
        this.visibles.nullVisible = true
        return false;
      }

      let types = ''
      for (let s of this.queryParams.relType){
        types = types + s
      }
      this.queryParams.relType = types
      RelationApi.getTopoGraph(this.queryParams).then(responce => {
        _this.nodes = responce.data.data.nodes
        _this.links = responce.data.data.links
        _this.visibles.nullVisible = false
        _this.init()
      })
    }
  },
  mounted() {
    this.initDbInfo();
  },
  watch:{
    currentNode: {
      handler(newValue, oldValue) {
        this.currentNodeId = newValue[0]._id
        this.queryParams.nodeId = this.currentNodeId
        this.getLinks()
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    },
    queryProps:{
      handler(newValue, oldValue) {
        console.log("触发更新")
        this.queryParams.nodeId = this.currentNodeId
        this.queryParams.length = newValue.length == null ? 30 : this.queryProps.length
        this.queryParams.relType = newValue.relType
        let enScales = ""
        if (newValue.enScales.length > 0){
          enScales = enScales + newValue.enScales[0]
        }

        let reportLevels = ""
        if (newValue.reportLevels.length > 0){
          reportLevels = reportLevels + newValue.reportLevels[0]
        }
        for (let i = 1; i < newValue.enScales.length; i++){
          enScales = enScales + ","+newValue.enScales[i]
        }

        for (let i = 1; i < newValue.reportLevels.length; i++){
          reportLevels = reportLevels + ","+newValue.reportLevels[i]
        }
        const searchEntity = {
          enScale: newValue.enScales,
          reportLevel: newValue.reportLevels
        }
        // this.queryParams.searchEntity = searchEntity
        this.queryParams.enScale = enScales
        this.queryParams.reportLevel = reportLevels
        this.getLinks()
      },
      deep: true,
      immediate:true
    }
  }
}
</script>

<style scoped>

</style>
