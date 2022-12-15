<template>
  <div style="display: flex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>知识库管理</span>
      </div>
      <div>
        <el-button @click="change(0)">对象本体</el-button>
        <el-button @click="change(1)">属性本体</el-button>
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
      <KGVisForOnto2 v-show="1===visStyle" :current-node="currentOnto"></KGVisForOnto2>
    </el-card>
  </div>
</template>

<script>
  import KGVisible from './KGVisible'
  import KGVisForOntology from "./KGVisForOntology";
  import KGVisForOnto2 from "./KGVisForOnto2";
  import aggregateApi from '@/api/neo4j/aggregate';
  import KGVisibleEcahrts from "./KGVisibleEcahrts";
  import relationApi from "../../../../api/neo4j/relationApi";
  import KGUploadFile from "./KGUploadFile";
  import KGConnectApi from "../../../../api/neo4j/KGConnectApi";
  import ReservoirApi from "../../../../api/neo4j/ReservoirApi";
  import WaterGateApi from "../../../../api/neo4j/WaterGateApi";
  import RiverApi from "../../../../api/neo4j/RiverApi";
  import WaterShedApi from "../../../../api/neo4j/WaterShedApi";
export default {
  name: 'KGOntoManagement',
  components: {KGVisible,KGVisForOntology,KGVisForOnto2},
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
      ],
    }
  },
  methods:{
    change(index) {
      this.visStyle = 0;
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
          this.visStyle = 1
          this.currentOnto = 7
          break;
        case '湖泊':
          this.visStyle = 1
          this.currentOnto = 10
          break;
        case '水库':
          this.visStyle = 1
          this.currentOnto = 20
          break;
        case '流域':
          this.visStyle = 1
          this.currentOnto = 8
          break;
        case '测站':
          this.visStyle = 1
          this.currentOnto = 17
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
