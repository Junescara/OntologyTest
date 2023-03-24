<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/2 12:53
 * @description：应急预案查询组件
 * @modified By：ljh
 * @version:     1.0
 -->
<template>
  <div>
    <div>
      <el-card>

        <div slot="header" class="clearfix">
          <span>洪水应急预案查询</span>
        </div>

        <!--以下为知识图谱选择的下拉菜单-->
        <el-row>
          <div>
            <el-select clearable @clear="clear" @change="chooseKnowledegGraph" v-model="currentDbName" placeholder="请选择知识图谱"
                       style= "margin-top: 15px">
              <el-option
                v-for="(item,index) in kgNameList"
                :key=index
                :label=item
                :value=item
              />
            </el-select>
          </div>
        </el-row>
        <!--以上为知识图谱选择的下拉菜单-->

        <el-row>
          <!--以下为监测对象类型的下拉菜单-->
          <el-col :span="6">
          <div>
            <el-select clearable @clear="clear" @change="chooseEntity" v-model="currentType" placeholder="请选择监测对象类型"
                       style= "margin-top: 15px">
              <el-option
                v-for="(item,index) in nodeLabelList"
                :key=index
                :label=item
                :value=item
              />
            </el-select>
          </div>
        </el-col>
          <!--以上为监测对象类型的下拉菜单-->

          <!--以下为监测对象名称的输入框-->
          <el-col :span="6">
            <div style="margin-top: 15px;">
              <el-input placeholder="请搜索监测对象名称" class="input-with-select" v-model="key.nodeKey">
                <el-button slot="append" icon="el-icon-search" @click="getNodeContainsName"/>
              </el-input>
            </div>
          </el-col>
          <!--以上为监测对象名称的输入框-->

          <!--以下标签用于显示查询出来的节点名称-->
          <el-col :span="6">
            <div class="tag-group infinite-list-wrapper" v-if="number === 0"  style="overflow: auto;height: calc(11vh - 72px); margin-top: 15px; padding-left: 10px" >
              <span class="tag-group__title"></span>
              <el-tag
                v-for="(item,index) in nodeNames"
                :key=index
                type=''
                effect="plain"
                @click="getNodeByName(item)"
              >
                {{ item }}
              </el-tag>
            </div>
          </el-col>
          <!--以上标签用于显示查询出来的节点名称-->
        </el-row>

        <el-row>
          <!--以下为监测对象属性的下拉菜单-->
          <el-col :span="6">
            <div>
              <el-select clearable @clear="clear" @change="chooseAtt" v-model="contingencyPlan.attNameList.index" placeholder="请选择监测对象属性"
                         style= "margin-top: 15px">
                <el-option
                  v-for="(item,index) in contingencyPlan.attNameList"
                  :key=index
                  :label=item
                  :value=item
                />
              </el-select>
            </div>
          </el-col>
          <!--以上为监测对象属性的下拉菜单-->

          <!--以下为预报值的输入框-->
          <el-col :span="6">
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入预报值" class="input-with-select" v-model="contingencyPlan.attValue"></el-input>
            </div>
          </el-col>
          <!--以上为预报值的输入框-->

          <!--以下为应急预案查询的按钮-->
          <el-col :span="6">
            <div style="margin-top: 15px; padding-left: 15px">
              <el-button type="primary" @click="getContingencyPlan">查 询</el-button>
            </div>
          </el-col>
          <!--以上为应急预案查询的按钮-->

        </el-row>

      </el-card>
    </div>

    <div style="display: flex" >
      <el-card class="box-card" style = "width: 400px">
        <div slot="header" class="clearfix">
          <span>应急预案文本</span>
        </div>
        <el-descriptions v-for="(item,index) in this.contingencyPlan.plans" class="margin-top" title="调度方案" :key="index" :column="1" border>
          <el-descriptions-item label="方案名">方案内容</el-descriptions-item>
          <el-descriptions-item v-for="(proVals,proNames) in item" :label="proNames" :key="proNames">
            {{proVals}}
          </el-descriptions-item>
        </el-descriptions>

      </el-card>

      <el-card class="box-card-2">
        <div slot="header" class="clearfix">
          <span>知识图谱</span>
          <el-tag>
            调度方案图
          </el-tag>
          <el-button style="float: right; padding: 3px 0; margin-right: 10px" @click="handleKGSize(1)" type="text">查看大图</el-button>
          <br>
          <el-divider content-position="left">图例</el-divider>
          <div>
            <el-tag size="mini" color="#0ce3ca" effect="dark" v-show="legend.indexOf('河流') != -1">河流</el-tag>
            <el-tag size="mini" color="#d4de40" effect="dark" v-show="legend.indexOf('流域') != -1">流域</el-tag>
            <el-tag size="mini" color="#f3022e" effect="dark" v-show="legend.indexOf('行政区划') != -1">行政区划</el-tag>
            <el-tag size="mini" color="#af36d7" effect="dark" v-show="legend.indexOf('测站') != -1">测站</el-tag>
            <el-tag size="mini" color="#f1a94b" effect="dark" v-show="legend.indexOf('断面') != -1">断面</el-tag>
            <el-tag size="mini" color="#7e8ead" effect="dark" v-show="legend.indexOf('水库') != -1">水库</el-tag>
            <el-tag size="mini" color="#00ff00" effect="dark" v-show="legend.indexOf('水闸') != -1">水闸</el-tag>
            <el-tag size="mini" color="#abd78e" effect="dark" v-show="legend.indexOf('流域雨量站') != -1">流域雨量站</el-tag>
            <el-tag size="mini" color="#058df1" effect="dark" v-show="legend.indexOf('河段') != -1">河段</el-tag>
          </div>
        </div>

        <KGVisiableContingencyPlanNetwork :draw-flag="this.contingencyPlan.drawFlag" :current-id="this.currentId" :att-value="this.contingencyPlan.attValue" :current-att="this.contingencyPlan.currentAtt" :current-name="this.contingencyPlan.currentName" :current-node="this.nodeByName" :visible-settings="this.visibleSettings" :current-type="this.currentType" @legend="getLegend"></KGVisiableContingencyPlanNetwork>
      </el-card>

      <el-card class="box-card" style="width: 400px">
        <div slot="header" class="clearfix">
          <span>实体类信息</span>
        </div>
        <el-descriptions :column="1">
          <el-descriptions-item label="实体所属类型">
            <el-tag size="small">{{ currentType }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="更新时间">2022.11.2</el-descriptions-item>
        </el-descriptions>
        <el-divider/>
        <!--以下为实体属性的表格-->
        <el-descriptions v-for="(item,index) in nodeByName" class="margin-top" title="实体属性" :key="index" :column="1" border>
          <el-descriptions-item label="属性名">属性值</el-descriptions-item>
          <el-descriptions-item v-for="(proVals,proNames) in item" :label="proNames" :key="proNames">
            {{proVals}}
          </el-descriptions-item>
        </el-descriptions>

      </el-card>

    </div>

    <el-dialog
      title="查看大图"
      :fullscreen="true"
      :visible.sync="visibles.largeKGVisible"
      >
      <div>
        <el-tag size="mini" color="#0ce3ca" effect="dark" v-show="legend.indexOf('河流') != -1">河流</el-tag>
        <el-tag size="mini" color="#d4de40" effect="dark" v-show="legend.indexOf('流域') != -1">流域</el-tag>
        <el-tag size="mini" color="#f3022e" effect="dark" v-show="legend.indexOf('行政区划') != -1">行政区划</el-tag>
        <el-tag size="mini" color="#af36d7" effect="dark" v-show="legend.indexOf('测站') != -1">测站</el-tag>
        <el-tag size="mini" color="#f1a94b" effect="dark" v-show="legend.indexOf('断面') != -1">断面</el-tag>
        <el-tag size="mini" color="#7e8ead" effect="dark" v-show="legend.indexOf('水库') != -1">水库</el-tag>
        <el-tag size="mini" color="#00ff00" effect="dark" v-show="legend.indexOf('水闸') != -1">水闸</el-tag>
        <el-tag size="mini" color="#abd78e" effect="dark" v-show="legend.indexOf('流域雨量站') != -1">流域雨量站</el-tag>
        <el-tag size="mini" color="#058df1" effect="dark" v-show="legend.indexOf('河段') != -1">河段</el-tag>
      </div>
      <div style="display: flex">
        <KGVisiableContingencyPlanNetworkLarge :current-id="this.currentId" :att-value="this.contingencyPlan.attValue" :current-att="this.contingencyPlan.currentAtt" :current-name="this.contingencyPlan.currentName" :current-node="nodeByName" :visible-settings="visibleSettings" :current-type="this.currentType" @legend="getLegend"  style="margin: 0 auto;"></KGVisiableContingencyPlanNetworkLarge>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleKGSize(0)">关闭</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>

import aggregateApi from '@/api/neo4j/aggregate';
import KGConnectApi from "../../../../api/neo4j/KGConnectApi";
import contingencyPlanApi from "../../../../api/neo4j/contingencyPlanApi";
import KGVisiableContingencyPlanNetwork from "./KGVisiableContingencyPlanNetwork";
import KGVisiableContingencyPlanNetworkLarge from "./KGVisiableContingencyPlanNetworkLarge";

import KGVisible from './KGVisible'
import KGVisibleEcahrts from "./KGVisibleEcahrts";
import relationApi from "../../../../api/neo4j/relationApi";
import KGUploadFile from "./KGUploadFile";
import KGBackup from "./KGBackup";
import KGVisibleVisNetwork from "./KGVisibleVisNetwork";
import KGDownloadFile from "./KGDownloadFile";
import KGVisibleVisNetworkLarge from "./KGVisibleVisNetworkLarge";
import regulationApi from "../../../../api/neo4j/regulationApi";

export default {
  name: 'KGInstance',
  components: {
    KGVisiableContingencyPlanNetwork,
    KGVisiableContingencyPlanNetworkLarge,
    KGVisibleVisNetworkLarge,
    KGVisibleVisNetwork, KGVisibleEcahrts, KGVisible,KGUploadFile,KGBackup,KGDownloadFile},
  props:{
    kgConnectInfo:{
      type:Object,
      default:() => {}
    }
  },
  data() {
    return {

      //记录所有知识图谱的名称
      kgNameList: [],
      //记录所有知识图谱的id和名称
      kgIdNameList: [],
      //记录选定知识图谱拥有的全部标签
      nodeLabelList: [],
      //选定知识图谱id
      currentId:null,
      //选定知识图谱名称
      currentDbName:null,
      //选定类型监测对象类型
      currentType:null,
      //记录查询出的节点名称
      nodeNames: [],
      //记录查询出的节点id和名称
      nodeIdNames: [],
      //应急预案查询
      contingencyPlan: {
        //监测对象属性列表
        attNameList: [],
        //当前选定监测对象名称
        currentName: null,
        //选定监测对象属性
        currentAtt:null,
        //预报值
        attValue: null,
        //选定监测对象类型
        currentType: null,
        //名称和标签的标志，由于调度数据库中的名称不一样，因此单独列出来
        nameSymbol: "测站名称",
        labelSymbol: "rdfs__label",
        //查询出来的调度方案
        plans: null,
        //绘图标志
        drawFlag: false
      },



      tempAtt:null,
      labelPosition: 'right',
      visibles:{
        dialogVisible:false,
        dialogVisible2:false,
        settingsVisible:false,
        dialogVisible3:false,
        largeKGVisible:false
      },
      //标记类
      flags:{
        relLazyCountFlag:0,
        relLoadingFlag:false,
        loadingFlag:false,
        visibleTypeFlag:4,//0表示只显示出边，1表示只显示入边，2表示出入边都显示，3表示显示完整的关系链,4表示流域概化图
        lengthFlag:2,
        relTypeFlag:["位于","包含"],
      },
      //查询关键字
      key:{
        nodeKey:'',
        relNodeKey:'',
      },
      kgInfo:{

      },
      visibleTypeOptions:[
        {
          value: 0,
          label: '显示出边',
        },
        {
          value: 1,
          label: '显示入边',
        },
        {
          value: 2,
          label: '显示该点完整关系',
        },
        {
          value: 3,
          label: '显示该点完整路径',
        },
        {
          value: 4,
          label: '流域概化图',
        },
      ],
      //显示设置
      visibleSettings:{
        length:2, //关系链长度，默认为2
        visibleTypeFlag:0,
        relType:[],
      },
      //记录节点的数量
      nodeCounts: 0,
      //记录节点类型的数量
      nodeTypeCounts: 0,
      //记录节点的标签，用于下拉菜单选择
      nodeLabels: [],
      relLabels: [],
      //记录流域的标签，用于下拉菜单选择
      waterShed: [],

      //查询出来的关系组合
      relNames:[],
      //查询出来的关系组合及id
      relNamesAndIds:[],
      //实现懒加载的relNames
      relNamesLazy:[],
      //记录下拉菜单索引
      number: 0,
      //记录通过名称查询出来的节点
      nodeByName: null,
      relByName:null,
      currentRelType:null,
      currentOntoId:null,
      currentRelId:null,
      KGSize:0,
      //修改对话框是否开启
      editObjVisible: false,
      //增加对话框是否开启
      addObjVisible: false,

      editNodeInfo:{
        editNodeId:null,
        editNodeLabels: null,
        editNodeAtts:null
      },
      legend:[], //需要显示的图例类型

    }
  },
  mounted() {
    this.handleSettings()
    // this.initDbInfo()
    this.getInstNameList()
  },
  created() {
    // this.currentDbName = this.$route.params.name
    //临时显示概化图所需内容

  },
  methods: {
    goBack() {
      const data = true
      this.$emit('goBack', data)
    },
    //选择实体菜单
    chooseEntity(value) {
      this.currentType = value;
    },

    //选择知识图谱下拉框改变当前知识图谱
    chooseKnowledegGraph(value) {

      this.currentDbName = value

      for(const key in this.kgIdNameList){
        if(this.kgIdNameList[key]===value){
          this.currentId = key
        }
      }
      console.log(this.currentDbName)
      console.log(this.currentId)

      this.getNodeLabelList()
    },

    //改变当前监测对象的属性
    chooseAtt(value) {
      this.contingencyPlan.currentAtt = value;
      console.log(this.contingencyPlan.currentAtt);
    },

    //切换下拉菜单
    change(index) {
      this.number = index;
      // this.nodeNames = null
      this.nodeByName = null
    },
    //清空查询出来的实体类型
    clear() {
      // this.nodeNames = null
      this.nodeByName = null
    },
    getRelByName(name) {
      if (this.currentRelType === '下级行政区划') {

        for(let i in this.relNamesAndIds){
          if(this.relNamesAndIds[i].path === name){
            this.currentRelId = this.relNamesAndIds[i].id;
            break;
          }
        }

        let nameArray = name.split("->")
        this.relByName = [nameArray]
      }
      if (this.currentRelType === '关联') {

        //业务逻辑
        //TODO
      }
    },
    //获得所有知识图谱名称
    getInstNameList() {
      KGConnectApi.getInstNameList()
        .then((response) => {

          this.kgIdNameList = response.data.data
          for(const key in this.kgIdNameList){
            this.kgNameList.push(this.kgIdNameList[key])
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getNodeLabelList() {
      this.currentType = null;
      aggregateApi.getNodeLabels(this.currentId)
        .then((response) => {
          this.nodeLabelList = response.data.data.nodeLabels
        })
        .catch((error) => {
          console.log(error);
        });
    },

    load(){
      this.flags.relLoadingFlag = true
      this.flags.loadingFlag = true
      setTimeout(() => {
        let origin = this.flags.relLazyCountFlag
        this.flags.relLazyCountFlag = this.flags.relLazyCountFlag + 25
        if (this.flags.relLazyCountFlag < this.relNames.length){
          for (let i = origin; i < this.flags.relLazyCountFlag; i++){
            this.relNamesLazy.push(this.relNames[i])
          }
        }else {
          for (let i = origin; i < this.relNames.length; i++){
            this.relNamesLazy.push(this.relNames[i])
          }
        }
        this.flags.relLoadingFlag = false
        this.flags.loadingFlag = false
      }, 1000)
    },

    //根据名称进行模糊查询返回可能的节点名称
    getNodeContainsName(){

      contingencyPlanApi.getNodesByName(this.currentType, this.key.nodeKey, this.currentId )
        .then(({data}) => {
          let list = data.data.nodeList;

          this.nodeNames = []
          this.nodeIdNames = []

          for(let item of list){
            let map = new Map(Object.entries(item.node))
            let id = map.get("_id")
            let name = map.get(this.contingencyPlan.nameSymbol)
            this.nodeNames.push(name)
            this.nodeIdNames.push(id,name)
          }
          // console.log(this.nodeNames)
          // console.log(this.nodeIdNames)
      })
      .catch((error) => {
        console.log(error);
      });
    },
    //根据名称进行查询返回结点所有信息
    getNodeByName(name){
      contingencyPlanApi.getNodesByName(this.currentType, name, this.currentId)
        .then(({data}) => {

          this.nodeByName = []
          this.nodeByName.push(data.data.nodeList[0].node);

          const att = new Map(Object.entries(this.nodeByName[0]))
          att.delete("_id")

          this.contingencyPlan.attNameList = Array.from(att.keys())

          let properties = JSON.stringify(this.nodeByName[0]);
          this.editNodeInfo.editNodeAtts = JSON.parse(properties);
          this.editNodeInfo.editNodeId = data.data.nodeList[0].node._id;
          this.editNodeInfo.editNodeLabels = data.data.nodeList[0].nodeType;

          this.contingencyPlan.currentName = name;

          console.log("当前水利对象： " + this.contingencyPlan.currentName);
          this.key.nodeKey = this.contingencyPlan.currentName;
      })
      .catch((error) => {
        console.log(error);
      });

    },
    //应急预案查询
    getContingencyPlan(){
      //查询调度方案
      console.log("当前选择要素： " + this.contingencyPlan.currentAtt);
      console.log("预报值： " + this.contingencyPlan.attValue);
      // contingencyPlanApi.getSchedulePlan(this.contingencyPlan.currentName,this.currentType, this.contingencyPlan.currentAtt, this.contingencyPlan.attValue, this.currentId)
      //   .then(({data}) => {
      //     let list = data.data.nodeList;
      //     this.contingencyPlan.plans = []
      //     for(let node of list){
      //       let map = new Map(Object.entries(node.node))
      //       //console.log(map)
      //       let planSet = {};
      //       this.$set(planSet, map.get("planName"), map.get(this.contingencyPlan.nameSymbol))
      //       this.contingencyPlan.plans.push(planSet)
      //       console.log(this.contingencyPlan.plans)
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      this.contingencyPlan.drawFlag = !this.contingencyPlan.drawFlag
      alert("搜索完毕！")
    },

    handleSettings(){
      this.visibleSettings.visibleTypeFlag = this.flags.visibleTypeFlag
      this.visibleSettings.length = this.flags.lengthFlag
      this.visibleSettings.relType = this.flags.relTypeFlag
      this.visibles.settingsVisible = false
    },
    getCurrentVisibleType(){
      if (this.flags.visibleTypeFlag == 0){
        return '显示出边'
      }else if (this.flags.visibleTypeFlag == 1){
        return '显示入边'
      }else if (this.flags.visibleTypeFlag == 2){
        return '显示该点完整关系'
      }else if (this.flags.visibleTypeFlag == 3){
        return '显示该点完整路径'
      }else if (this.flags.visibleTypeFlag == 4){
        return '流域概化图'
      }
    },
    chooseRelType(){
      this.visibleSettings.relType = this.flags.relTypeFlag
    },
    getLegend(data){
      this.legend = data
    },
    // initDbInfo(){
      // this.currentDbName = localStorage.getItem("instanceName")
      // this.currentId = this.$route.params.id
      // this.currentId = localStorage.getItem("instanceId")
      // this.currentOntoId = localStorage.getItem('ontoId')
      // if (this.currentId !== undefined){
      //   KGConnectApi.getConnectionById(this.currentId).then(({data}) => {
      //     this.kgInfo = data.data
      //   })
      // }
    // },
    handleKGSize(value){
      if (value == 1){
        this.visibles.largeKGVisible = true
      }else {
        this.visibles.largeKGVisible = false
      }

      this.KGSize = value;
    }
  },
  computed:{
    disabled (){
      return this.flags.relLoadingFlag || this.noMore
    },
    noMore () {
      return this.flags.relLazyCountFlag >= this.relNames.length
    },
    currentVisibleType(){
      return this.getCurrentVisibleType()
    },
  },
  watch:{
    relNames:{
      handler(newValue, oldValue) {
        // this.relNamesLazy = []
        if (oldValue.length > 0){
          this.relNamesLazy = []
          this.flags.relLazyCountFlag = 0
          this.load()
        }
      },
      deep: true
    },
    flags:{
      handler(newValue, oldValue){
        if (newValue.relTypeFlag.indexOf('上游') >= 0 && newValue.relTypeFlag.indexOf('下游') >= 0){
          this.$message.error('上下游不能同时被选中！')
          let i1 = this.flags.relTypeFlag.indexOf('上游')
          let i2 = this.flags.relTypeFlag.indexOf('下游')
          delete this.flags.relTypeFlag[i1]
          delete this.flags.relTypeFlag[i2]
        }
        if (newValue.relTypeFlag.indexOf('位于') >= 0 && newValue.relTypeFlag.indexOf('监测') >= 0){
          this.$message.error('位于监测不能同时被选中！')
          console.log("oldValue.relTypeFlag=====",oldValue.relTypeFlag)
          let i1 = this.flags.relTypeFlag.indexOf('位于')
          let i2 = this.flags.relTypeFlag.indexOf('监测')
          delete this.flags.relTypeFlag[i1]
          delete this.flags.relTypeFlag[i2]
        }
        if (newValue.relTypeFlag.indexOf('含有') >= 0 && newValue.relTypeFlag.indexOf('属于') >= 0){
          this.$message.error('含有属于不能同时被选中！')
          console.log("oldValue.relTypeFlag=====",oldValue.relTypeFlag)
          let i1 = this.flags.relTypeFlag.indexOf('含有')
          let i2 = this.flags.relTypeFlag.indexOf('属于')
          delete this.flags.relTypeFlag[i1]
          delete this.flags.relTypeFlag[i2]
        }
        if (newValue.relTypeFlag.indexOf('上级') >= 0 && newValue.relTypeFlag.indexOf('下级') >= 0){
          this.$message.error('上下级不能同时被选中！')
          console.log("oldValue.relTypeFlag=====",oldValue.relTypeFlag)
          let i1 = this.flags.relTypeFlag.indexOf('上级')
          let i2 = this.flags.relTypeFlag.indexOf('下级')
          delete this.flags.relTypeFlag[i1]
          delete this.flags.relTypeFlag[i2]
        }
        if (newValue.relTypeFlag.indexOf('支流') >= 0 && newValue.relTypeFlag.indexOf('干流') >= 0){
          this.$message.error('干支流不能同时被选中！')
          console.log("oldValue.relTypeFlag=====",oldValue.relTypeFlag)
          let i1 = this.flags.relTypeFlag.indexOf('支流')
          let i2 = this.flags.relTypeFlag.indexOf('干流')
          delete this.flags.relTypeFlag[i1]
          delete this.flags.relTypeFlag[i2]
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
。clearfix {
  background-color: #4AB7BD;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 300px;
  height: 100%;
  margin-top: 20px;
  margin-left: 20px;
}

.box-card-2 {
  width: 750px;
  height: 550px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
