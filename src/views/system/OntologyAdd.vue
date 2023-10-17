<template>





   <span>
    <div >
     <el-form inline label-position="left"  align="left">
      <el-form-item>
        <el-text>本体类型选择：</el-text>
      </el-form-item>
      <el-form-item >
            <el-select
          v-model="ontoType"
          @change="changeType($event,ontoType)"
          placeholder="请选择添加的类型"
          clearable
          filterable
        >
        <el-option label="对象本体" value="object" selected></el-option>
      <el-option label="属性本体" value="attribute"></el-option>
      <el-option label="关系本体" value="objectrel"></el-option>
      <el-option label="本体间的关系" value="relation"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item >
      <el-input  v-model="name" placeholder="请输入本体名" clearable >
      </el-input>
    </el-form-item>
    <el-form-item>
       <!-- 提交按你 -->
    <el-button v-show="object"  type="success" @click="create" >提交</el-button>
    <el-button v-show="attribute"  type="success" @click="Attcreate" >提交</el-button>
    <el-button v-show="relation"  type="success" @click="Recreate" >提交</el-button>
    <el-button v-show="objectrel"  type="success" @click="ObjectRel" >提交</el-button>
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
<el-table-column label="操作" width="180">
           <template #default="scope">
             <el-button
               link
               type="danger"
               size="small"
               @click="DeleteObject($event,scope.row.neoId)"
               >删除</el-button
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
<el-divider></el-divider>
  </el-form>
  <div style="display: flex;overflow:auto" >
            <KGVisibleVisNetwork  :kgType = "1">
            </KGVisibleVisNetwork>
        </div>
</div>


<!-- 关系本体页面 -->
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
</el-form-item>

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
  </el-form>
  
  <el-divider></el-divider>
  <div align="left">现有关系：</div>
 <div align-items: center>
  <el-table :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: auto" border stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
    <el-table-column  prop="startList" label="开始本体" width="auto" align="left"></el-table-column>
    <el-table-column  prop="endList" label="结束本体" width="auto" align="left" ></el-table-column>
<el-table-column  prop="name" label="名称" width="auto" align="left"></el-table-column>
<el-table-column label="操作" width="180">
           <template #default="scope">
             <el-button
               link
               type="danger"
               size="small"
               @click="DeleteObject($event,scope.row.neoId)"
               >删除</el-button
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
              :total="tableData1.length">
</el-pagination>

 
</div>
</div>
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
import { createRel, Ontolist, ontoprop, queryRelList, Relonto } from "../../api/module/ontology";
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
      searchContent:"",
      rangeItem:[],
      multipleSelection: [],
      msg: "hello 竹子",
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      neoId:"",
      ontoType:"",
      dimension:"",
      lowerBound:"",
      upperBound:"",
      object:false,
      attribute:false,
      relation:false,
      objectrel:false,
      AId:"",
      BId:"",
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
    this.load3()
    
  },



//方法
  methods: {
    
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
    load3(){
      queryRelList({}).then(res=>{
        this.tableData1 = res.data;
        this.total1 = res.total1;
        

      }

      )
    },
    DeleteObject(){
  ElMessageBox.confirm("确定删除该本体吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "删除确认",
      }).then(()=>{
        DeleteOnto({neoId:this.neoId}).then(({ data }) => {
          // console.log(data);
          ElMessage.success("删除成功");
        });
      });

     
  
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
      if(ontoType=="objectrel"){
        this.objectrel=true;
      }else{
        this.objectrel=false;
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
            ontoprop({type:"1",name:this.name,dimension:this.dimension,lowerBound:this.lowerBound,upperBound:this.upperBound}).then(({ data })=>{
              ElMessage.success("构建成功");
              this.$router.go(0);
            });
            },
            Recreate(){
             createRel({from:this.AId,to:this.BId,name:this.name}).then(({ data })=>{
              ElMessage.success("构建成功");
              this.$router.push("OntoWatch");
            });
            },
            ObjectRel(){
               Relonto({startList:[this.SId],endList:[this.EId],name:this.name,strategy:"NAME_CONSTRAINT",scope:"INST_RELATION"}).then(({ data })=>{
              ElMessage.success("构建成功");
              this.$router.go(0);
            });
          },
            create() {
      let name = ref("");
      let propsClzs = this.multipleSelection.map((v) => v.code);
      ElMessageBox.confirm("确定创建该本体吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "创建确认",
      }).then(() => {
        createOnto({ propsClzs, name: this.name }).then(({ data }) => {
          // console.log(data);
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

   
                
        }
      }
    
</script>
<script setup>

</script>

<style lang="less" scoped>
@import url("../../assets/css/global.less");

</style>
