<template>
 
 <div style="width: 200px;height: 100px;">
    请输入您要添加的本体名称：<el-input placeholder="请输入"></el-input><br><br>
      请选择此本体应有的属性：<el-input placeholder="请输入"></el-input>
 </div>
<br>
 
 <div align-items: center>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" >
    <el-table-column type="selection" width="300" align="left" />
    <el-table-column  prop="attribute" label="属性名" width="300" align="left">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 0px">{{ scope.row.attribute }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="rule" label="属性规范" width="500" align="left">
      <template #default="scope" >
        <el-popover effect="light" trigger="hover" placement="top" width="auto" align="center">
          <template #default >
            <div align-items: center>rule: {{ scope.row.rule }}</div>
          </template>
          <template #reference >
            <el-tag align-items: center>{{ scope.row.rule }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
   
  </el-table>
  <el-pagination align='center' 
   @size-change="handleSizeChange" 
   @current-change="handleCurrentChange"
   :current-page="currentPage" 
   :page-sizes="[1,5,10,20]" 
   :page-size="pageSize" 
   layout="total, sizes, prev, pager, next, jumper" 
   :total="tableData.length">
</el-pagination>
 </div>

<br>
 <el-row class="mb-6" justify="end">
    <el-button type="success" >提交</el-button>
  </el-row>
</template>


<script>
import {createOnto} from "@/api/module/ontology.js"
import { listbasic } from "../../api/module/ontology";

export default {
            data() {
                return {
                    tableData: [
                        {
                          attribute: '经度',
    rule: '类型：Float 范围：-180~180',
    
  },
  {
    attribute: '维度',
    rule: '类型：Float 范围：-90~90',
    
  },
  {
    attribute: '名称',
    rule: '类型：String 长度：0~255',
    
  },
  {
    attribute: '水利对象编码',
    rule: '类型：String 长度：0~255',
                        },
                    ],
                    currentPage: 1, // 当前页码
                    total: 20, // 总条数
                    pageSize: 2 // 每页的数据条数
                };
            },
            methods: {
                //每页条数改变时触发 选择一页显示多少行
                handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                    this.currentPage = 1;
                    this.pageSize = val;
                },
                //当前页改变时触发 跳转其他页
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.currentPage = val;
                }
            }
        };
</script>

<style lang="scss" scoped></style>
