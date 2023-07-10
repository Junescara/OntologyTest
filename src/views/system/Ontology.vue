<template>
  <div>ontology</div>
 <div style="width: 200px;height: 100px;">
    请输入您要添加的本体名称：<el-input placeholder="请输入"></el-input><br><br>
      请选择此本体应有的属性：<el-input placeholder="请输入"></el-input>
 </div>
<br>
 
 <div align-items: center>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="属性名" width="300" align="center">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.attribute }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="属性规范" width="300" align="center">
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
    <el-table-column label="操作" width="450" align="center">
      <template #default="scope" >
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >添加</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
 </div>
<br>
 <el-row class="mb-6" justify="end">
    <el-button type="success" >提交</el-button>
  </el-row>
</template>


<script setup></script>
<script lang="ts" setup>
import { ref } from 'vue'
import { Timer } from '@element-plus/icons-vue'

const input = ref('')
interface User {
  attribute: string
  rule: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
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
]
</script>

<style lang="scss" scoped></style>
