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
      <p >{{title}}</p>
      <div id="KGNetwork" ref="KGNetwork" :style="{width:KGSize.width+ 'px',height:KGSize.height+ 'px'}" v-show="!visibles.nullVisible"></div>
      <el-empty description="暂无内容" v-show="visibles.nullVisible"></el-empty>
    </div>

  </div>
</template>

<script>
import Vis from "vis-network/dist/vis-network.min"
import relationApi from "../../api/neo4j/relationApi";
import VisUtils from "../../utils/VisUtils";
import { Network } from 'vis-network/standalone';


export default {
  name: "KGVisibleVisNetwork",
  data() {
    return {

      datas:{},  //图谱数据集.包含边集合与点集合
      arrtibuteDatas:{},//属性层图谱数据集
      options: null,//图谱配置

        title:"图谱浏览",
        network:null,
        KGLevel:0,
        neoId:"",
        sname:"",
        nodes:[],
        edges:[],
        kgType:"",
        //nodes:null,
        //edges:null,

      //network: null,
      //currentNodeId:null,
      settings:{
        visibleTypeFlag: 5,
        length:2,
        relType:[],
      },
      loading:true,
      //currentNodeType:[],//当前的结点类型，用作图例显示
      //currentDbId:null,
      //currentDbName:null,
      KGSize:{
        width:1200,
        height:800,
      },
      visibles:{
        nullVisible:false
      }
    }
  },
  props: {
      neoIdProp:{
          type:String,
          default:""
      },

    //图谱种类.是本体图还是实例图,默认本体图
    kgTypeProp: {
        type:Number,
        default:0
    },
      snameProp:{
          type:String,
          default:"",
      }
  },
  created() {
    //this.currentDbId = localStorage.getItem('instanceId')
    //this.currentDbName = localStorage.getItem('instanceName')

    //初始化查询节点
    // if (this.currentDbName == '椒江流域知识图谱'){
    //   this.currentNodeId = 3667
    // }else if (this.currentDbName == '屯溪流域知识图谱'){
    //   this.currentNodeId = 4491
    // }else if (this.currentDbName == '钱塘江流域知识图谱'){
    //   this.currentNodeId = 4615
    // }




  },
  mounted() {
      this.neoId = this.neoIdProp;
      this.sname = this.snameProp;
      this.kgType = this.kgTypeProp;
      //this.KGLevel = 0
    this.initKG()
  },
  methods: {

    initKG() {
        console.log("kgType:", this.kgType, " this.sname:", this.sname, " this.neoId:", this.neoId);
        if (this.kgType == 1)//本体图
        {
            this.title = this.sname + "本体图谱";
            this.getOntologyKG();
        }
        else if (this.kgType == 2) {//实例图{
            this.title = this.sname + "实例图谱";
            this.getInstanceKG();
        }
    },

      getParams(neoId,sname,kgType) {
          this.neoId = neoId;
          this.sname = sname;
          this.kgType = kgType;
          this.KGLevel = 0
          this.initKG();
      },

      /**
       * 获取并显示本体图谱
       */
      getOntologyKG(){
          this.loading = true
          console.log("getOntologyKG ==> this.neoId",this.neoId);
          //默认显示图，用于页面初始化时候的显示
          relationApi.getOntologyKGLinks(this.neoId).then(({data}) => {
              this.handleKGData(data)
          })
      },

      /**
       * 获取并显示实例图谱
       */
      getInstanceKG(){
          this.loading = true
          //默认显示图，用于页面初始化时候的显示
          relationApi.getInstanceKGLinks(this.neoId).then(({data}) => {
              this.handleKGData(data)
          })
      },

      /**
       * 对http请求获得的data数据进行处理,并且显示
       * @param data
       */
      handleKGData(data){
          console.log("handleKGData ==> data",data);

          //把2后端传递的子节点连接到父节点上
          this.nodes = [];
          this.edges = [];

          if(this.kgType == 1){
              this.connectNodeToFather(data,this.sname,this.neoId,"拥有","#97C2FC",15,200);
          }else if(this.kgType == 2){


              this.nodes.push({
                  id:this.neoId,
                  label:this.sname,
                  color: { background:"#60a4d1"},
                  size:25,
              })

              for(let i = 0;i < data.subData.length;i++){
                  this.connectNodeToFather(data.subData[i].list,data.subData[i].ontoName,data.subData[i].ontoNeoId,"实例化","#d1edff",15,150);
                  this.edges.push({
                      from: this.neoId,
                      to: data.subData[i].ontoNeoId,
                      label:"拥有",
                  });
              }
          }
          this.datas = {
              nodes:this.nodes,
              edges:this.edges,
          }


          let _this = this
          console.log("handleKGData",this.datas);
          const container = this.$refs.KGNetwork;
          this.options = VisUtils.setVisibleOption(this.settings.visibleTypeFlag)
          this.network = new Vis.Network(container, this.datas, _this.options);;


          this.network.on('click',function(properties){
              console.log(properties);
              _this.handleKGClick(properties);
          })

          _this.setLoading()
      },


      /**
       * 将data中含有的结点以指定的方式连接到指定的结点上
       */
      //把后端返回的子节点连接到父节点下
      connectNodeToFather(data,fatherName,fatherId,connectType,color,size,length){
          let _this = this
          let nodes = [];
          let edges = [];

          let fatherNode = {
              id: fatherId,
              label: fatherName,
              color: { background:"#29a7fc"},
              size:20,
              /*parentNode:"",
              foldState:1//1是折叠状态,0是非折叠状态,2是附属结点,不需要折叠*/
          }
          this.nodes.push(fatherNode)

          for (let item of data)
          {
              let nodeItem = {
                  id: item.neoId,
                  label: item.name,
                  color: { background:color},
                  size:size,
                  /*parentNode:"",
                  foldState:1//1是折叠状态,0是非折叠状态,2是附属结点,不需要折叠*/
              }
              this.nodes.push(nodeItem)
          }

          for (let item of data)
          {
              let linkItem = {
                  from: fatherId,
                  to: item.neoId,
                  label: connectType,
                  length:length,
                  /*parentNode:""*/
              }
              this.edges.push(linkItem)
          }

      },

    setLoading(){
      const _this = this
        this.network.once('afterDrawing',() => {
        console.log("图像加载完成")
        _this.loading = false
      })
    },

      /**
       * 处理图谱结点的点击事件
       */
      handleKGClick (properties){
          let _this = this

          if(this.KGLevel == 1)
              return;

          console.log("properties",properties)
          if(properties.edges.length!=0){
              //处理边的点击事件

          }
          if(properties.nodes.length!=0){
              //处理顶点结点的点击事件

              if(this.kgType==1){
                  //处理图谱是本体图的情况


                  relationApi.getOntologyNodeById(properties.nodes[0]).then(({data}) => {
                      console.log("getOntologyNodeById", data)
                      this.handleClickData(data,this.kgType);


                      /*//查看该结点是否是折叠状态
                  var isFloded = true;


                  this.nodes.forEach((index, item) => {
                      if(item.parentNode == properties.nodes[0]){
                          isFloded = false;
                      }
                  });


                  console.log("isFloded",isFloded)
                  if(isFloded){
                      //被点击的结点无附属结点,则需要查询属性,有属性时添加结点
                      relationApi.getNodeById(properties.nodes[0]).then(({data}) => {
                          console.log("getNodeById",data)
                          data.propClzList.forEach((index, item) => {

                              let nodeItem = {
                                  id: item.neoId,
                                  label: item.name,
                                  parentNode:properties.nodes[0],
                                  foldState:2
                              }
                              _this.nodes.add(nodeItem)
                          });

                          data.propClzList.forEach((index, item) => {

                              let linkItem = {
                                  from: item.mainNeoId,
                                  to: item.neoId,
                                  label: "拥有",
                                  parentNode:properties.nodes[0]
                              }
                              _this.edges.add(linkItem)
                          });
                          /!*for (let item of data.propClzList)
                          {
                              let linkItem = {
                                  from: item.mainNeoId,
                                  to: item.neoId,
                                  label: "拥有",
                                  parentNode:properties.nodes[0]
                              }
                              _this.edges.add(linkItem)
                          }*!/

                          console.log("getNodeById===>this.datas",_this.datas)
                          window.network.redraw();
                          //window.network.getSeed();
                          window.network.setData(_this.datas);

                      })

                  }else{
                      //sub_nodes.length!=0,则去除该结点的下属结点
                      var newNodeList = [];
                      var newEdgeList = [];

                      this.nodes.forEach((index, item) => {
                          if(item.parentNode != properties.nodes[0]){
                              newNodeList.push(item);
                          }
                      })
                      /!*for (let item of this.datas.nodes){
                          if(item.parentNode != properties.nodes[0]){
                              newNodeList.push(item);
                          }
                      }*!/
                      this.edges.forEach((index, item) => {
                          if(item.parentNode != properties.nodes[0]){
                              newEdgeList.push(item);
                          }
                      })
                      for (let item of this.datas.edges){
                          if(item.parentNode != properties.nodes[0]){
                              newEdgeList.push(item);
                          }
                      }
                      _this.nodeList = newNodeList;
                      _this.edgeList = newEdgeList;

                      _this.datas = {
                          nodes:_this.nodeList,
                          edges:_this.edgeList
                      }
                      //window.network.redraw();
                      console.log("setData",_this.datas);
                      window.network.getSeed();
                      window.network.setData(_this.datas);

                  }
                  }*/


                  })
              }else if(this.kgType == 2){

                  relationApi.getInstanceNodeById(properties.nodes[0]).then(({data}) => {
                      console.log("getInstanceNodeById", data)
                      this.handleClickData(data,this.kgType);
                  })
              }

          }
      },
      handleClickData(data,kgType){
          console.log("handleClickData ==> this.KGLevel ", this.KGLevel )
          let insNodes =[];
          let insEdges = [];
          let dataList =  [];
          let lable = "";
          if(kgType == 1){

              dataList = data.list;
              if (dataList.length == 0) {
                  this.$message.info('未查询到实例')
                  return
              }
              lable = dataList[0].ontoName;
              this.title = "本体'" +lable +"'所有实例化结点" ;
              this.KGLevel = 1;
              /*let insNodes =[];
              let insEdges = [];*/
              insNodes.push({
                  id: data.neoId,
                  label: lable,
                  color: { background:"#29a7fc"},
                  //propData:"",
                  size:20,
                  /*parentNode:properties.nodes[0],
                  foldState:2*/
              })

              for(var item of dataList){

                  let nodeItem = {
                      id: item.neoId,
                      label: item.name,
                      //title:""+item.value,
                      /*parentNode:properties.nodes[0],
                      foldState:2*/
                  }
                  let edgeItem = {
                      from: data.neoId,
                      to: item.neoId,
                      label: "实例化",
                  }
                  insNodes.push(nodeItem);
                  insEdges.push(edgeItem);

              }
          }else if(kgType == 2){
              //实例图谱本体结点无点击效果
              for(let i= 0;i<data.labels.length;i++){
                  if(data.labels[i] == "水利本体"){
                      //this.$message.info('点击本体')
                      return;
                  }
              }

              dataList = data.propObjList;
              if (dataList.length == 0) {
                  this.$message.info('未查询到属性')
                  return
              }

              lable = data.name;
              this.title = "实例'"+lable+"'所有属性结点";
              this.KGLevel = 1;

              insNodes.push({
                  id: data.neoId,
                  label: lable,
                  color: { background:"#29a7fc"},
                  //propData:"",
                  size:20,
                  /*parentNode:properties.nodes[0],
                  foldState:2*/
              })

              for(var item of dataList){

                  let nodeItem = {
                      id: item.neoId,
                      label: item.name,
                      title:""+item.value,
                      /*parentNode:properties.nodes[0],
                      foldState:2*/
                  }
                  let edgeItem = {
                      from: data.neoId,
                      to: item.neoId,
                      label: "拥有",
                  }
                  insNodes.push(nodeItem);
                  insEdges.push(edgeItem);

              }
          }



              //console.log("handleClickData ==> insNodes", insNodes)
              //console.log("handleClickData ==> insEdges", insEdges)

              //使用setData方法更新数据会报错,使用window.network会有其他问题,直接new新的network
              const container = this.$refs.KGNetwork;
              this.network = new Vis.Network(container, {nodes: insNodes, edges: insEdges}, this.options);
              //this.network.setData({nodes: arrtibuteNodes, edges: arrtibuteEdges});
              let _this = this
              this.network.on('click',function(properties){
                  console.log(properties);
                  _this.handleKGClick(properties);
              })



      },
      handleReturn(){
          console.log("handleReturn ==> this.KGLevel ", this.KGLevel )
          if(this.KGLevel == 1){
              if(this.kgType == 1){
                  this.title = this.sname + "本体图谱";
              }else if(this.kgType == 2){
                  this.title = this.sname + "本体图谱";
              }else{
                  this.title ="";
              }

              this.KGLevel = 0;
              const container = this.$refs.KGNetwork;
              this.network = new Vis.Network(container, this.datas, this.options);;
              //this.network.setData(this.datas);
              let _this = this
              this.network.on('click',function(properties){
                  console.log(properties);
                  _this.handleKGClick(properties);
              })
          }else if(this.KGLevel == 0){
              this.$router.push("/index");
          }

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
  p {
    font-size: 24px;
    font-weight: bold;
    color: #777;
  }
#KGNetwork{
  /*width: 800px;*/
  /*height: 500px;*/
  width: 1200px;
  height: 800px;
}

.smallKG{
  width: 800px;
  height: 500px;
}

.largeKG{
  width: 1200px;
  height: 800px;
}
</style>


