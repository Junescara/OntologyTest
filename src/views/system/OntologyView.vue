<template >
    <span>
    <div v-show="!DeleteFlag">
     <el-form label-width="200px" inline label-position="left"  align="left">
        <el-form-item>
            <el-select
          v-model="ontoType"
          placeholder="请选择本体类型"
          clearable
          filterable
        >
          
        </el-select> 
        </el-form-item>
      <el-form-item>
           <el-input align="left"
             placeholder="请输入本体名"
             clearable
             v-model="searchContent"
             width="auto"
           />
         </el-form-item>
         <el-form-item>
           <el-button type="primary" :icon="Search" @click="searchInst"
             >搜索</el-button
           >
         </el-form-item>
        <el-form-item ></el-form-item> <el-form-item ></el-form-item><el-form-item ></el-form-item><el-form-item ></el-form-item>
         
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

    
   <el-divider></el-divider>
   <br>
   
<div v-show="!DeleteFlag">
   <el-table :data="tableData1.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)" style="width: auto" border stripe :header-cell-class-name="headerBg1"  >
       <el-table-column prop="name" label="本体名称" width="auto" align="left" />
       <el-table-column  prop="labels" label="本体类型" width="auto" align="left">
       </el-table-column>
       <el-table-column  prop="time" label="创建时间" width="auto" align="left"></el-table-column>
       <el-table-column  prop="creater" label="创建人" width="auto" align="left"></el-table-column>\
       <el-table-column  prop="number" label="属性数量" width="auto" align="left"></el-table-column>
       <el-table-column label="节点操作" width="180">
           <template v-slot="scope">
          
             <el-button
               link
               type="primary"
               size="small"
               @click="
                 this.$router.push({
                   path: 'ontology-result',
                   query: { neoId: scope.row.neoId },
                 })
               "
               >查看结点</el-button
             >
             <el-button
               link
               type="danger"
               size="small"
               @click="DeleteObject(scope.row.neoId)"
               >删除实体</el-button
             >
            
           </template>
           
             
          
         </el-table-column>

         <el-table-column label="属性操作" width="180">
           <template v-slot="scope">
          
         <el-button
               link
               type="success"
               size="small"
               @click="Add(scope.row.neoId)"
               >新增属性</el-button
             >
             <el-button
               link
               type="danger"
               size="small"
               @click="Delete(scope.row.neoId)"
               >删除属性</el-button
             >
            
            
           </template>
           
             
          
         </el-table-column>

    
      
     </el-table>
    
     <el-pagination align='center' 
     @size-change="handleSizeChange1"
                 @current-change="handleCurrentChange1"
                 :current-page="pageNum"
                 :page-sizes="[2, 5, 10, 20]"
                 :page-size="pageSize1"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="tableData1.length">
   </el-pagination>
</div>
   


   <div v-show="DeleteFlag" >
   
    <el-table :data="tableData2.slice((currentPage2-1)*pageSize2,currentPage2*pageSize2)" style="width: auto" border stripe :header-cell-class-name="headerBg2">
      <el-table-column prop="name" label="属性名称" width="auto" align="left">
      </el-table-column>
      <el-table-column  prop="owerBound,upperBound" width="auto" align="left" label="范围" >
<template #default="scope" >
<div v-if="scope.row"><el-tag size="medium">{{ scope.row.lowerBound }}~{{ scope.row.upperBound }}</el-tag></div>
</template>
</el-table-column>
      <el-table-column prop="dimension" label="单位" width="auto" align="left">
      </el-table-column>
      <el-table-column label="属性操作" width="180">
           <template v-slot="scope">
    
             <el-button
               link
               type="danger"
               size="small"
               @click="Deleteprop(scope.row.neoId)"
               >删除属性</el-button
             >
            
            
           </template>
           
             
          
         </el-table-column>

    </el-table>

    <el-pagination align='center' 
     @size-change="handleSizeChange2"
                 @current-change="handleCurrentChange2"
                 :current-page="pageNum"
                 :page-sizes="[2, 5, 10, 20]"
                 :page-size="pageSize2"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="tableData2.length">
   </el-pagination>
   </div>
   </template>

   
<script >
import {createOnto} from "@/api/module/ontology.js";
import { listbasic } from "@/api/module/ontology.js";
import {loadOntoInfo} from "@/api/module/ontology.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { AddProp, DeleteOnto, DeleteOntoProp, Ontolist } from "../../api/module/ontology";


const router = useRouter();



export default {
            data() {
                return {
                    tableData:  [],
                    tableData1:  [],
                    tableData2: [],
      insName:"",
      searchContent:"",
      rangeItem:[],
      neoId:"",
      AddFlag:false,
      DeleteFlag:false,
      time:"2023-1-1",
      creater:"竹子",
      tableColumn:[],
      ontoType:["水利对象本体","流域本体"],
      multipleSelection: [],
      msg: "hello 竹子",
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg',
      headerBg1:'headerBg',
      headerBg2:'headerBg',
      currentPage: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize: 10 // 每页的数据条数
                    ,
      currentPage1: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize1: 10 // 每页的数据条数
,
currentPage2: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize2: 10 // 每页的数据条数

                    
                }
            },
            created() {
    // 请求分页查询数据
    this.load()
    this.load1()
 
    
    
  },



//方法
  methods: {
    
 load() {
      listbasic({ type:"p"}).then(res => {
        this.tableData.time="2023-1-1";
        this.tableData = res.data;
        this.total = res.total;
      })
       
    

    },
    load1() {
      Ontolist({name:""}).then(res=>{

        this.tableData1=res.data;
        this.total=res.total;
        console.log(this.tableData1);
      }

      )

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
                  
                }, //每页条数改变时触发 选择一页显示多少行
                   handleSizeChange2(val) {
                  console.log(`每页 ${val} 条`);
                 this.currentPage1 = 1;
                  this.pageSize1 = val;
                  this.Delete(this.neoId);
                },
                //当前页改变时触发 跳转其他页
                handleCurrentChange2(val) {
                  console.log(`当前页: ${val}`);
                  this.currentPage1 = val;
                  this.Delete(this.neoId);
                },

                handleSelectionChange(val) {
                    console.log(val)
                   this.multipleSelection = val
            },
            
            create() {
      let insName = ref("");
      let propsClzs = this.multipleSelection.map((v) => v.code);
      ElMessageBox.confirm("确定创建该本体吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "创建确认",
      }).then(() => {
        createOnto({ propsClzs, name: this.insName }).then(({ data }) => {
          // console.log(data);
          ElMessage.success("构建成功");
          this.$router.push({
            path: "/Ontology-result",
            query: { neoId: data.neoId },
          });
        });
      });
},
Add(neoId){
this.neoId=neoId;
},
Delete(neoId){
  this.neoId=neoId;
  this.DeleteFlag=true;

  loadOntoInfo(this.neoId).then(res => {
    console.log(res.data);
    console.log(res.data.propClzList);

        this.tableData2=res.data.propClzList;
        console.log(this.tableData2);
      })

  

},
Deleteprop(neoId){
  this.neoId=neoId;
  ElMessageBox.confirm("确定删除该属性吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "删除确认",
      }).then(()=>{
         console.log(this.neoId);
     
        DeleteOntoProp({neoId:this.neoId}).then(({ data }) => {
          // console.log(data);
          this.DeleteFlag = fasle;
          
        });
        
      });
      
      
},
DeleteObject(neoId){
  this.neoId=neoId;
  ElMessageBox.confirm("确定删除该本体吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "删除确认",
      }).then(()=>{
         console.log(this.neoId);
         console.log(this.tableData1);
        DeleteOnto({neoId:this.neoId}).then(({ data }) => {
          // console.log(data);
          this.load1();
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
            
                 
          
                
        }
      }
    
</script>
<script setup>

</script>

<style lang="less" scoped>
@import url("../../assets/css/global.less");

</style>
