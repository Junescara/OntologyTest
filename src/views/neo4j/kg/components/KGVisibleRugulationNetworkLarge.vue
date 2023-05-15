<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/2 17:34
 * @description：基于vis-network实现的图谱可视化
 * @modified By：Lyu
 * @version:     1.0
 -->
<template>
  <div>
    <div v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <div id="KGNetwork" ref="KGNetwork" :style="{width:1600+ 'px',height:1600+ 'px'}"></div>
    </div>

  </div>
</template>

<script>
import Vis from "vis-network/dist/vis-network.min"
import relationApi from "../../../../api/neo4j/relationApi";
import EchartsUtils from "../../../../utils/EchartsUtils";
import VisUtils from "../../../../utils/VisUtils";
import CommonUtils from "../../../../utils/commonUtils";
import regulationApi from "../../../../api/neo4j/regulationApi";

export default {
  name: "KGVisibleRegulationNetworkLarge",
  data() {
    return {
      nodes: null,
      edges: null,
      options: null,
      network: null,
      currentNodeId:3667,
      settings:{
        visibleTypeFlag: 4,
        length:2,
        relType:[],
      },
      loading:true,
      currentNodeType:[],//当前的结点类型，用作图例显示
      currentDbId:null,
      currentDbName:null,
      KGSize:{
        width:800,
        height:500,
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
    },
    //当前查询名称
    currentName:{
      type:String,
      default:""
    },
    //当前调度要素
    currentAtt: {
      type:String,
      default:""
    },
    //调度要素预报值
    attValue: {
      type:String,
      default:""
    },
    //当前流域ID
    currentId: {
      type:String,
      default:""
    },
    //绘图标志
    drawFlag: {
      type:Boolean,
      default:false
    },
    //默认绘图标志
    drawDefault: {
      type:Boolean,
      default:false
    },
    typeColors: {
      type:Object,
      default: () => {}
    }
  },
  created() {
    this.currentDbId = localStorage.getItem('instanceId')
    this.currentDbName = localStorage.getItem('instanceName')

    if (this.currentDbName == '椒江流域知识图谱'){
      this.currentNodeId = 3667
    }else if (this.currentDbName == '屯溪流域知识图谱'){
      this.currentNodeId = 4491
    }else if (this.currentDbName == '钱塘江流域知识图谱'){
      this.currentNodeId = 4615
    }

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
    this.defaultKG()
  },
  methods: {
    defaultKG() {
      this.loading = true
      let _this = this
      regulationApi.getDefaultRelLinks(this.currentId)
        .then(({data}) => {
          const datas = VisUtils.handleRelLinkVisiblesHashNode2(data)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;

          // 遍历节点数据，为每一个节点根据其类型名称设置颜色，并将颜色存储到节点数据的color属性中
          const groups = {}
          for (const type in this.typeColors) {
            if (this.typeColors.hasOwnProperty(type)) {
              const color = this.typeColors[type]
              groups[type] = { color }
            }
          }
          _this.options = VisUtils.setVisibleOption(4)
          _this.options.groups = groups
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
        })

    },
    initKG() {
      this.loading = true
      let _this = this
      regulationApi.getSchedulePlanLink(this.currentName,this.currentAtt,this.attValue,this.currentId)
        .then(({data}) => {
          const datas = VisUtils.handleRelLinkVisiblesHashNode2(data)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;

          // 遍历节点数据，为每一个节点根据其类型名称设置颜色，并将颜色存储到节点数据的color属性中
          const groups = {}
          for (const type in this.typeColors) {
            if (this.typeColors.hasOwnProperty(type)) {
              const color = this.typeColors[type]
              groups[type] = { color }
            }
          }

          _this.options = VisUtils.setVisibleOption(4)
          _this.options.groups = groups
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
        })

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
      this.$emit('child-event',this.currentNodeType)
      console.log('当前类型包括：',this.currentNodeType)
    }
  },
  watch:{
    // currentNode: {
    //   handler(newValue, oldValue) {
    //     console.log("currentId",newValue[0]._id)
    //     this.currentNodeId = newValue[0]._id
    //     this.initKG()
    //   },
    //   // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
    //   // 所以这里设置了deep:true，vue文档有说明
    //   deep: true
    // },
    visibleSettings:{
      handler(newValue,oldValue) {
        this.settings.visibleTypeFlag = newValue.visibleTypeFlag
        this.settings.length = newValue.length
        this.settings.relType = newValue.relType
        console.log("newValue=====",this.settings.relType)
        console.log("大图显示的参数为：",this.settings)
        this.initKG()
      },
      deep:true,
      immediate:true
    },
    currentNodeType:{
      handler(newValue,oldValue) {
        this.$emit("legend",this.currentNodeType)
      },
      deep:true
    },
    //点击查询按钮进行绘图
    drawFlag: {
      handler(newValue,oldValue) {
        this.initKG()
      }
    },
    //页面打开时绘制默认图
    drawDefault: {
      handler(newValue,oldValue) {
        this.defaultKG()
      }
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


