<template  >
 <div class="top-content">
    <h5>本体查询</h5>
  </div>
 
<br>

<el-form label-width="120px" inline align="left"><el-form-item>
        <el-input align="left"
          placeholder="请输入实例名"
          clearable
          v-model="searchContent"
          width="auto"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="searchInst"
          >搜索</el-button
        >
      </el-form-item></el-form>

<el-table :data="tableData1.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)" style="width: auto" border stripe :header-cell-class-name="headerBg1"  >
    <el-table-column prop="name" label="本体名称" width="auto" align="left" />
    <el-table-column  prop="labels" label="标签" width="auto" align="left">
    </el-table-column>
    <el-table-column  prop="neoId" label="编号" width="auto" align="left"></el-table-column>
    <el-table-column label="操作" width="180">
        <template #default="scope">
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
 


<br><br><br>
<div class="top-content">
    <h5>构建本体</h5>
  </div>
<div style="width: 200px;height: 100px;">
    
    <el-form-item label="本体名称">
      <el-input  v-model="insName" placeholder="请输入本体名" clearable >
      </el-input>
    </el-form-item>
 </div>
<div align="left">请选择此本体应有的属性：</div>
 <div align-items: center>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: auto" border stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="auto" align="left" />
    <el-table-column  prop="code" label="属性编号" width="auto" align="left">
    </el-table-column>
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
 <el-row class="mb-6" justify="end">
    <el-button type="success" @click="create" >提交</el-button>
  </el-row>
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
                  this.load1()
                },
                //当前页改变时触发 跳转其他页
                handleCurrentChange1(val) {
                  console.log(`当前页: ${val}`);
                  this.currentPage1 = val;
                   this.load1()
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
