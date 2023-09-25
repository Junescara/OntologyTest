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
          <span>水利工程抢险方案查询</span>
        </div>

        <!--以下为知识图谱选择的下拉菜单-->
        <el-row>
          <!-- <el-col :span="3">
            <div>
              <el-select
                clearable
                @clear="clear"
                @change="chooseKnowledegGraph"
                v-model="currentDbName"
                placeholder="请选择知识图谱"
                style="margin-top: auto"
              >
                <el-option
                  v-for="(item, index) in kgNameList"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </el-col>  -->
          <!--以上为知识图谱选择的下拉菜单-->

          <!--以下为抢险类型的下拉菜单-->
          <!-- <el-col :span="3">
            <div>
              <el-select
                clearable
                @clear="clear"
                @change="chooseEntity"
                v-model="currentType"
                placeholder="请选择类型"
                style="margin-top: auto"
              >
                <el-option
                  v-for="(item, index) in nodeLabelList"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </el-col> -->
          <!--以上为抢险类型的下拉菜单-->

          <!--以下为工程险情名称的输入框-->
          <!-- <el-col :span="3">
            <div style="margin-top: auto;">
              <el-input
                placeholder="请搜索名称"
                class="input-with-select"
                v-model="key.nodeKey"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getNodeContainsName"
                />
              </el-input>
            </div>
          </el-col> -->
          <!--以上为工程险情名称的输入框-->

          <!--以下标签用于显示查询出来的节点名称-->
          <!-- <el-col :span="10">
            <div
              class="tag-group infinite-list-wrapper"
              v-if="number === 0"
              style="overflow: auto;height:auto; margin-top: auto; padding-left: auto"
            >
              <span class="tag-group__title"></span>
              <el-tag
                v-for="(item, index) in nodeNames"
                :key="index"
                type=""
                effect="plain"
                @click="getNodeByName(item)"
              >
                {{ item }}
              </el-tag>
            </div>
          </el-col> -->
          <!--以上标签用于显示查询出来的节点名称-->
         
          <!-- 以下是工程险情查询 -->
          <el-col :span="3">
            <div>
              <el-select
                clearable
                @clear="clear"
                @change="changnode($event,DangerId)"
                placeholder="请选择工程险情"
                v-model="DangerId"
                style="margin-top: auto"
              >
                <el-option
                  v-for="(item, index) in DangerList"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </el-col>
          <!--以上为抢险类型的下拉菜单-->

          <!--以下为工程险情名称的输入框-->
          <el-col :span="1">
            <div style="margin-top: auto;">
              <!-- <el-input
                placeholder="搜索相应的抢险方法"
                class="input-with-select"
                v-model="searchkey" -->
              <!-- > -->
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click.once="fn1"
                  @click="getDangerLink"
                />
              <!-- </el-input> -->
            </div>
          </el-col>
          <!--以上为工程险情名称的输入框-->

          <!--以下标签用于显示查询出来的节点名称-->
          <el-col :span="10">
           
            <div
              class="tag-group infinite-list-wrapper"
              v-if="number === 0"
              style="overflow: auto;height:auto; margin-top: auto; padding-left: 10px"
            >
              <span class="tag-group__title"></span>
              <el-tag
                v-for="(item, index) in methodList"
                :key="index"
                type=""
                effect="plain"
                size="middle"
                @click="getNodeByName(item)"
              >
                {{ item }}
              </el-tag>
            </div>
          </el-col>

          <!--以下为抢险方案查询的按钮-->
          <!-- <el-col :span="3">
            <div style="margin-top: auto; padding-left: auto">
              <el-button type="primary" @click="getContingencyPlan"
                >更新图谱</el-button
              >
            </div>
          </el-col> -->
          <!--以上为抢险方案查询的按钮-->
        </el-row>
      </el-card>
    </div>

    <div style="display: flex">
      <!-- <el-card class="box-card" style="width: 200px ">
        <div slot="header" class="clearfix">
          <span>抢险方案文本</span>
        </div>

        <el-descriptions
          v-for="(item, index) in this.rescuePlan.plans"
          class="margin-top"
          title="抢险方案对象"
          :key="index"
          :column="1"
          border
          style="margin-top: 15px"
        >
          <el-descriptions-item label="对象名称">对象类型</el-descriptions-item>
          <el-descriptions-item
            v-for="(proVals, proNames) in item"
            :label="proNames"
            :key="proNames"
          >
            {{ proVals }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card> -->

      <el-card class="box-card-2">
        <div slot="header" class="clearfix">
          <span>知识图谱</span>

          <el-button
            style="float: right; padding: 3px 0; margin-right: 0px"
            @click="handleKGSize(1)"
            type="text"
            >查看大图</el-button
          >
          <br />
        </div>

        <KGVisiableRescuePlanNetwork
          :draw-flag="this.rescuePlan.drawFlag"
          :current-id="this.currentId"
          :current-name="this.rescuePlan.currentName"
          :current-node="this.nodeByName"
          :visible-settings="this.visibleSettings"
          :current-type="this.currentType"
          @legend="getLegend"
        ></KGVisiableRescuePlanNetwork>
      </el-card>

      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>实体类信息</span>
        </div>
        <el-descriptions :column="1">
          <el-descriptions-item label="实体所属类型">
            <el-tag size="small">{{ currentType }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="更新时间"
            >2022.11.2</el-descriptions-item
          >
        </el-descriptions>
        <el-divider />
        <!--以下为实体属性的表格-->
        <!-- 设置滚动条 -->
        <div   :style="{'max-height': this.timeLineHeight + 'px' }"
                style="overflow-y:scroll;">
          <el-descriptions
          v-for="(item, index) in nodeByName"
          class="margin-top"
          title="实体属性"
          :key="index"
          :column="1"
          border
        >
          <el-descriptions-item label="属性名">属性值</el-descriptions-item>
          <el-descriptions-item
            v-for="(proVals, proNames) in item"
            v-show="proNames.includes('图片') == false"
            :label="proNames"
            :key="proNames"
          >
            <!-- <div v-if="proNames=='图片1' && proVals!='无' ">
              <img :src="require('@/assets/rescue-images/'+imgUrl)" alt="" width="300px" />
            </div>
            <div v-else-if="proNames=='图片2'&& proVals!= '无' ">
              <img :src="require('@/assets/rescue-images/'+imgUrl)" alt="" width="300px" />
            </div>
            <div v-else-if="proNames=='图片3'&& proVals!= '无'">
              <img :src="require('@/assets/rescue-images/'+imgUrl)" alt="" width="300px" />
            </div>
            <div v-else-if="proNames=='图片4'&& proVals!= '无'">
              <img :src="require('@/assets/rescue-images/'+imgUrl)" alt="" width="300px" />
            </div>
            <div v-else-if="proNames=='图片5'&& proVals!= '无'">
              <img :src="require('@/assets/rescue-images/'+imgUrl)" alt="" width="300px" />     
            </div>
            <div v-else>
              {{proVals}}
            </div>
            {{proVals}} -->

            <!-- 图片数组 -->
            {{ proVals }}
          </el-descriptions-item>

          <el-descriptions-item
            v-for="(item, index) in imgArr"
            :key="index"
            :label="`图片${index + 1}`"
          >
            <img
              :src="require(`@/assets/rescue-images/${item}.jpg`)"
              alt=""
              width="300px"
            />
          </el-descriptions-item>
        </el-descriptions>
        </div>
        
      </el-card>
    </div>

    <el-dialog
      title="查看大图"
      :fullscreen="true"
      :visible.sync="visibles.largeKGVisible"
    >
      <div style="display: flex">
        <KGVisiableRescuePlanNetworkLarge
          :current-id="this.currentId"
          :current-name="this.rescuePlan.currentName"
          :current-node="nodeByName"
          :visible-settings="visibleSettings"
          :current-type="this.currentType"
          @legend="getLegend"
          style="margin: 0 auto;"
        ></KGVisiableRescuePlanNetworkLarge>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleKGSize(0)">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import aggregateApi from "@/api/neo4j/aggregate";
import KGConnectApi from "../../../../api/neo4j/KGConnectApi";
import rescuePlanApi from "../../../../api/neo4j/rescuePlanApi";

import KGVisiableRescuePlanNetwork from "./KGVisiableRescuePlanNetwork";
import KGVisiableRescuePlanNetworkLarge from "./KGVisiableRescuePlanNetworkLarge";

import KGVisible from "./KGVisible";
import KGVisibleEcahrts from "./KGVisibleEcahrts";
import KGUploadFile from "./KGUploadFile";
import KGBackup from "./KGBackup";
import KGVisibleVisNetwork from "./KGVisibleVisNetwork";
import KGDownloadFile from "./KGDownloadFile";
import KGVisibleVisNetworkLarge from "./KGVisibleVisNetworkLarge";

export default {
  name: "KGInstance",
  components: {
    KGVisiableRescuePlanNetwork,
    KGVisiableRescuePlanNetworkLarge,
    KGVisibleVisNetworkLarge,
    KGVisibleVisNetwork,
    KGVisibleEcahrts,
    KGVisible,
    KGUploadFile,
    KGBackup,
    KGDownloadFile
  },
  props: {
    kgConnectInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 滚动条显示
      timeLineHeight: "",
      //图例显示
      imgUrl: "1.jpg",
      //记录所有知识图谱的名称
      kgNameList: [],
      //记录所有的工程险情
      DangerList:[],
      DangerId:null,
      methodList:[],
      //记录所有知识图谱的id和名称
      kgIdNameList: [],
      //记录选定知识图谱拥有的全部标签
      nodeLabelList: [],
      //选定知识图谱id
      currentId: null,
      //选定知识图谱名称
      currentDbName: null,
      //选定类型监测对象类型
      currentType: null,
      //记录查询出的节点名称
      nodeNames: [],
      //记录查询出的节点id和名称
      nodeIdNames: [],
      //应急预案查询
      rescuePlan: {
        //监测对象属性列表
        attNameList: [],
        //当前选定监测对象名称
        currentName: null,
        //选定监测对象类型
        currentType: null,
        //查询出来的方案
        plans: {
          抢险方案对象: {}
        },
        //绘图标志
        drawFlag: false
      },

      tempAtt: null,
      labelPosition: "right",
      visibles: {
        dialogVisible: false,
        dialogVisible2: false,
        settingsVisible: false,
        dialogVisible3: false,
        largeKGVisible: false
      },
      //标记类
      flags: {
        relLazyCountFlag: 0,
        relLoadingFlag: false,
        loadingFlag: false,
        visibleTypeFlag: 4, //0表示只显示出边，1表示只显示入边，2表示出入边都显示，3表示显示完整的关系链,4表示流域概化图
        lengthFlag: 2,
        relTypeFlag: ["位于", "包含"]
      },
      //查询关键字
      key: {
        nodeKey: "",
        relNodeKey: ""
      },
      //搜索关键词
      searchkey:"",
      kgInfo: {},
      //显示设置
      visibleSettings: {
        length: 2, //关系链长度，默认为2
        visibleTypeFlag: 0,
        relType: []
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
      relNames: [],
      //查询出来的关系组合及id
      relNamesAndIds: [],
      //实现懒加载的relNames
      relNamesLazy: [],
      //记录下拉菜单索引
      number: 0,
      //记录通过名称查询出来的节点
      nodeByName: null,
      relByName: null,
      currentRelType: null,
      currentOntoId: null,
      currentRelId: null,
      KGSize: 0,
      //修改对话框是否开启
      editObjVisible: false,
      //增加对话框是否开启
      addObjVisible: false,

      editNodeInfo: {
        editNodeId: null,
        editNodeLabels: null,
        editNodeAtts: null
      },
      legend: [] //需要显示的图例类型
    };
  },
  mounted() {
    this.timeLineHeight = document.documentElement.clientHeight - 210;
    window.onresize = () => {
      this.timeLineHeight = document.documentElement.clientHeight - 210;
    };

    this.handleSettings();
    // this.initDbInfo()
    this.getInstNameList();
    this.getInstDangerList();
    this.rescuePlan.currentName="工程险情";
    this.currentType="工程险情";
    this.getContingencyPlanTwo();
    
  },
  
  created() {
    // this.currentDbName = this.$route.params.name
    //临时显示概化图所需内容
   
  },
  methods: {

    load() {
      this.flags.relLoadingFlag = true;
      this.flags.loadingFlag = true;
      setTimeout(() => {
        let origin = this.flags.relLazyCountFlag;
        this.flags.relLazyCountFlag = this.flags.relLazyCountFlag + 25;
        if (this.flags.relLazyCountFlag < this.relNames.length) {
          for (let i = origin; i < this.flags.relLazyCountFlag; i++) {
            this.relNamesLazy.push(this.relNames[i]);
          }
        } else {
          for (let i = origin; i < this.relNames.length; i++) {
            this.relNamesLazy.push(this.relNames[i]);
          }
        }
        this.flags.relLoadingFlag = false;
        this.flags.loadingFlag = false;
      }, 1000);

   
    },
    getInstDangerList(){
      console.log("接口已调用");
      rescuePlanApi.getNodesByName("工程险情", "", "5084A06CAF2C4AF097DC8B2D9A75F406").then( response  => {
        console.log("数据已调用");
          let list = response.data.data.nodeList;

          let nodeNameKey = "";

          for (let item of list) {
            let nodeType = item.nodeType;
            for (let t of nodeType) {
            
              console.log("t:" + t);
              if (t !== "5084A06CAF2C4AF097DC8B2D9A75F406") {
                nodeNameKey = t + "名称";
              }
            }
             
              let map = new Map(Object.entries(item.node));
              let name = map.get(nodeNameKey);
              if(name!="工程险情"){
               this.DangerList.push(name);
              }
            
             
           
          }
         
        }).catch(error => {
          console.log(error);
        });
    },

    getDangerLink(){
    
      console.log(114514);
      rescuePlanApi.getRescuePlanNode(this.DangerId,"工程险情","5084A06CAF2C4AF097DC8B2D9A75F406").then(({data})=>{
      console.log(1919810);
      console.log(this.DangerId);
     

        let name = "";
          let map = new Map(Object.entries(data.data));
          let keys = map.keys();
          for (let key of keys) {
            console.log("key", key);
            console.log("key", map.get(key));
            if(map.get(key).includes("险"))
            continue;
            name=key;
            console.log(name);
            this.methodList.push(name);
            
          }
          console.log(this.methodList);
        
          
        })
        .catch(error => {
          console.log(error);
        });

  


      

      

      },
    
    
    goBack() {
      const data = true;
      this.$emit("goBack", data);
    },
    changnode(){
      this.currentType="工程险情";
      
       this.getNodeByDangerName(this.DangerId);
       this.methodList=[];
       this.getDangerLink;
       this.getContingencyPlan();
       
    },
    changitem(){
      this.getNodeByName(this.item);
      // this.getContingencyPlan();
    },
    //选择实体菜单
    clearData() {
     this.methodList=[];
     this.getDangerLink;
     
    },

    //选择知识图谱下拉框改变当前知识图谱
    chooseKnowledegGraph(value) {
      this.currentDbName = value;

      for (const key in this.kgIdNameList) {
        if (this.kgIdNameList[key] === value) {
          this.currentId = key;
        }
      }
      console.log(this.currentDbName);
      console.log(this.currentId);

      this.getNodeLabelList();
    },

    //切换下拉菜单
    change(index) {
      this.number = index;
      // this.nodeNames = null
      this.nodeByName = null;
    },
    //清空查询出来的实体类型
    clear() {
      // this.nodeNames = null
      this.nodeByName = null;
    },
    getRelByName(name) {
      if (this.currentRelType === "下级行政区划") {
        for (let i in this.relNamesAndIds) {
          if (this.relNamesAndIds[i].path === name) {
            this.currentRelId = this.relNamesAndIds[i].id;
            break;
          }
        }

        let nameArray = name.split("->");
        this.relByName = [nameArray];
      }
      if (this.currentRelType === "关联") {
        //业务逻辑
        //TODO
      }
    },
    //获得所有知识图谱名称
    getInstNameList() {
      KGConnectApi.getInstNameList()
        .then(response => {
          this.kgIdNameList = response.data.data;
          for (const key in this.kgIdNameList) {
            this.kgNameList.push(this.kgIdNameList[key]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getNodeLabelList() {
      this.currentType = null;
      console.log(this.currentId);
      aggregateApi
        .getNodeLabels(this.currentId)
        .then(response => {
          this.nodeLabelList = response.data.data.nodeLabels;
          console.log(this.nodeLabelList);
        })
        .catch(error => {
          console.log(error);
        });
    },

    
       
    

    //根据名称进行模糊查询返回可能的节点名称
    getNodeContainsName() {
    
      rescuePlanApi
        .getNodesByName(this.currentType, this.key.nodeKey, this.currentId)
        
        .then(({ data }) => {
          
          let list = data.data.nodeList;

          this.nodeNames = [];
          this.nodeIdNames = [];

          let nodeNameKey = "";

          for (let item of list) {
            let nodeType = item.nodeType;
            for (let t of nodeType) {
              console.log("t:" + t);
              if (t !== "5084A06CAF2C4AF097DC8B2D9A75F406") {
                nodeNameKey = t + "名称";
              }
            }

            let map = new Map(Object.entries(item.node));
            let id = map.get("_id");
            let name = map.get(nodeNameKey);
            this.nodeNames.push(name);
            this.nodeIdNames.push(id, name);
          }
          
          console.log(this.nodeNames);
          console.log(this.nodeIdNames);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //根据名称进行查询返回结点所有信息
    getNodeByName(name) {
      this.currentType="抢护方法";
      rescuePlanApi
        .getNodesByName("抢护方法", name, "5084A06CAF2C4AF097DC8B2D9A75F406")
        .then(({ data }) => {
          this.nodeByName = [];
          this.nodeByName.push(data.data.nodeList[0].node);

          for (let key in this.nodeByName[0])
            if (key.includes("图片")) delete this.nodeByName[0][key];

          const att = new Map(Object.entries(this.nodeByName[0]));
          att.delete("_id");

          this.rescuePlan.attNameList = Array.from(att.keys());

          let properties = JSON.stringify(this.nodeByName[0]);
          this.editNodeInfo.editNodeAtts = JSON.parse(properties);
          this.editNodeInfo.editNodeId = data.data.nodeList[0].node._id;
          this.editNodeInfo.editNodeLabels = data.data.nodeList[0].nodeType;

          this.rescuePlan.currentName = name;

          console.log("当前水利对象： " + this.rescuePlan.currentName);
          this.key.nodeKey = this.rescuePlan.currentName;
          this.getContingencyPlan()
        })
        .catch(error => {
          console.log(error);
        });
    },
    getNodeByDangerName(name) {
      rescuePlanApi
        .getNodesByName(this.currentType, name, "5084A06CAF2C4AF097DC8B2D9A75F406")
        .then(({ data }) => {
          this.nodeByName = [];
          this.nodeByName.push(data.data.nodeList[0].node);

          for (let key in this.nodeByName[0])
            if (key.includes("图片")) delete this.nodeByName[0][key];

          const att = new Map(Object.entries(this.nodeByName[0]));
          att.delete("_id");

          this.rescuePlan.attNameList = Array.from(att.keys());
          

           let properties = JSON.stringify(this.nodeByName[0]);
           this.editNodeInfo.editNodeAtts = JSON.parse(properties);
           this.editNodeInfo.editNodeId = data.data.nodeList[0].node._id;
           this.editNodeInfo.editNodeLabels = data.data.nodeList[0].nodeType;

           this.rescuePlan.currentName = name;

           console.log("当前水利对象： " + this.rescuePlan.currentName);
           this.key.nodeKey = this.rescuePlan.currentName;
           this.getContingencyPlan();
        })
        .catch(error => {
          console.log(error);
        });
    },
    //应急预案查询
    getContingencyPlan() {
      this.rescuePlan.plans.抢险方案对象 = {};

      rescuePlanApi
        .getRescuePlanNode(
          this.rescuePlan.currentName,this.currentType,"5084A06CAF2C4AF097DC8B2D9A75F406")
        .then(({ data }) => {
          let map = new Map(Object.entries(data.data));
          let keys = map.keys();
          for (let key of keys) {
            console.log("key", key);
            console.log("key", map.get(key));
            this.rescuePlan.plans.抢险方案对象[key] = map.get(key);
          }
          console.log(this.rescuePlan.plans);
        })
        .catch(error => {
          console.log(error);
        });


      this.rescuePlan.drawFlag = !this.rescuePlan.drawFlag;

      console.log("查询已完成！");
    },

    //工程险情-工程险情查询
    getContingencyPlanTwo() {
      this.rescuePlan.plans.抢险方案对象 = {};
      console.log("Init接口调用了哦");
      rescuePlanApi
        .getRescueInitNode(
          
          this.rescuePlan.currentName,this.currentType,"5084A06CAF2C4AF097DC8B2D9A75F406")
        .then(({ data }) => {
          console.log("Init接口调用第二次了哦");
          let map = new Map(Object.entries(data.data));
          let keys = map.keys();
          for (let key of keys) {
            console.log("key", key);
            console.log("key", map.get(key));
            this.rescuePlan.plans.抢险方案对象[key] = map.get(key);
          }
          console.log(this.rescuePlan.plans);
        })
        .catch(error => {
          console.log(error);
        });


      this.rescuePlan.drawFlag = !this.rescuePlan.drawFlag;

      console.log("查询已完成！");
    },
    handleSettings() {
      this.visibleSettings.visibleTypeFlag = this.flags.visibleTypeFlag;
      this.visibleSettings.length = this.flags.lengthFlag;
      this.visibleSettings.relType = this.flags.relTypeFlag;
      this.visibles.settingsVisible = false;
    },

    getLegend(data) {
      this.legend = data;
    },

    handleKGSize(value) {
      if (value == 1) {
        this.visibles.largeKGVisible = true;
      } else {
        this.visibles.largeKGVisible = false;
      }

      this.KGSize = value;
    }
  },
  computed: {
    disabled() {
      return this.flags.relLoadingFlag || this.noMore;
    },
    noMore() {
      return this.flags.relLazyCountFlag >= this.relNames.length;
    },
    imgArr() {
      if (this.key.nodeKey === "临水截渗") {
        return ["1", "2", "3", "4(a)", "4(b)"];
      } else if (this.key.nodeKey === "背水反滤导渗") {
        return ["5(a)", "5(b)", "6", "7"];
      } 
      else if (this.key.nodeKey === "渗漏抢险") {
        return ["8(a)", "8(b)", "8(c)"]; 
      }else if (this.key.nodeKey === "缓流消浪") {
        return ["9", "10", "11"];
      }
       else if (this.key.nodeKey === "土袋子埝") {
        return ["13"];
      } else if (this.key.nodeKey === "桩梢子埝") {
        return ["14"];
      }  else if (this.key.nodeKey === "合龙") {
        return ["17", "18"];
      } else if (this.key.nodeKey === "开挖回填") {
        return ["21"];
      } else if (this.key.nodeKey === "横墙隔断") {
        return ["22"];
      } else if (this.key.nodeKey === "土料子堤") {
        return ["23"];
      } else if (this.key.nodeKey === "利用防浪墙抢筑子堤") {
        return ["24"];
      } else return [];
    }
  },
  watch: {
    relNames: {
      handler(newValue, oldValue) {
        if (oldValue.length > 0) {
          this.relNamesLazy = [];
          this.flags.relLazyCountFlag = 0;
          this.load();
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
。clearfix {
  background-color: #4ab7bd;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 700px;
  height: auto;
  margin-top: 20px;
  margin-left: 20px;
}

.box-card-2 {
  width: 600px;
  height: 650px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
