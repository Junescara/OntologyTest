<template>
  <div style="display: flex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>知识库管理</span>
      </div>
      <div>
        <el-radio-group>
          <el-radio-button label="实体类型"/>
          <el-radio-button label="关系类型"/>
        </el-radio-group>
        <div style="margin-top: 15px;">
          <el-input placeholder="请搜索" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
        <el-empty description="描述文字"/>
      </div>
    </el-card>
    <el-card class="box-card-2">
      <KGVisible></KGVisible>
    </el-card>
  </div>
</template>

<script>
import KGVisible from "./KGVisible";
export default {
  name: 'KGOntoManagement',
  components: {KGVisible}
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
  height: 700px;
  margin-top: 20px;
  margin-left: 20px;
}

.box-card-2 {
  width: 900px;
  height: 700px;
  margin-top: 20px;
  margin-left: 20px;
  background-color: lightgray;
}
</style>
