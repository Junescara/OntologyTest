<template>
    <div>
     <p align="left" style=" font-size: 16px;font-weight: bold;color: #777;">洪水调度方案查询</p>
    </div>
    <el-divider></el-divider>


      <div>
        <!--以下为流域选择的下拉菜单-->
        <el-form inline align=left>
          <el-form-item>
            <el-select clearable @clear="clear" @change="chooseWaterShed" v-model="currentId" placeholder="请选择流域"
                       style= "margin-top: 15px">
              <el-option
                v-for="(item,index) in regulation.kgNameList"
                :key=index
                :label=item
                :value=item
              />
            </el-select>
        </el-form-item>
        <!--以上为流域选择的下拉菜单-->

        <el-form-item>
          <!--以下为监测单位类型的下拉菜单-->

            <el-select clearable @clear="clear" @change="chooseEntity" v-model="label" placeholder="请选择监测单位类型"
                       style= "margin-top: 15px">
              <el-option
                v-for="(item,index) in nodeLabels"
                :key=index
                :label=item
                :value=item
              />
            </el-select>
   
        </el-form-item>

        </el-form>
        <el-form inline align="left">
            <el-form-item >
                <el-input placeholder="请搜索监测单位名称" class="input-with-select" v-model="ContainName">
                <template v-slot:append>
                    <el-button  icon="search" @click="getNodeContainsName"/>
                </template>
                    
              </el-input>
            </el-form-item>
            <el-form-item >
                <el-tag
                v-for="(item,index) in nodeNames"
                :key=index
                type=''
                effect="plain"
                @click="getNode(item)"
              >
                {{ item }}
              </el-tag>
            </el-form-item>
        </el-form>
        <el-form inline align=left>
            <el-form-item>
                <el-select clearable @clear="clear" @change="chooseAtt" v-model="regulation.attNameList.index" placeholder="请选择调度要素">
                <el-option
                  v-for="(item,index) in regulation.attNameList"
                  :key=index
                  :label=item
                  :value=item
                />
              </el-select>
                </el-form-item>
                <el-form-item>
              <el-input placeholder="请输入预报值" class="input-with-select" v-model="regulation.attValue">
                <template v-slot:append>
                <el-button type="primary" @click="getSchedulePlan">查 询</el-button>
                </template>
            </el-input>
             
              
                </el-form-item>
            
        </el-form>
    </div>

        
 <div style="display: flex;margin-top: 20px"  >
    <el-row :gutter="12">
    <el-col span="24">

        <el-card class="box-card" style = "width: 300px" >
        <template v-slot:header>
            <span>调度方案一览</span>
        </template>
      
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label="方案名">方案内容</el-descriptions-item>
          <template v-for="(item,index) in this.regulation.plans">
            <el-descriptions-item v-for="(proVals,proNames) in item" :label="proNames" :key="proNames">
              {{proVals}}
            </el-descriptions-item>
          </template>

        </el-descriptions>

      </el-card>
    </el-col>

    <el-col span="24">
 
        <el-card class="box-card-2" style="width: 450px;">
        
        <template v-slot:header>
            <span>知识图谱</span>
          <el-tag>
            调度方案图
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
            <el-tag size="mini" effect="dark" v-for="(nodeType, index) in this.regulation.currentNodeTypes" :key="index" :color="getTypeColor(nodeType)">
              {{ nodeType }}
            </el-tag>
          </div>
        </div>
        <!--        <el-empty description="描述文字"></el-empty>-->
<!--        <KGVisible/>-->
<!--        <KGVisibleEcahrts :current-node="nodeByName"></KGVisibleEcahrts>-->
<KGVisibleRegulationNetwork 
@child-event="onChildEvent"
        :draw-default="this.regulation.drawDefaultFlag"
         :draw-flag="this.regulation.drawFlag" 
         :current-id="this.currentId" 
         :att-value="this.regulation.attValue" 
         :current-att="this.regulation.currentAtt" 
         :current-name="this.regulation.currentName" 
         :current-node="nodeByName"
          :visible-settings="visibleSettings" 
          ></KGVisibleRegulationNetwork>
      </el-card>

    </el-col>
    <el-col span="24">

        <el-card class="box-card" style="width: 300px;padding-left: 20px;">
        <template v-slot:header>
            <span>实体类信息</span>
        </template>
    
        <el-descriptions :column="1">
          <el-descriptions-item label="实体所属类型">
            <el-tag size="small"  >{{ currentType }}</el-tag>
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
     
    </el-col>  
    </el-row>
        
    </div>
  


</template>

<script>
import {getNodesByName,getSchedulePlan,getHaihePlanLink,getDefaultRelLinks,getNodeByName} from "@/api/module/flood.js";
import KGVisibleRegulationNetworkLarge from '../KG/KGVisibleRugulationNetworkLarge.vue';
import KGVisibleRegulationNetwork from '../KG/KGVisibleRugulationNetwork.vue';


export default {
  components:{
    KGVisibleRegulationNetwork,
    KGVisibleRegulationNetworkLarge },

    data(){
        return{
          visibles:{
        dialogVisible:false,
        dialogVisible2:false,
        settingsVisible:false,
        dialogVisible3:false,
        largeKGVisible:false
      },
      flags:{
        relLazyCountFlag:0,
        relLoadingFlag:false,
        loadingFlag:false,
        visibleTypeFlag:4,//0表示只显示出边，1表示只显示入边，2表示出入边都显示，3表示显示完整的关系链,4表示流域概化图
        lengthFlag:2,
        relTypeFlag:["位于","包含"],
      },
          label:"",
          ContainName:"",
          currentType:"",
          nodeLabels:["水库"],
        nodeLabelLimit:"流域水循环对象",
        currentId:"",

        visibleSettings:{
        length:2, //关系链长度，默认为2
        visibleTypeFlag:0,
        relType:[],
      },
      editNodeInfo:{
        editNodeId:null,
        editNodeLabels: null,
        editNodeAtts:null
      },
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
      },
        key:{
            nodeKey:[]
        },
        nodeNames:[],
        nodeContainsNames:[],
        nodeByName:[],
        
        }
       
    }, 

    mounted(){
      this.regulation.drawDefaultFlag = !this.regulation.drawDefaultFlag
      console.log(this.regulation.drawDefaultFlag)
    },

    created(){
     
        // this.getDeafault();
    },
   
   

    methods:{
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
      return this.regulation.typeColors[nodeType] || 'default'
    },
      chooseWaterShed(){
        this.currentId = "H937377CBD954B169A4F8E97BFA9A1A0"
      },
      getNodeContainsName(){
        for(let i=0;i<this.nodeNames.length;i++){
          if(this.nodeNames[i].includes(this.ContainName))
          this.nodeContainsNames.push(this.nodeNames[i])
        }
        this.nodeNames = this.nodeContainsNames
        this.nodeContainsNames= []

      },
      chooseEntity(value){
        
        getNodesByName(this.label,"",this.currentId).then((response) => {
          this.nodeNames = []
          let i = response.data.length
          console.log(i)
          for(let j=0;j<i;j++){
            this.nodeNames.push(response.data[j].name)
          }
        });
        this.currentType = value
        
      },
        getDeafault(){
          getDefaultRelLinks("H937377CBD954B169A4F8E97BFA9A1A0").then((response) => {
          

        });
        },
        getNode(name){
          getNodeByName(this.label,name,this.currentId)
          .then((response) => {
          this.nodeByName = []
         
        
          this.nodeByName .push( response.data[0].node)
          console.log( this.nodeByName)
          this.nodeNames=[name]
          
          let properties = JSON.stringify(this.nodeByName[0]);
          this.editNodeInfo.editNodeAtts = JSON.parse(properties);

          this.editNodeInfo.editNodeId = response.data[0].node._id;
          this.editNodeInfo.editNodeLabels = response.data[0].nodeType;
          console.log("properties是"+properties);
          this.regulation.currentName = name;
          console.log("当前水利对象： " + this.regulation.currentName);
          this.key.nodeKey = this.regulation.currentName;
          
          
          

          })
          

    },
    getSchedulePlan(){
         //将查询到的结点中（海河流域水库） 汛限水位属性值和用户输入预报值对比，若用户输入值小于属性值，提示用户重新输入
         if(this.currentId == "H937377CBD954B169A4F8E97BFA9A1A0"&&this.regulation.currentAtt == "水位"){
            let flood_Limit_Level = this.nodeByName[0]['汛限水位(m)'];
            //从结点属性中取出汛限水位属性值，必须用原始的this.nodeByName[0]['汛限水位(m)'],不可以用properties['汛限水位(m)']
            console.log("汛限水位是"+flood_Limit_Level);
            if(this.regulation.attValue <= flood_Limit_Level) {
              alert("当前水库的汛限水位为 "+flood_Limit_Level +"m,请输入大于该汛限水位的值");
              //清空输入框
              this.regulation.attValue = "";
            }
          }
        console.log("当前选择要素： " + this.regulation.currentAtt);
      console.log("预报值： " + this.regulation.attValue);
      console.log("当前查询的对象名称： " + this.regulation.currentName);
     // if(this.regulation.currentId == "H937377CBD954B169A4F8E97BFA9A1A0")   //海河流域的ID
      if(this.currentId == "H937377CBD954B169A4F8E97BFA9A1A0")
      {
        this.getNode(this.regulation.currentName);
        console.log(this.regulation.currentName)
        console.log("海河流域，getHaihePlanLink请求被执行")
        getHaihePlanLink(this.regulation.currentName, this.regulation.currentAtt, this.regulation.attValue, this.currentId)
          .then((data) => {
            let list = data.data.finalNodeVos;
            console.log(list)
            this.regulation.plans = []
          
            for(let node of list){
              let map = new Map(Object.entries(node.node))
              console.log("size"+map.size)
              console.log(...map.entries()) 
         
              if(map.get("方案ID") != null){
               
                let planSet = {}
         
              Reflect.set(planSet, map.get("方案ID"),map.get(this.regulation.nameSymbol))
              this.regulation.plans.push(planSet);
              }
              console.log(this.regulation.plans)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      
      }
      this.regulation.drawFlag = !this.regulation.drawFlag
    }
   
    
    }

}

</script>

<style>

</style>