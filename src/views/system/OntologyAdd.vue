<template>





   <span>
    <div >
     <el-form inline label-position="left"  align="left">
      <el-form-item>
        <el-text>类型选择：</el-text>
      </el-form-item>
      <el-form-item >
            <el-select
          v-model="ontoType"
          @change="changeType($event,ontoType)"
          placeholder="请选择添加的类型"
          clearable
          filterable
        >
        <el-option label="实体类型" value="object" selected></el-option>
      <el-option label="属性" value="attribute"></el-option>
      <el-option label="关系" value="relation"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item >
      <el-input v-show="object" v-model="name" placeholder="请输入实体名" clearable >
      </el-input>
      <el-input v-show="attribute" v-model="name" placeholder="请输入属性名" clearable >
      </el-input>
      <el-input v-show="relation" v-model="name" placeholder="请输入关系名" clearable >
      </el-input>
    </el-form-item>
    <el-form-item >
       <!-- 提交按你 -->
    <el-button v-show="object"  type="success" @click="create" >提交</el-button>
    <el-button v-show="attribute"  type="success" @click="Attcreate" >提交</el-button>
    <el-button v-show="relation"  type="success" @click="Recreate" >提交</el-button>
    </el-form-item>
      <el-form-item >
       
      </el-form-item>
      <el-form-item >
        <el-button  type="primary"  @click="OntoView">
          查看
        </el-button>
      </el-form-item>
      <el-form-item  >
        <el-button type="primary"  @click="OntoAdd">
         新增
        </el-button>
      </el-form-item>
      <el-form-item >
        <el-button type="primary"  @click="OntoWatch">
         浏览
        </el-button>
      </el-form-item>
    </el-form>
    </div>
    
   </span>

   <!-- 属性本体页面 -->
   <div v-show="attribute" >

    
<el-form label-width="100px" label-position="left" align="left" inline >
  <el-form-item>
    <el-select
          v-model="type"
          @change="Type($event,type)"
          placeholder="请选择属性类型"
          filterable
        >
        <el-option label="数值类" value="val" selected></el-option>
      <el-option label="文本类" value="text"></el-option>
      <el-option label="日期类" value="date"></el-option>
      <el-option label="布尔类" value="bool"></el-option>
        </el-select>
  </el-form-item>
  
<el-form-item>
  <el-input  v-model="dimension" placeholder="请输入单位" clearable >
      </el-input>
</el-form-item>
<el-form-item>
  <el-input  v-model="lowerBound" placeholder="请输入下限" clearable >
      </el-input>
</el-form-item>
<el-form-item>
  <el-input  v-model="upperBound" placeholder="请输入上限" clearable >
      </el-input>
</el-form-item>
</el-form>
</div>


<div v-show="object">
  <el-divider ></el-divider>
</div>
   
<div v-show="object">
  <div align="left">请选择此本体应有的属性：</div>
 <div align-items: center>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: auto" border stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="auto" align="left" /> 
    <el-table-column  prop="name" label="属性名" width="auto" align="left"></el-table-column>
    <el-table-column  prop="rangeItem.lowerBound,rangeItem.upperBound" width="auto" align="left" label="范围" >
<template #default="scope" >
<div v-if="scope.row.rangeItem"><el-tag size="medium">{{ scope.row.rangeItem.lowerBound }}~{{ scope.row.rangeItem.upperBound }}</el-tag></div>
</template>
</el-table-column>
<el-table-column  prop="dimension" label="单位" width="auto" align="left"></el-table-column>

   
  </el-table>

  <el-pagination align='center' 
  @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[2, 5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">
</el-pagination>

<br>
 
 </div>

 
</div>

<div v-show="attribute">
  <div align="left">现有属性：</div>
 <div align-items: center>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: auto" border stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
    <el-table-column  prop="name" label="属性名" width="auto" align="left"></el-table-column>
    <el-table-column  prop="rangeItem.lowerBound,rangeItem.upperBound" width="auto" align="left" label="范围" >
<template #default="scope" >
<div v-if="scope.row.rangeItem"><el-tag size="medium">{{ scope.row.rangeItem.lowerBound }}~{{ scope.row.rangeItem.upperBound }}</el-tag></div>
</template>
</el-table-column>
<el-table-column  prop="dimension" label="单位" width="auto" align="left"></el-table-column>
<el-table-column label="属性操作" width="100">
           <template v-slot="scope">
             <el-button
               link
               type="danger"
               size="small"
               @click="EditProp(scope.row.neoId)"
               >删除属性</el-button
             >

           </template>

         </el-table-column>


   
  </el-table>

  <el-pagination align='center' 
  @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[2, 5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">
</el-pagination>
</div>
<br>
 
 </div>
<!-- 本体间的关系页面 -->
 <div v-show="relation">
  <el-form  label-width="100px" label-position="left" align="left" inline >
<el-form-item>
  <el-select
          v-model="AId"
          placeholder="请选择A本体"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in ontoList1"
            :key="index"
            :label="item.name "
            :value="item.neoId"
          />
        </el-select>
</el-form-item>

<el-form-item>
  <el-select
          v-model="BId"
          placeholder="请选择B本体"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in ontoList2"
            :key="index"
            :label="item.name"
            :value="item.neoId"
          />
        </el-select>
</el-form-item>
<el-form-item>
  <el-button  type="primary"  @click="handelReturn">
          返回
        </el-button>
</el-form-item>
<el-divider></el-divider>
  </el-form>
  <div style="display: flex;overflow:auto" >
            <KGVisibleVisNetwork
                    ref="KGVisibleVisNetwork"
                    :kgTypeProp = "1"
                    :neoIdProp = "neoId"
                    :snameProp = "sname"
            >
            </KGVisibleVisNetwork>
        </div>
</div>


<!-- 关系本体页面 -->
<!-- 
<div v-show="objectrel">
  <el-form  label-width="100px" label-position="left" align="left" inline >
<el-form-item>
  <el-select
          v-model="SId"
          placeholder="请选择A本体"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in ontoList1"
            :key="index"
            :label="item.name "
            :value="item.neoId"
          />
        </el-select>
</el-form-item> -->
<!-- 
<el-form-item>
  <el-select
          v-model="EId"
          placeholder="请选择B本体"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in ontoList2"
            :key="index"
            :label="item.name"
            :value="item.neoId"
          />
        </el-select>
</el-form-item>
<el-form-item>
  <el-button  type="primary"  @click="handelReturn">
          返回
        </el-button>
</el-form-item>
<el-divider></el-divider>
  </el-form>
 
</div> -->
<br>
 

<br>

</template>


<script >
import {createOnto} from "@/api/module/ontology.js";
import { listbasic } from "@/api/module/ontology.js";
import {loadOntoInfo} from "@/api/module/ontology.js";
import { ElMessageBox, ElMessage, ElTimeSelect } from "element-plus";
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { createRel, DeleteProp, Ontolist, ontoprop, Relonto, subRel } from "../../api/module/ontology";


const ontoList = reactive([]); //本体源列表

import KGVisibleVisNetwork from "../../components/common/KGVisibleVisNetwork.vue";
const router = useRouter();



export default {
  components:{
        KGVisibleVisNetwork
    },
            data() {
                return {
                    tableData:  [],
                    tableData1:  [],
      name:"",
      sname:"",
      type:"",
      selectType:"",
      searchContent:"",
      rangeItem:[],
      multipleSelection: [],
      msg: "hello 竹子",
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      ontoType:"",
      dimension:"",
      lowerBound:"",
      upperBound:"",
      object:false,
      attribute:false,
      relation:false,
      objectrel:false,
      Id:"",
      AId:"",
      BId:"",
      neoId:"",
      SId:[],
      EId:[],
      ontoList1:[],
      ontoList2:[],
      OntoName:"",
      headerBg: 'headerBg',
      headerBg1:'headerBg',
      currentPage: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize: 10 // 每页的数据条数
                    ,
      currentPage1: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize1: 10 // 每页的数据条数

                    
                }
            },
            created() {
    // 请求分页查询数据
    this.load()
    this.load1()
    this.getParams();
  },



//方法
  methods: {
      handelReturn(){
          this.$refs.KGVisibleVisNetwork.handleReturn();
      },
    
 load() {
      listbasic({ type:"p"}).then(res => {
        this.tableData = res.data;
        this.total = res.total;
      })
       
    

    },
    load1() {
      Ontolist({name:""}).then(res=>{
        this.ontoList1 = [];
        for(let i = 0 ; i<res.data.length; i++){
          this.ontoList1.push(res.data[i]);
        }
        console.log(this.ontoList1);

        this.ontoList2 = [];
        for(let i = 0 ; i<res.data.length; i++){
          this.ontoList2.push(res.data[i]);
        }
        console.log(this.ontoList2);
        

      }

      )

    },
    Type(type){
      if(type=="val")
       this.selectType="1";
     if(type=="text")
       this.selectType="2";
    if(type=="date")
       this.selectType="3";
      if(type=="bool")
       this.selectType="4";
    
      console.log(this.selectType);
    },
    changeType(ontoType){
      if(ontoType=="object")
       this.object=true;
      else{
        this.object=false;
      } if(ontoType=="relation")
       this.relation=true;
      else{
        this.relation=false;
      }if(ontoType=="attribute")
       this.attribute=true;
      else{
        this.attribute=false;
      }
     
      

    },
                //每页条数改变时触发 选择一页显示多少行
                handleSizeChange(val) {
                  console.log(`每页 ${val} 条`);
                 this.currentPage = 1;
                  this.pageSize = val;
                  this.load()
                },
                //当前页改变时触发 跳转其他页
                handleCurrentChange(val) {
                  console.log(`当前页: ${val}`);
                  this.currentPage = val;
                   this.load()
                },

                   //每页条数改变时触发 选择一页显示多少行
                   handleSizeChange1(val) {
                  console.log(`每页 ${val} 条`);
                 this.currentPage1 = 1;
                  this.pageSize1 = val;
                  
                },
                //当前页改变时触发 跳转其他页
                handleCurrentChange1(val) {
                  console.log(`当前页: ${val}`);
                  this.currentPage1 = val;
                  
                },

                handleSelectionChange(val) {
                    console.log(val)
                   this.multipleSelection = val
            },
            Attcreate(){
            ontoprop({type:this.selectType,name:this.name,dimension:this.dimension,lowerBound:this.lowerBound,upperBound:this.upperBound}).then(({ data })=>{
              ElMessage.success("构建成功");
              this.$router.go(0);
            });
            },
            Recreate(){
             createRel({from:this.AId,to:this.BId,name:this.name}).then(({ data })=>{
              
           
            });

            Relonto({startList:[this.AId],endList:[this.BId],name:this.name,strategy:"NAME_CONSTRAINT",scope:"INST_RELATION"}).then(({ data })=>{
              
              this.$router.push("OntoWatch");
            });
            // subRel({from:this.AId,to:this.BId,name:this.name,seriesName:this.sname}).then(({ data })=>{
              
            //   this.$router.push("OntoWatch");
            // });
            
            },
            EditProp(neoId){
              this.neoId = neoId;
              DeleteProp({neoId:this.neoId}).then(res=>{

              })
              listbasic({ type:"p"}).then(res => {
        this.tableData = res.data;
         this.total = res.total;
      })
              
            },
            
            create() {
              console.log(this.neoId);
      let name = ref("");
      let propsClzs = this.multipleSelection.map((v) => v.code);
      ElMessageBox.confirm("确定创建该本体吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "创建确认",
      }).then(() => {

        
        
        createOnto({ propsClzs, name: this.name }).then(({ data }) => {
          console.log(data);
        console.log(this.neoId);
          Relonto({startList:[this.neoId],endList:[data.neoId],name:"管辖",strategy:"NAME_CONSTRAINT",scope:"INST_RELATION"}).then(({ data })=>{
              
         
            });
            subRel({from:this.neoId,to:data.neoId,name:"管辖",seriesName:this.sname}).then(({ data })=>{
              
            
            });
          ElMessage.success("构建成功");
          this.$router.push({
            path: "/Ontology-result",
            query: { neoId: data.neoId },
          });
        });
      });    
},
    OntoView(){
      this.$router.push("OntoView");
    },
    OntoAdd(){
      this.$router.push("OntoAdd");
    },
    OntoWatch(){
      this.$router.push("OntoWatch");
    },

searchInst(){
  Ontolist({name:this.searchContent}).then(res=>{

this.tableData1=res.data;
this.total=res.total;
})

},
getParams() {
      this.sname = this.$route.query.sname;
      this.neoId = this.$route.query.neoId;
    },
            
                 
          
                
        },
    watch: {
        $route(to, from) {
            if (to.fullPath.indexOf("OntoAdd") !== -1) {
                console.log("InstanceWatch==>to.query",to.query);
                this.neoId = to.query.neoId;
                this.sname = to.query.sname;
                this.$refs.KGVisibleVisNetwork.getParams(this.neoId,this.sname,2);
            }
        },
    },
      }
    
</script>
<script setup>

</script>

<style lang="less" scoped>
@import url("../../assets/css/global.less");

</style>
