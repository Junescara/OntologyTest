<template>
  <div style="display: flex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>知识库管理</span>
        <el-button @click="addObjVisible = true" style="float: right; padding-top: 1px" type="text">增加</el-button>
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
        <el-table style="width: 100%" :data="ontoData" v-infinite-scroll="load" height="550">
          <el-table-column
            prop="_id"
            label="id"
            width="75">
          </el-table-column>
          <el-table-column
            prop="objName"
            label="名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="objMessage"
            label="属性"
            width="200">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card-2">
      <KGVisForOntology v-show="0===visStyle"></KGVisForOntology>
      <KGVisForOntologyProp v-show="2===visStyle"></KGVisForOntologyProp>
      <KGVisForOnto2 v-show="1===visStyle" :current-node="currentOnto"></KGVisForOnto2>
    </el-card>


    <!--以下为增加本体卡片-->
    <el-dialog
      title="增加本体"
      :visible.sync="addObjVisible"
      width="25%"
      center>
              <el-form :model="OntologyForm" class="demo-form-inline">
                <el-form-item label="请选择需要增加的本体类型" prop="name">
                  <el-cascader
                    v-model="OntologyForm.types"
                    :options="addOptions"
                    :props="{ expandTrigger: 'hover' }"
                    style="margin-left: 6px "
                    @change="chooseAddAtts"></el-cascader>
                </el-form-item>
                <el-form-item
                  v-for="(domain) in OntologyForm.attributes"
                  :label="domain.name"
                  :key="domain.key"
                  :prop="domain.key">
                  <el-input v-model="domain.value"></el-input>
                </el-form-item>
              </el-form>


              <span slot="footer" class="dialog-footer">
                <el-button @click="addObjVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOntology">确 定</el-button>
              </span>
    </el-dialog>


  </div>

</template>

<script>
  import KGVisible from './KGVisible'
  import KGVisForOntology from "./KGVisForOntology";
  import KGVisForOnto2 from "./KGVisForOnto2";
  import KGVisForOntologyProp from "./KGVisForOntologyProp";
  import ontologyApi from "../../../../api/neo4j/ontology";
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
      //增加对话框是否开启
      addObjVisible: false,
      //增加本体的相关信息
      OntologyForm: {
        //本体的标签信息
        types:[],
        //本体的属性列表，记录要添加的属性
        attributes:[{
        }]
      },
      //增加、修改本体时用于提交的数据格式
      submitOntology: {
        //本体的标签信息
        types:[],
        //本体的属性列表，记录要添加的属性
        attributes:[]
      },
      //“增加本体或关系”标签选择
      addOptions:[{
        value: '对象本体',
        label: '对象本体'
      },
        {
        value: '属性本体',
        label: '属性本体'
      },
        {
          value: '对象关系',
          label: '对象关系'
        }],
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
      ontoData:[]
    }
  },
  methods:{
    change(index) {
      this.visStyle = index;
      this.number = index;
      this.objName = null;
      this.propName = null;

    },
    //清空查询出来的本体类型
    clear() {
      this.objName = null
      this.propName = null
    },
    //增加选定本体
    addOntology() {
      this.submitOntology.attributes = []
      this.submitOntology.types = []
      this.submitOntology.types.push(this.OntologyForm.types[0]);
      this.OntologyForm.attributes.forEach((item) => {
        if(item.value !== "" && item.value !== null){
          this.submitOntology.attributes.push({
            name: item.name,
            value: item.value
          });
        }
      });
      if(this.OntologyForm.types[0]==="对象关系"){
        this.submitOntology.types.pop();
        this.submitOntology.types.push(this.submitOntology.attributes[0].value)
        this.submitOntology.attributes.splice(0,1)
        console.log(JSON.stringify(this.submitOntology))
        relationApi.addRel(JSON.stringify(this.submitOntology))
          .then(
            (response) => {
              //如果起始本体不存在
              if(response.data.data===-1){
                this.$message({
                  type: 'error',
                  message: '起始本体不存在!'
                });
              } else if(response.data.data===-2){
                this.$message({
                  type: 'error',
                  message: '终止本体不存在!'
                });
              }else{
                let mes = 'id为' + response.data.data + '的关系创建成功!'
                this.$message({
                  type: 'success',
                  message: mes
                });
              }
            })
          .catch(
            (error) => {
              console.log(error);
            }
          );
        this.addObjVisible = false
      }
      else{
        console.log(JSON.stringify(this.submitOntology))
        ontologyApi.addNode(JSON.stringify(this.submitOntology))
          .then(
                (response) => {
                  let mes = 'id为' + response.data.data + '的本体创建成功!'
                  this.$message({
                    type: 'success',
                    message: mes
                  });
                })
          .catch(
            (error) => {
                    console.log(error);
                  }
          );

        this.addObjVisible = false
      }
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
    //增加功能 —— 根据标签选择对应本体或关系的属性
    chooseAddAtts(types){

      //清空属性列表
      this.OntologyForm.attributes = [];

      if(types[0]==="对象关系"){
        this.OntologyForm.attributes.push({
          key: "relationType",
          name: "关系类型",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "startOntoId",
          name: "起始本体id",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "endOntoId",
          name: "终止本体id",
          value: ""
        });
      }
      else if(types[0]==="对象本体"){
        this.OntologyForm.attributes.push({
          key: "objName",
          name: "对象名称",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "objInfo",
          name: "对象标识信息",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "featureInfo",
          name: "主要特征信息",
          value: ""
        });
      }
      else if(types[0]==="属性本体"){
        this.OntologyForm.attributes.push({
          key: "attName",
          name: "属性名称",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "attEngName",
          name: "属性标识",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "attTypeAndLength",
          name: "类型及长度",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "hasNull",
          name: "有无空值",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "unit",
          name: "计量单位",
          value: ""
        });
        this.OntologyForm.attributes.push({
          key: "isKey",
          name: "主键",
          value: ""
        });
      }
      else{
        console.log("没有写");
      }

    },
    getOntoTableList() {
      ontologyApi.getOntoTableList().then(({data}) => {
        this.ontoData = data.data.ontologyTableList
        console.log("ontoData++++++",this.ontoData)
      })
    },
    load(){

    }
  },
  mounted() {
    this.getOntoTableList()
  }
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
