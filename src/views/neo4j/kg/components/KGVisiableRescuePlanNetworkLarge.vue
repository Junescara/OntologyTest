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
import VisUtils from "../../../../utils/VisUtils";
import rescuePlanApi from "../../../../api/neo4j/rescuePlanApi";

export default {
  name: "KGVisiableRescuePlanNetworkLarge",
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
    //当前流域ID
    currentId: {
      type:String,
      default:""
    },
    //当前监测对象类型
    currentType:{
      type:String,
      default:""
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

  },
  mounted() {

  },
  methods: {
    initKG() {
      this.loading = true
      let _this = this

      rescuePlanApi.getRescuePlanLink(this.currentName,this.currentType,"5084A06CAF2C4AF097DC8B2D9A75F406")
        .then(({data}) => {
          const datas = VisUtils.handleRelLinkVisiblesHashNode(data)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;
          _this.options = VisUtils.setVisibleOption(4)
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
      console.log('当前类型包括：',this.currentNodeType)
    }
  },
  watch:{
    visibleSettings:{
      handler(newValue,oldValue) {
        this.settings.visibleTypeFlag = newValue.visibleTypeFlag
        this.settings.length = newValue.length
        this.settings.relType = newValue.relType
        console.log("newValue=====",this.settings.relType)
        console.log("大图显示的参数为：",this.settings)
        // this.initKG()
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
