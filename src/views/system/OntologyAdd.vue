<template>


   
  

   <span>
    <div>
     <el-form label-width="200px" inline label-position="left"  align="left">
        <el-form-item >
      <el-input  v-model="insName" placeholder="请输入本体名" clearable >
      </el-input>
    </el-form-item>
    <el-form-item>
       
    <el-button type="success" @click="create" >提交</el-button>

    </el-form-item>
    <el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item>
      <el-form-item left-padding="300px">
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

<div align="left">请选择此本体应有的属性：</div>
 <div align-items: center>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: auto" border stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="auto" align="left" /> 
    <el-table-column  prop="name" label="属性名" width="auto" align="left"></el-table-column>
    <el-table-column  prop="rangeItem.range1,rangeItem.range2" width="auto" align="left" label="范围" >
<template #default="scope" >
<div v-if="scope.row.rangeItem"><el-tag size="medium">{{ scope.row.rangeItem.range1 }}~{{ scope.row.rangeItem.range2 }}</el-tag></div>
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

<br>

</template>


<script >
import {createOnto} from "@/api/module/ontology.js";
import { listbasic } from "@/api/module/ontology.js";
import {loadOntoInfo} from "@/api/module/ontology.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Ontolist } from "../../api/module/ontology";

const router = useRouter();



export default {
            data() {
                return {
                    tableData:  [],
                    tableData1:  [],
      insName:"",
      searchContent:"",
      rangeItem:[],
      multipleSelection: [],
      msg: "hello 竹子",
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg',
      headerBg1:'headerBg',
      currentPage: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize: 2 // 每页的数据条数
                    ,
      currentPage1: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize1: 2 // 每页的数据条数

                    
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
        this.tableData = res.data;
        this.total = res.total;
      })
       
    

    },
    load1() {
      Ontolist({name:""}).then(res=>{

        this.tableData1=res.data;
        this.total=res.total;
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
