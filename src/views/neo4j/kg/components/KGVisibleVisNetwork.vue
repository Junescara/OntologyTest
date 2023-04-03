<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/2 17:34
 * @description：基于vis-network实现的图谱可视化
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <div v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <div id="KGNetwork" ref="KGNetwork" :style="{width:KGSize.width+ 'px',height:KGSize.height+ 'px'}" v-show="!visibles.nullVisible"></div>
      <el-empty description="暂无内容" v-show="visibles.nullVisible"></el-empty>
    </div>

  </div>
</template>

<script>
import Vis from "vis-network/dist/vis-network.min"
import relationApi from "../../../../api/neo4j/relationApi";
import EchartsUtils from "../../../../utils/EchartsUtils";
import VisUtils from "../../../../utils/VisUtils";
import CommonUtils from "../../../../utils/commonUtils";

export default {
  name: "KGVisibleVisNetwork",
  data() {
    return {
      nodes: null,
      edges: null,
      options: null,
      network: null,
      currentNodeId:null,
      settings:{
        visibleTypeFlag: 5,
        length:2,
        relType:[],
      },
      loading:true,
      currentNodeType:[],//当前的结点类型，用作图例显示
      currentDbId:null,
      currentDbName:null,
      KGSize:{
        width:950,
        height:700,
      },
      visibles:{
        nullVisible:false
      }
    }
  },
  props: {
    currentNode: {
      type: Array,
      default: () => [{}]
    },
    visibleSettings:{
      type:Object,
      default: () => {}
    },
    currentVisibleSize:{
      type:Number,
      default:0 //默认小图
    }
  },
  created() {
    this.currentDbId = localStorage.getItem('instanceId')
    this.currentDbName = localStorage.getItem('instanceName')

    //初始化查询节点
    // if (this.currentDbName == '椒江流域知识图谱'){
    //   this.currentNodeId = 3667
    // }else if (this.currentDbName == '屯溪流域知识图谱'){
    //   this.currentNodeId = 4491
    // }else if (this.currentDbName == '钱塘江流域知识图谱'){
    //   this.currentNodeId = 4615
    // }



    this.nodes = new Vis.DataSet([  // nodes是节点
      {id: 1, label: 'Node 1',level: 1},
      {id: 2, label: 'Node 2',level: 2},
      {id: 8, label: 'Node 8',level: 2},
      {id: 9, label: 'Node 9',level: 2},
      {id: 10, label: 'Node 10',level: 2},
      {id: 3, label: 'Node 3',level: 2},
      {id: 4, label: 'Node 4',level: 3},
      {id: 5, label: 'Node 5',level: 3},
      {id: 6, label: 'Node 6',level: 4},
      {id: 7, label: 'Node 7',level: 5},
    ]);
    this.edges = new Vis.DataSet([  // edges是线
      {from: 1, to: 2},  // 决定了节点从左往右的顺序
      {from: 1, to: 3},
      {from: 1, to: 8},
      {from: 1, to: 9},
      {from: 1, to: 10},
      {from: 2, to: 4},
      {from: 2, to: 5},
      {from: 5, to: 6},
      {from: 6, to: 7},
    ]);
  },
  mounted() {
    this.initKG()
  },
  methods: {
    initKG() {
      this.loading = true
      let _this = this

      //不设置初始节点，必须要求人工选择节点
      if (this.settings.visibleTypeFlag != 5){
        if (this.currentNodeId == null){
          this.visibles.nullVisible = true
          this.loading = false
          this.$message.error("必须要选择一个初始节点")
          return false;
        }
      }

      //老版本的处理逻辑
      if (this.settings.visibleTypeFlag == 0){
        relationApi.getKGVisiblesOutData(this.currentNodeId,this.currentDbId).then(({data}) => {

          const datas = VisUtils.handleOutVisibles(data)
          //过滤一下data中的数据
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;
          _this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
        })
      }else if (this.settings.visibleTypeFlag == 1){
          relationApi.getKGVisiblesInData(this.currentNodeId,this.currentDbId).then(({data}) => {
            const datas = VisUtils.handleInVisibles(data)
            _this.getCurrentNodeType(data.data)
            const container = this.$refs.KGNetwork;
            _this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
            _this.network = new Vis.Network(container, datas, _this.options);
            _this.setLoading()
          })
      }else if (this.settings.visibleTypeFlag == 2){
        relationApi.getKGVisiblesData([this.currentNodeId],this.currentDbId).then(({data}) => {
          //这里获取的是生成的全面数据
          const datas = VisUtils.handleWholeVisibles(data)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;
          _this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
        })
      }else if (this.settings.visibleTypeFlag == 3){
        //可视化整个关系链
        const params = {
          nodeId:this.currentNodeId,
          length: this.settings.length,
          database:this.currentDbId
        }
        relationApi.getLinkedRels(params).then(({data}) => {
          const datas = VisUtils.handleRelLinkVisibles(data)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;
          _this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
        })
      }else if (this.settings.visibleTypeFlag == 4){
        if (this.settings.relType.length == 0){
          this.$message.error("流域概化图必须要指定关系")
          this.visibles.nullVisible = true
          this.loading = false
          return false;
        }
        //显示流域概化图，暂且设定为显示断面的关系
        const params = {
          nodeId:this.currentNodeId,
          length: 15,
          relType:this.settings.relType[0],
          relDir:0,
          database:this.currentDbId
        }
        for (let i = 1; i < this.settings.relType.length; i++){
          params.relType = params.relType + '，' + this.settings.relType[i]
        }
        relationApi.getLinkedRels(params).then(({data}) => {
          if (data.data.finalNodeVos.length == 0 && data.data.relationItems.length == 0){
            this.visibles.nullVisible = true
            this.loading = false
            return false
          }else {
            this.visibles.nullVisible = false
          }
          const datas = VisUtils.handleRelLinkVisibles(data)
          console.log("datas==",datas)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;
          _this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
        })
      }else if (this.settings.visibleTypeFlag == 5){
        //默认显示图，用于页面初始化时候的显示
        relationApi.getDefaultRelLinks(this.currentDbId).then(({data}) => {
          const datas = VisUtils.handleRelLinkVisibles(data)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;
          _this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
        })
      }
    },
    setLoading(){
      const _this = this
      this.network.once('afterDrawing',() => {
        console.log("图像加载完成")
        _this.loading = false
      })
    },
    getCurrentNodeType(data){
      let set = new Set();
      if (data.startNode !== undefined){
        for (let item of data.startNode.nodeType){
          set.add(item)
        }
      }

      if (data.endNodes !== undefined){
        for (let item of data.endNodes.nodeList){
          for (let i of item.nodeType){
            set.add(i)
          }
        }
      }

      if (data.endNode !== undefined){
        for (let item of data.endNode.nodeType){
          set.add(item)
        }
      }

      if (data.startNodes !== undefined){
        for (let item of data.startNodes.nodeList){
          for (let i of item.nodeType){
            set.add(i)
          }
        }
      }

      if (data.kgVisibleInVoList !== undefined){
        const node = data.kgVisibleInVoList[0]
        for (let item of node.endNode.nodeType){
          set.add(item)
        }

        for (let item of node.startNodes.nodeList){
          for (let i of item.nodeType){
            set.add(i)
          }
        }
      }

      if (data.kgVisibleOutVoList !== undefined){
        const node = data.kgVisibleOutVoList[0]
        for (let item of node.startNode.nodeType){
          set.add(item)
        }

        for (let item of node.endNodes.nodeList){
          for (let i of item.nodeType){
            set.add(i)
          }
        }
      }

      if (data.finalNodeVos !== undefined){
        for (let item of data.finalNodeVos){
          for (let i of item.nodeType){
            set.add(i)
          }
        }
      }

      this.currentNodeType = Array.from(set);
      console.log('当前类型包括：',this.currentNodeType)
    }
  },
  watch:{
    currentNode: {
      handler(newValue, oldValue) {
        console.log("currentId",newValue[0]._id)
        this.currentNodeId = newValue[0]._id
        this.initKG()
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    },
    visibleSettings:{
      handler(newValue,oldValue) {
        this.settings.visibleTypeFlag = newValue.visibleTypeFlag
        this.settings.length = newValue.length
        this.settings.relType = newValue.relType
        console.log("小图显示参数为：",this.settings)
        this.initKG()
      },
      deep:true
    },
    currentNodeType:{
      handler(newValue,oldValue) {
        this.$emit("legend",this.currentNodeType)
      },
      deep:true
    },
    currentVisibleSize:{
      handler(newValue,oldValue) {
        if (newValue == 0){
          this.KGSize.width = 800
          this.KGSize.height = 500
        }else if (newValue == 1){
          this.KGSize.width = 1600
          this.KGSize.height = 800
        }
      },
    }
  }
}
</script>

<style scoped>
#KGNetwork{
  /*width: 800px;*/
  /*height: 500px;*/
  width: 1200px;
  height: 1200px;
}

.smallKG{
  width: 800px;
  height: 500px;
}

.largeKG{
  width: 1200px;
  height: 1200px;
}
</style>


