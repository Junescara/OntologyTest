<template>
  <div class="top-content">
    <h5>构建实例</h5>
  </div>
  <div class="main-content">
    <el-form :model="attrForm" label-width="120px">
      <el-form-item label="实例本体源">
        <el-select
          v-model="ontoId"
          placeholder="请选择实例所属本体源"
          @change="handleSelChange"
          clearable
        >
          <el-option
            v-for="(item, index) in ontoList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <!-- 属性输入框 -->
      <el-form-item
        v-for="(item, index) in attrForm"
        :label="`请输入${item.name}`"
      >
        <el-input
          v-model="attrForm[index].value"
          :placeholder="`请输入${item.name}`"
          clearable
        />
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="success" @click="handleInsCreate">创建实例</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { createIns } from "@/api/module/instance.js";
// import { queryOntolist } from "@/api/module/ontology.js";
import { reactive, ref } from "vue";
const ontoId = ref("");
const attrForm = reactive([]);
const ontoList = reactive([]);
for (let i = 0; i < 10; i++) {
  attrForm.push({ name: "属性" + i, value: "" });
}
// 获取本体列表
// 本体选择改变
const handleSelChange = () => {};
// 处理提交
const handleInsCreate = () => {};
</script>

<style lang="less" scoped>
@import url("../../assets/css/global.less");
@length: 130px;
.main-content {
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow: hidden;
  .el-form {
    width: 30%;
    .el-button {
      margin-left: @length;
    }
  }
}
</style>
