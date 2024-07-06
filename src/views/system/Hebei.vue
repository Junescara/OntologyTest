<template>
  <div style="display: flex; margin-top: 10px">
    <el-row :gutter="24">
      <el-col span="24">
        <el-card class="box-card-2" style="width: 250px">
          <el-collapse v-model="activeNames" @change="handleChange" accordion>
            <el-collapse-item title="关联河道" name="1">
              <div
                :style="{ 'max-height': this.timeLineHeight + 'px' }"
                style="overflow-y: scroll"
              >
                <el-card
                  class="box-card-2"
                  v-for="(item, index) in this.active[0]"
                  :key="index"
                  :label="item.name"
                >
                  <el-descriptions
                    column="1"
                    v-for="(prop, index) in item.propObjList"
                    :key="index"
                  >
                    <el-descriptions-item :label="prop.name">
                      {{ prop.value }}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-card>
              </div>
            </el-collapse-item>
            <el-collapse-item title="关联湖泊" name="2">
              <div
                :style="{ 'max-height': this.timeLineHeight + 'px' }"
                style="overflow-y: scroll"
              >
                <el-card
                  class="box-card-2"
                  v-for="(item, index) in this.active[0]"
                  :key="index"
                  :label="item.name"
                >
                  <el-descriptions
                    column="1"
                    v-for="(prop, index) in item.propObjList"
                    :key="index"
                  >
                    <el-descriptions-item :label="prop.name">
                      {{ prop.value }}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-card>
              </div>
            </el-collapse-item>
            <el-collapse-item title="关联水库" name="3">
              <div
                :style="{ 'max-height': this.timeLineHeight + 'px' }"
                style="overflow-y: scroll"
              >
                <el-card
                  class="box-card-2"
                  v-for="(item, index) in this.active[0]"
                  :key="index"
                  :label="item.name"
                >
                  <el-descriptions
                    column="1"
                    v-for="(prop, index) in item.propObjList"
                    :key="index"
                  >
                    <el-descriptions-item :label="prop.name">
                      {{ prop.value }}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-card>
              </div>
            </el-collapse-item>
            <el-collapse-item title="关联堤防" name="4">
              <div
                :style="{ 'max-height': this.timeLineHeight + 'px' }"
                style="overflow-y: scroll"
              >
                <el-card
                  class="box-card-2"
                  v-for="(item, index) in this.active[0]"
                  :key="index"
                  :label="item.name"
                >
                  <el-descriptions
                    column="1"
                    v-for="(prop, index) in item.propObjList"
                    :key="index"
                  >
                    <el-descriptions-item :label="prop.name">
                      {{ prop.value }}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-card>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>

      <el-col span="24">
        <el-card class="box-card-2" style="width: 600px">
          <template v-slot:header>
            <span>知识图谱</span>
            <el-tag>
              {{ drawTag }}
            </el-tag>
          </template>
          <div>
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
              <el-tag
                size="mini"
                effect="dark"
                v-for="(nodeType, index) in this.regulation.currentNodeTypes"
                :key="index"
                :color="getTypeColor(nodeType)"
              >
                {{ nodeType }}
              </el-tag>
            </div>
          </div>
          <!--        <el-empty description="描述文字"></el-empty>-->
          <!--        <KGVisible/>-->
          <!--        <KGVisibleEcahrts :current-node="nodeByName"></KGVisibleEcahrts>-->
          <KGVisibleHebeiNetwork
            v-if="!empty&&!STCDempty"
            @child-event="onChildEvent"
            @childByValue="childByValue"
            @childByValueTwo="childByValueTwo"
            :draw-default="this.regulation.drawDefaultFlag"
            :draw-flag="this.regulation.drawFlag"
            :current-id="this.currentId"
            :att-value="this.regulation.attValue"
            :current-att="this.regulation.currentAtt"
            :current-name="this.regulation.currentName"
            :current-node="nodeByName"
            :visible-settings="visibleSettings"
            :neo-id="this.neoId"
            :stcd="this.stcd"
            :Skey="this.Skey"
          ></KGVisibleHebeiNetwork>
          <el-empty v-if="empty&&!STCDempty" description="图谱为空"></el-empty>
          <el-empty v-if="STCDempty" description="无此测站数据，请重新选择"></el-empty>
        </el-card>
      </el-col>

      <el-col span="24" :gutter="12">
        <el-row span="24">
          <el-card class="box-card" style="width: 300px">
            <template v-slot:header>
              <span>实体属性</span>
            </template>

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
            <!-- 滑动条 -->
            <div
              :style="{ 'max-height': this.timeLineHeight + 'px' }"
              style="overflow-y: scroll"
            >
              <el-descriptions
                v-for="(item, index) in nodeByName"
                class="margin-top"
                title="实体属性"
                :key="index"
                :column="1"
                border
              >
                <el-descriptions-item label="属性名"
                  >属性值</el-descriptions-item
                >
                <el-descriptions-item
                  v-for="(value, name) in item"
                  :label="value.name"
                  :key="value.name"
                >
                  {{ value.value }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </el-row>

        <div v-if="!Sempty">
          <el-row span="24">
            <el-card class="box-card" style="width: 300px">
              <template v-slot:header>
                <span>调度规则</span>
              </template>
              <div
                :style="{ 'max-height': this.timeLineHeight + 'px' }"
                style="overflow-y: scroll"
              >
                <el-card
                  class="box-card-2"
                  v-for="(item, index) in this.regulation.plans[0]"
                  :key="index"
                >
                  <el-descriptions
                    column="1"
                    v-for="(prop, index) in item.propObjList"
                  >
                    <el-descriptions-item :key="index" :label="prop.name">
                      {{ prop.value }}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-card>
              </div>
            </el-card>
          </el-row>
        </div>
        <el-card v-if="Sempty" class="box-card" style="width: 300px">
          <template v-slot:header>
            <span>调度规则</span>
          </template>
          <el-empty description="调度规则为空"></el-empty>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getNodesByName,
  getSchedulePlan,
  getHaihePlanLink,
  getDefaultRelLinks,
  getNodeByName,
} from "@/api/module/flood.js";
import KGVisibleHebeiNetwork from "../KG/KGVisibleHebeiNetwork.vue";
import { getEntity } from "@/api/module/result.js";
import {
  getHebeiKG,
  getHebeiNeoid,
  getHebeiLink,
  getHebeiRegulation,
  getWaterHebeiKG,
} from "@/api/module/Hebei.js";
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  components: {
    KGVisibleHebeiNetwork,
  },

  data() {
    return {
      stcd:"",
      active:[],
      Sempty:true,
      STCDempty:null,
      neoId:"",
      activeProp:[],
      regulation: {
        
        //调度要素列表
        attNameList: ["水位"],
        //当前选择的水利对象名称
        currentName: null,
        //当前选择的要素
        currentAtt:"水位",
        //预报值
        attValue: null,
        //名称和标签的标志，由于调度数据库中的名称不一样，因此单独列出来
        nameSymbol: "name",
        labelSymbol: "label",
        //查询出来的调度方案
        plans: null,
        //绘图标志
        drawFlag: false,
        //初始绘图标志
        drawDefaultFlag: false,
        //当前存在的节点类型
        currentNodeTypes: null,
        // 类型名称和颜色的映射关系对象
        typeColors: {},
        //记录所有知识图谱的名称
        kgNameList: ["海河流域知识图谱"],
        //记录所有知识图谱的id和名称
        kgIdNameList:["H937377CBD954B169A4F8E97BFA9A1A0"],
        plans:[]
      },
      nodeByName:[],
      empty:null,
      currentType:"",
      drawTag:"流域概化图",
      Skey:1

    };
  },

  mounted() {
    
    this.getType();
    
    this.getStation();
  

    console.log(this.regulation.drawDefaultFlag);
    this.timeLineHeight = document.documentElement.clientHeight - 400;
    window.onresize = () => {
      this.timeLineHeight = document.documentElement.clientHeight - 400;
      console.log(this.neoId)
    
    };
    
    
  
  },

  created() {
    this.getParams();
    this.Empty();
   
   

    // this.getDeafault();
  },

  methods: {
    Empty(){
      
      axios.post('http://10.243.45.129:9022/hbsw/stcd/neoid',{
        stcd:this.stcd
      })
      .catch(error=>{
        this.STCDempty = true;
       
      })
      //   console.log(this.stcd)
      //   console.log(this.neoId)
      // this.STCDempty = false;
      // if(this.neoId.length<2){
      //   this.STCDempty = true;
      // }

     

     
    
   

    },
    handleChange(val) {
   
      if (val == 1) {
        this.Skey = 1
        console.log(this.key)
        this.empty = false;
        this.Sempty = true;
        this.active = [];
        this.activeProp = [];
        this.drawTag = "流域概化图";
       
        
        //   this.active=[];
        //   this.active=[{name:"永定河",
        //   code:"CC000000000S",
        //   origin:"山西省左云县马道头乡潘家窑村",
        //   out:"天津市滨海新区临港工业区临港工业虚拟社区",
        //   area:"47396",
        //   city:"山西省大同市左云县，朔州市右玉县、山阴县、平鲁区、朔城区、应县、怀仁市，大同市云州区、阳高县；河北省张家口市阳原县、宣化区、涿鹿县、怀来县；北京市门头沟区、石景山区、丰台区、房山区、大兴区；河北省保定市涿州市，廊坊市固安县、永清县、广阳区、安次区；天津市",

        // },
        // ]

        getHebeiLink(this.neoId, "所属河流").then((data) => {
          this.active.push(data.data);

          console.log(this.active);
        });
        val=" "
      }
      if (val == 2) {
        this.active = [];
        this.activeProp = [];
        getHebeiLink(this.neoId, "所属湖泊").then((data) => {
          this.active = data.data;
          this.activeProp.push(data.data.propObjList);
          console.log(this.activeProp);
        });
      }
      if (val == 3) {
    
        this.Skey=3
        this.empty = false;
        this.Sempty = true;
        this.active = [];
        this.activeProp = [];
        this.drawTag = "调度规则图";
        console.log("方法被启动");

        getHebeiRegulation(this.neoId).then((data) => {
          this.regulation.plans.push(data.data);
          
          let tmp = [];
          tmp.push(this.regulation.plans[0]);
          console.log(tmp)
          console.log("长度为" + tmp.length);
          if (tmp[0] == null) {
            this.Sempty = true;
          } else {
            this.Sempty = false;
          }
          console.log( this.Sempty)
        });

        getHebeiLink(this.neoId, "所属水库").then((data) => {
          this.active = data.data;
          this.activeProp = data.data.propObjList;
          console.log(this.activeProp);
        });

      
        console.log(this.regulation.drawFlag);
     
            
        
      }
      if (val == 4) {
        this.active = [];
        this.activeProp = [];
        getHebeiLink(this.neoId, "所属堤防").then((data) => {
          this.active.push(data.data);
          this.activeProp.push(data.data.propObjList);
          console.log(this.activeProp);
        });
      }
      console.log(val);
      this.regulation.drawFlag = !this.regulation.drawFlag;
    },
    childByValue(empty) {
      console.log(empty);
      this.empty = empty;
    },
    childByValueTwo(neoId) {
      console.log(empty);
      this.neoId = neoId;
    },
    //传递绘图时获得的结点类型
    onChildEvent(message) {
      this.regulation.currentNodeTypes = message;
      //清楚字母和数字的组合类型
      // for (let i = 0; i < this.regulation.currentNodeTypes.length; i++) {
      // (/^[^a-zA-Z0-9]*$/.test(nodeType))
      // if (nodeType === "A387BE524D344370A13F1DFF76C40493"){
      //   this.regulation.currentNodeTypes.splice(i,1)
      // }
      // }
      this.regulation.currentNodeTypes =
        this.regulation.currentNodeTypes.filter(
          (str) => !/^[A-F0-9]{32}$/i.test(str)
        );

      for (let i = 0; i < this.regulation.currentNodeTypes.length; i++) {
        let nodeType = this.regulation.currentNodeTypes[i];
        //如果没有这个类型，添加一个
        if (!this.regulation.typeColors.hasOwnProperty(nodeType)) {
          this.regulation.typeColors[nodeType] = this.generateRandomColor();
        }
      }
      console.log("清理后的label： ", this.regulation.currentNodeTypes);
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
    getTypeColor(nodeType) {
      return this.regulation.typeColors[nodeType] || "default";
    },

    getParams() {
      this.stcd = this.$route.query.stcd;
      console.log(this.stcd);
      
   
      console.log(this.neoId)
      console.log(this.STCDempty)
  
    },
    getneoId() {
      try {
        getHebeiNeoid(this.stcd).then((data) => {
          console.log(data);
          console.log(data.data.neoId);
       
            this.neoId = data.data.neoId;
            console.log(this.neoId);
          
        });
      } catch (error) {
        console.log(error);
        ElMessage.alert("没有此测站数据");
      }
    },

    getType() {
      if (this.stcd != " ") {
        this.currentType = "测站";
      }
    },
    

    getStation() {
      if (this.neoId == " ") {
        alert("图谱中未包含此测站");
      } else {
        getHebeiNeoid(this.stcd).then((data) => {
          console.log(data);
          console.log(data.data.neoId);
          this.neoId = data.data.neoId;
          getEntity(data.data.neoId).then((data) => {
            let prop = [];
            this.nodeByName.push(data.data.propObjList);
            console.log(this.nodeByName[0]);
            this.nodeByName[0].map((item, index) => {
              if (item.value == null || item.value == "null") {
                Reflect.set(this.nodeByName[0][index], "value", " ");
              }
              console.log(this.nodeByName[0][index].value);
            });
          });
        });
      }

      //   console.log(this.neoId)
      // })
    },
  },
  watch: {
    $route(to, from) {
      if (to.fullPath.indexOf("Hebei") !== -1) {
        this.stcd = to.query.stcd;
      }
    },
   
  },
};
</script>

<style></style>
