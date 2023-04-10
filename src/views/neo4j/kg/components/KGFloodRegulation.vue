<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/2 12:53
 * @description：洪水调度查询组件
 * @modified By：lzp
 * @version:     1.0
 -->
<template>
  <div>
    <div>
      <el-card>

        <div slot="header" class="clearfix">
          <span>洪水调度方案查询</span>
        </div>

        <!--以下为流域选择的下拉菜单-->
        <el-row>
          <div>
            <el-select clearable @clear="clear" @change="chooseWaterShed" v-model="currentId" placeholder="请选择流域"
                       style= "margin-top: 15px">
              <el-option
                v-for="(item,index) in nodeLabels"
                :key=index
                :label=item
                :value=item
              />
            </el-select>
          </div>
        </el-row>
        <!--以上为流域选择的下拉菜单-->

        <el-row>
          <!--以下为监测单位类型的下拉菜单-->
          <el-col :span="6">
          <div>
            <el-select clearable @clear="clear" @change="chooseEntity" v-model="nodeLabels.index" placeholder="请选择监测单位类型"
                       style= "margin-top: 15px">
              <el-option
                v-for="(item,index) in nodeLabels"
                :key=index
                :label=item
                :value=item
              />
            </el-select>
          </div>
        </el-col>
          <!--以上为监测单位类型的下拉菜单-->

          <!--以下为监测单位名称的输入框-->
          <el-col :span="6">
            <div style="margin-top: 15px;">
              <el-input placeholder="请搜索监测单位名称" class="input-with-select" v-model="key.nodeKey">
                <el-button slot="append" icon="el-icon-search" @click="getNodeContainsName"/>
              </el-input>
            </div>
          </el-col>
          <!--以上为监测单位名称的输入框-->

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
          <!--以下为调度要素的下拉菜单-->
          <el-col :span="6">
            <div>
              <el-select clearable @clear="clear" @change="chooseAtt" v-model="regulation.attNameList.index" placeholder="请选择调度要素"
                         style= "margin-top: 15px">
                <el-option
                  v-for="(item,index) in regulation.attNameList"
                  :key=index
                  :label=item
                  :value=item
                />
              </el-select>
            </div>
          </el-col>
          <!--以上为调度要素的下拉菜单-->

          <!--以下为预报值的输入框-->
          <el-col :span="6">
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入预报值" class="input-with-select" v-model="regulation.attValue"></el-input>
            </div>
          </el-col>
          <!--以上为预报值的输入框-->

          <!--以下为调度方案查询的按钮-->
          <el-col :span="6">
            <div style="margin-top: 15px; padding-left: 15px">
              <el-button type="primary" @click="getSchedulePlan">查 询</el-button>
            </div>
          </el-col>
          <!--以上为调度方案查询的按钮-->

        </el-row>

      </el-card>
    </div>

    <div style="display: flex" >
      <el-card class="box-card" style = "width: 400px">
        <div slot="header" class="clearfix">
          <span>调度方案一览</span>
        </div>
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label="方案名">方案内容</el-descriptions-item>
          <template v-for="(item,index) in this.regulation.plans">
            <el-descriptions-item v-for="(proVals,proNames) in item" :label="proNames" :key="proNames">
              {{proVals}}
            </el-descriptions-item>
          </template>

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
<!--            <el-tag size="mini" color="#0ce3ca" effect="dark" v-show="legend.indexOf('河流') != -1">河流</el-tag>-->
<!--            <el-tag size="mini" color="#d4de40" effect="dark" v-show="legend.indexOf('流域') != -1">流域</el-tag>-->
<!--            <el-tag size="mini" color="#f3022e" effect="dark" v-show="legend.indexOf('行政区划') != -1">行政区划</el-tag>-->
<!--            <el-tag size="mini" color="#af36d7" effect="dark" v-show="legend.indexOf('测站') != -1">测站</el-tag>-->
<!--            <el-tag size="mini" color="#f1a94b" effect="dark" v-show="legend.indexOf('断面') != -1">断面</el-tag>-->
<!--            <el-tag size="mini" color="#7e8ead" effect="dark" v-show="legend.indexOf('水库') != -1">水库</el-tag>-->
<!--            <el-tag size="mini" color="#00ff00" effect="dark" v-show="legend.indexOf('水闸') != -1">水闸</el-tag>-->
<!--            <el-tag size="mini" color="#abd78e" effect="dark" v-show="legend.indexOf('流域雨量站') != -1">流域雨量站</el-tag>-->
<!--            <el-tag size="mini" color="#058df1" effect="dark" v-show="legend.indexOf('河段') != -1">河段</el-tag>-->
            <el-tag size="mini" effect="dark" v-for="(nodeType, index) in this.regulation.currentNodeTypes" :key="index" :color="getTypeColor(nodeType)">
              {{ nodeType }}
            </el-tag>
          </div>
        </div>
        <!--        <el-empty description="描述文字"></el-empty>-->
<!--        <KGVisible/>-->
<!--        <KGVisibleEcahrts :current-node="nodeByName"></KGVisibleEcahrts>-->
        <KGVisibleRegulationNetwork @child-event="onChildEvent" :type-colors="this.regulation.typeColors" :draw-default="this.regulation.drawDefaultFlag" :draw-flag="this.regulation.drawFlag" :current-id="this.currentId" :att-value="this.regulation.attValue" :current-att="this.regulation.currentAtt" :current-name="this.regulation.currentName" :current-node="nodeByName" :visible-settings="visibleSettings" @legend="getLegend"></KGVisibleRegulationNetwork>
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
<!--        <el-tag size="mini" color="#0ce3ca" effect="dark" v-show="legend.indexOf('河流') != -1">河流</el-tag>-->
<!--        <el-tag size="mini" color="#d4de40" effect="dark" v-show="legend.indexOf('流域') != -1">流域</el-tag>-->
<!--        <el-tag size="mini" color="#f3022e" effect="dark" v-show="legend.indexOf('行政区划') != -1">行政区划</el-tag>-->
<!--        <el-tag size="mini" color="#af36d7" effect="dark" v-show="legend.indexOf('测站') != -1">测站</el-tag>-->
<!--        <el-tag size="mini" color="#f1a94b" effect="dark" v-show="legend.indexOf('断面') != -1">断面</el-tag>-->
<!--        <el-tag size="mini" color="#7e8ead" effect="dark" v-show="legend.indexOf('水库') != -1">水库</el-tag>-->
<!--        <el-tag size="mini" color="#00ff00" effect="dark" v-show="legend.indexOf('水闸') != -1">水闸</el-tag>-->
<!--        <el-tag size="mini" color="#abd78e" effect="dark" v-show="legend.indexOf('流域雨量站') != -1">流域雨量站</el-tag>-->
<!--        <el-tag size="mini" color="#058df1" effect="dark" v-show="legend.indexOf('河段') != -1">河段</el-tag>-->
        <el-tag size="mini" effect="dark" v-for="(nodeType, index) in this.regulation.currentNodeTypes" :key="index" :color="getTypeColor(nodeType)">
          {{ nodeType }}
        </el-tag>
      </div>
      <div style="display: flex">
        <KGVisibleRegulationNetworkLarge @child-event="onChildEvent" :type-colors="this.regulation.typeColors" :draw-default="this.regulation.drawDefaultFlag" :draw-flag="this.regulation.drawFlag" :current-id="this.currentId" :att-value="this.regulation.attValue" :current-att="this.regulation.currentAtt" :current-name="this.regulation.currentName" :current-node="nodeByName" :visible-settings="visibleSettings" @legend="getLegend"  style="margin: 0 auto;"></KGVisibleRegulationNetworkLarge>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleKGSize(0)">关闭</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import KGVisible from './KGVisible.vue'
import aggregateApi from '@/api/neo4j/aggregate';
import KGVisibleEcahrts from "./KGVisibleEcahrts.vue";
import relationApi from "../../../../api/neo4j/relationApi";
import KGUploadFile from "./KGUploadFile.vue";
import KGBackup from "./KGBackup.vue";
import KGConnectApi from "../../../../api/neo4j/KGConnectApi";
import KGVisibleVisNetwork from "./KGVisibleVisNetwork.vue";
import KGDownloadFile from "./KGDownloadFile.vue";
import KGVisibleVisNetworkLarge from "./KGVisibleVisNetworkLarge.vue";
import regulationApi from "../../../../api/neo4j/regulationApi";
import KGVisibleRegulationNetwork from "./KGVisibleRugulationNetwork.vue";
import KGVisibleRegulationNetworkLarge from "./KGVisibleRugulationNetworkLarge.vue";

export default {
  name: 'KGInstance',
  components: {
    KGVisibleRegulationNetworkLarge,
    KGVisibleRegulationNetwork,
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
      //记录关系的标签，用于下拉菜单选择
      relLabels: [],
      //记录流域的标签，用于下拉菜单选择
      waterShed: [],
      //记录查询出的节点名称
      nodeNames: [],
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
      currentType: null,
      currentRelType:null,
      currentId:null, //当前图谱id
      currentDbName:"椒江流域知识图谱",
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

      // 调度方案查询
      regulation: {
        //调度要素列表
        attNameList: [],
        //当前选择的水利对象名称
        currentName: null,
        //当前选择的要素
        currentAtt:null,
        //预报值
        attValue: null,
        //名称和标签的标志，由于调度数据库中的名称不一样，因此单独列出来
        nameSymbol: "rdfs__name",
        labelSymbol: "rdfs__label",
        //查询出来的调度方案
        plans: null,
        //绘图标志
        drawFlag: false,
        //初始绘图标志
        drawDefaultFlag: false,
        //当前存在的节点类型
        currentNodeTypes: null,
        // 类型名称和颜色的映射关系对象
        typeColors: {}
      }
    }
  },
  mounted() {
    this.handleSettings()
    this.initDbInfo()
    this.getAllRegulationElements()
    this.getAllNodeLabels()
    this.regulation.drawDefaultFlag = !this.regulation.drawDefaultFlag

  },
  created() {
    // this.currentDbName = this.$route.params.name
    //临时显示概化图所需内容

  },
  methods: {
    //传递绘图时获得的结点类型
    onChildEvent(message) {
      this.regulation.currentNodeTypes = message
      //清楚字母和数字的组合类型
      // for (let i = 0; i < this.regulation.currentNodeTypes.length; i++) {
        // (/^[^a-zA-Z0-9]*$/.test(nodeType))
        // if (nodeType === "A387BE524D344370A13F1DFF76C40493"){
        //   this.regulation.currentNodeTypes.splice(i,1)
        // }
      // }
      this.regulation.currentNodeTypes = this.regulation.currentNodeTypes.filter(str => !/^[A-F0-9]{32}$/i.test(str));

      for (let i = 0; i < this.regulation.currentNodeTypes.length; i++) {
        let nodeType = this.regulation.currentNodeTypes[i]
        //如果没有这个类型，添加一个
        if (!this.regulation.typeColors.hasOwnProperty(nodeType)){
          this.regulation.typeColors[nodeType] = this.generateRandomColor()
        }
      }
      console.log("清理后的label： ", this.regulation.currentNodeTypes)
    },
    // 获取随机颜色
    getRandomColor() {
      let letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    //生成随机浅色
    generateRandomColor() {
      // 固定饱和度和亮度
      const saturation = 0.5;
      const lightnessValues = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9];

      // 随机生成色调
      const hue = Math.floor(Math.random() * 360);

      // 根据亮度值生成颜色
      const index = Math.floor(Math.random() * lightnessValues.length);
      const lightness = lightnessValues[index];
      const color = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;

      return color;
    },
    // 根据节点类型获取对应的颜色
    getTypeColor(nodeType) {
      return this.regulation.typeColors[nodeType] || 'default'
    },
    goBack() {
      const data = true
      this.$emit('goBack', data)
    },
    //选择实体菜单
    chooseEntity(value) {
      this.currentType = value;
    },

    //选择流域下拉框改变当前流域
    chooseWaterShed(value) {
      this.currentId = value
    },
    //改变当前监测单位的属性
    chooseAtt(value) {
      this.regulation.currentAtt = value;
      console.log(this.regulation.currentAtt);
    },

    //切换下拉菜单
    change(index) {
      this.number = index;
      this.nodeNames = null
      this.nodeByName = null
    },
    //清空查询出来的实体类型
    clear() {
      this.nodeNames = null
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
    //获得所有节点的标签
    getAllNodeLabels() {
      aggregateApi.getNodeLabels(this.currentId)
        .then((response) => {
          this.nodeLabels = response.data.data.nodeLabels
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //获得所有调度要素标签
    getAllRegulationElements() {
      regulationApi.getAllRegulationElements("ns0__控制要素","")
        .then((response) => {
          this.regulation.attNameList = response.data.data
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
      //console.log(this.key.nodeKey)
      regulationApi.getNodesByName(this.currentType, this.key.nodeKey, this.currentId )
        .then(({data}) => {
          let list = data.data.nodeList;
          this.nodeNames = []
          for(let item of list){
            let map = new Map(Object.entries(item.node))
            //console.log(map)
            this.nodeNames.push(map.get(this.regulation.nameSymbol))
            console.log("nodeNames: "+this.nodeNames)
          }

      })
      .catch((error) => {
        console.log(error);
      });
    },
    //根据名称进行查询返回结点所有信息
    getNodeByName(name){
      regulationApi.getNodesByName(this.currentType, name, this.currentId )
        .then(({data}) => {
          this.nodeByName = []
          this.nodeByName.push(data.data.nodeList[0].node);
          let properties = JSON.stringify(this.nodeByName[0]);
          this.editNodeInfo.editNodeAtts = JSON.parse(properties);

          this.editNodeInfo.editNodeId = data.data.nodeList[0].node._id;
          this.editNodeInfo.editNodeLabels = data.data.nodeList[0].nodeType;
          this.regulation.currentName = name;
          console.log("当前水利对象： " + this.regulation.currentName);
          this.key.nodeKey = this.regulation.currentName;
      })
      .catch((error) => {
        console.log(error);
      });

    },
    //查询调度方案
    getSchedulePlan(){
      console.log("当前选择要素： " + this.regulation.currentAtt);
      console.log("预报值： " + this.regulation.attValue);
      regulationApi.getSchedulePlan(this.regulation.currentName, this.regulation.currentAtt, this.regulation.attValue, this.currentId)
        .then(({data}) => {
          let list = data.data.nodeList;
          this.regulation.plans = []
          for(let node of list){
            let map = new Map(Object.entries(node.node))
            //console.log(map)
            let planSet = {};
            this.$set(planSet, map.get("planName"), map.get(this.regulation.nameSymbol))
            this.regulation.plans.push(planSet)
            console.log(this.regulation.plans)
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.regulation.drawFlag = !this.regulation.drawFlag
      alert("搜索完毕！")
    },

    getRelsContainsNodeName(){
      if (this.currentRelType === '下级行政区划'){
        relationApi.getRelsRegionContainsNodeName(this.key.relNodeKey).then(({data}) => {
          this.relNames = []
          let list = data.data.relationList
          for (let item of list){
            this.relNames.push(item.pathName)
          }
        })
      }
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
    initDbInfo(){
      this.currentDbName = localStorage.getItem("instanceName")
      // this.currentId = this.$route.params.id
      this.currentId = localStorage.getItem("instanceId")
      this.currentOntoId = localStorage.getItem('ontoId')
      if (this.currentId !== undefined){
        KGConnectApi.getConnectionById(this.currentId).then(({data}) => {
          this.kgInfo = data.data
        })
      }
    },
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
