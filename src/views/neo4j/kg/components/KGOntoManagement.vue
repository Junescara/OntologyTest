<template>
  <div style="display: flex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>知识库管理</span>
      </div>
      <div>
        <el-button @click="change(0)">对象本体</el-button>
        <el-button @click="change(2)">属性本体</el-button>
        <div v-show="0===number">
          <el-select v-show="0===number" clearable @clear="clear" @change="objChange" v-model="LabelOfOntoObj.index" placeholder="请选择类型"
                     style="margin-top: 20px">
            <el-option
              v-for="(item,index) in LabelOfOntoObj"
              :key=index
              :label=item
              :value=item

            />
          </el-select>
<!--          <div style="margin-top: 15px;">-->
<!--            <el-input placeholder="请搜索实体名称" class="input-with-select" v-model="key.nodeKey">-->
<!--              <el-button slot="append" icon="el-icon-search" @click="getNodeContainsName"/>-->
<!--            </el-input>-->
<!--          </div>-->
        </div>
        <div style="margin-top: 15px;">
          <el-input placeholder="请搜索" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
        <el-empty description="描述文字"/>
      </div>
    </el-card>
    <el-card class="box-card-2">
      <KGVisForOntology v-show="0===visStyle"></KGVisForOntology>
      <KGVisForOntologyProp v-show="2===visStyle"></KGVisForOntologyProp>
      <KGVisForOnto2 v-show="1===visStyle" :current-node="currentOnto"></KGVisForOnto2>
    </el-card>
  </div>
</template>

<script>
  import KGVisible from './KGVisible'
  import KGVisForOntology from "./KGVisForOntology";
  import KGVisForOnto2 from "./KGVisForOnto2";
  import KGVisForOntologyProp from "./KGVisForOntologyProp";
  import aggregateApi from '@/api/neo4j/aggregate';
  import KGVisibleEcahrts from "./KGVisibleEcahrts";
  import relationApi from "../../../../api/neo4j/relationApi";
  import KGUploadFile from "./KGUploadFile";
  import KGConnectApi from "../../../../api/neo4j/KGConnectApi";
  import ReservoirApi from "../../../../api/neo4j/ReservoirApi";
  import WaterGateApi from "../../../../api/neo4j/WaterGateApi";
  import RiverApi from "../../../../api/neo4j/RiverApi";
  import WaterShedApi from "../../../../api/neo4j/WaterShedApi";
  import ontology from "../../../../api/neo4j/ontology";
export default {
  name: 'KGOntoManagement',
  components: {KGVisible,KGVisForOntology,KGVisForOnto2,KGVisForOntologyProp},
  data(){
    return{
      number: 0,
      currentOnto: null,
      visStyle:0,
      objName:null,
      propName:null,
      LabelOfOntoObj:[
        "水利对象",
        "水库",
        "流域",
        "测站",
        "湖泊",
        "断面",
        "河段",
        "水闸",
        "河流",
      ],
    }
  },
  methods:{
    change(index) {
      this.visStyle = index;
      this.number = index;
      this.objName = null;
      this.propName = null;

    },
    //清空查询出来的实体类型
    clear() {
      this.objName = null
      this.propName = null
    },
    objChange(value) {
      switch (value) {
        case '水利对象':
          ontology.getOntoIDbyName("水利对象")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '湖泊':
          ontology.getOntoIDbyName("湖泊")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '水库':
          ontology.getOntoIDbyName("水库")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '流域':
          ontology.getOntoIDbyName("流域")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '测站':
          ontology.getOntoIDbyName("测站")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '河流':
          ontology.getOntoIDbyName("河流")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '河段':
          ontology.getOntoIDbyName("河段")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '水闸':
          ontology.getOntoIDbyName("水闸")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '断面':
          ontology.getOntoIDbyName("断面")
            .then((response) => {
              this.visStyle = 1
              this.currentOnto = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        default:
          this.visStyle = 1
          this.currentOnto = 7
      }
    },
  },
}
</script>

<style scoped>
.clearfix {
  background-color: white;
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
  height: 790px;
  margin-top: 20px;
  margin-left: 20px;
}

.box-card-2 {
  width: 1500px;
  height: 800px;
  margin-top: 10px;
  margin-left: 10px;
  background-color: lightgray;
}
</style>
