<template>
  <div>
    <div v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <div id="KGNetwork" ref="KGNetwork" :style="{width:KGSize.width+ 'px',height:KGSize.height+ 'px'}"></div>
    </div>

  </div>
</template>

<script>
import Vis from "vis-network/dist/vis-network.min"
import VisUtils from "../../../../utils/VisUtils";
import rescuePlanApi from "../../../../api/neo4j/rescuePlanApi";

export default {
  name: "KGVisiableRescuePlanNetwork",
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
      finalNodeVos:null,//记录当前查找的图谱所有显示节点的信息
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
    //当前监测对象名称
    currentName:{
      type:String,
      default:""
    },
    //当前知识图谱ID
    currentId: {
      type:String,
      default:""
    },
    //绘图标志
    drawFlag: {
      type:Boolean,
      default:false
    },
    //当前监测对象类型
    currentType:{
      type:String,
      default:""
    },
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
    ])
  },
  mounted() {

  },
  methods: {
    initKG() {
      if(this.currentName=="工程险情"){
        this.loading = true
      let _this = this
      rescuePlanApi.getRescueInitLink(this.currentName,this.currentType,"5084A06CAF2C4AF097DC8B2D9A75F406")
        .then(({data}) => {
          console.log("initKG-->data:",data)
          this.finalNodeVos = data.data.finalNodeVos;
          //console.log("initKG-->finalNodeVos:",this.finalNodeVos)
          const datas = VisUtils.handleRelLinkVisiblesHashNode3(data)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;
          _this.options = VisUtils.setVisibleOption(4)
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
          _this.network.on('click',function(properties){
            let selectedNodeId = properties.nodes[0];
            _this.sendMessage(selectedNodeId);
          })

        })
      }
      this.loading = true
      let _this = this
      rescuePlanApi.getRescuePlanLink(this.currentName,this.currentType,"5084A06CAF2C4AF097DC8B2D9A75F406")
        .then(({data}) => {
          console.log("initKG-->data:",data)
          this.finalNodeVos = data.data.finalNodeVos;
          //console.log("initKG-->finalNodeVos:",this.finalNodeVos)
          const datas = VisUtils.handleRelLinkVisiblesHashNode3(data)
          _this.getCurrentNodeType(data.data)
          const container = this.$refs.KGNetwork;
          //为了去除结点悬停事件,删除了options中的title属性
          _this.options = VisUtils.setVisibleOption(4)
          _this.network = new Vis.Network(container, datas, _this.options);
          _this.setLoading()
          _this.network.on('click',function(properties){
            let selectedNodeId = properties.nodes[0];
            _this.sendMessage(selectedNodeId);
          })

        })

    },
    sendMessage(selectedNodeId){
      let selectedNodeName = null;
      let nodeType = null;

      console.log("initKG-->finalNodeVos:",this.finalNodeVos)
      for (let item of this.finalNodeVos){
        if(item.node._id == selectedNodeId){

          if(item.nodeType[1] == "抢护方法"){
            selectedNodeName = item.node.抢护方法名称;
            nodeType = "抢护方法";
            break
          }else{
            selectedNodeName = item.node.工程险情名称;
            nodeType = "工程险情";
            break
          }
        }
      }
      if(selectedNodeName!=null)
        this.$emit("selectedNodeName", selectedNodeName,nodeType)
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
    /*visibleSettings:{
      handler(newValue,oldValue) {
        this.settings.visibleTypeFlag = newValue.visibleTypeFlag
        this.settings.length = newValue.length
        this.settings.relType = newValue.relType
        console.log("小图显示参数为：",this.settings)
        // this.initKG()
      },
      deep:true
    },*/
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
    },
    //点击查询按钮进行绘图
    drawFlag: {
      handler(newValue,oldValue) {
        this.initKG()
      }
    },
    currentName: {
      handler(newValue, oldValue) {
        console.log(newValue)
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
