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
import relationApi from "../../api/neo4j/relationApi";
import VisUtils from "../../utils/VisUtils";


export default {
  name: "KGVisibleVisNetwork",
  data() {
    return {
      nodes: null,//顶点集
      edges: null,//边集
      options: null,//图谱配置

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

    //图谱种类.是本体图还是实例图,默认本体图
    kgType: {
        type:Number,
        default:0
    }
      ,
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
        console.log("kgType"+this.kgType);
      if(this.kgType == 1)
          this.getOntologyKG();
      else if(this.kgType == 2)
          this.getInstanceKG();
    },


      getOntologyKG(){
          this.loading = true
          let _this = this
          //默认显示图，用于页面初始化时候的显示
          relationApi.getOntologyKGLinks().then(({data}) => {
              console.log(data);
              let nodeVos = [];
              let relVos = [];

              for (let item of data.nodeVos)
              {
                  let nodeItem = {
                      id: item.neoId,
                      label: item.name,
                  }
                  nodeVos.push(nodeItem)
              }

              for (let item of data.relVos)
              {
                  let linkItem = {
                      from: item.from,
                      to: item.to,
                      label: item.name
                  }
                  relVos.push(linkItem)
              }
              const datas = {
                  nodes:nodeVos,
                  edges:relVos
              };
              console.log(datas);
              const container = this.$refs.KGNetwork;
              _this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
              _this.network = new Vis.Network(container, datas, _this.options);
              _this.setLoading()
          })
      },

      getInstanceKG(){
          this.loading = true
          let _this = this
          //默认显示图，用于页面初始化时候的显示
          relationApi.getInstanceKGLinks().then(({data}) => {
              console.log(data);
              let nodeVos = [];
              let relVos = [];

              for (let item of data.nodeVos)
              {
                  let nodeItem = {
                      id: item.neoId,
                      label: item.name,
                  }
                  nodeVos.push(nodeItem)
              }

              for (let item of data.relVos)
              {
                  let linkItem = {
                      from: item.from,
                      to: item.to,
                      label: item.name
                  }
                  relVos.push(linkItem)
              }
              const datas = {
                  nodes:nodeVos,
                  edges:relVos
              };
              console.log(datas);
              const container = this.$refs.KGNetwork;
              _this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
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
    },
      kgType: {
          handler(newValue, oldValue) {
              //this.initKG();
          },
          deep: true
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


