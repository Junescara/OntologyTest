<template slot-scope="scope">
 
 <div style="width: 200px;height: 100px;">
    请输入您要添加的本体名称：<el-input placeholder="请输入" v-model="iname" @input="changeNow($event)"></el-input><br><br>
      请选择此本体应有的属性：<el-input placeholder="请输入"></el-input>
 </div>
<br>
 
 <div align-items: center>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" border stripe :header-cell-class-name="headerBg"  @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="400" align="left" />
    <el-table-column  prop="code" label="属性编号" width="300" align="left">
    </el-table-column>
    <el-table-column  prop="name" label="属性名" width="400" align="left">
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
 <el-row class="mb-6" justify="end">
    <el-button type="success" @click="createOnto" >提交</el-button>
  </el-row>
</template>


<script>
import {createOnto} from "@/api/module/ontology.js";
import { listbasic } from "@/api/module/ontology.js";
import {loadOntoInfo} from "@/api/module/ontology.js";

export default {
            data() {
                return {
                    tableData:  [],

      multipleSelection: [],
      msg: "hello 竹子",
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg',
      currentPage: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize: 2 // 每页的数据条数
                    
                }
            },
            created() {
    // 请求分页查询数据
    this.load()
  },
            methods: {
              
changeNow() {
    this.$forceUpdate()
},
 load() {
      listbasic({ type:"p"})
      .then(res => {
        console.log(res)

        this.tableData = res.data
        this.total = res.total

      })
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

                handleSelectionChange(val) {
                    console.log(val)
                   this.multipleSelection = val
            },
                 createOnto(){
                  createOnto()

            },
          
                
        }
      }
    
</script>

<style lang="scss" scoped></style>
