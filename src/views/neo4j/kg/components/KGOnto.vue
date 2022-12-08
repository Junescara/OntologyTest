<template>
  <div>
    <el-row style="padding: 15px">
      <el-col v-for="(o, index) in 1" :span="4" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>流域对象关系本体</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="toOntoManagement">本体管理</el-button>
          </div>
          <!--以下为知识库描述信息-->
          <div class="text item">
            建设水资源知识实体与关系对象，建设水资源知识实体与关系对象，建设水资源知识实体与关系对象。
          </div>
          <!--以下为数量信息-->
          <el-descriptions style="width: 140%">
            <el-descriptions-item label="实体类型数量">6</el-descriptions-item>
            <el-descriptions-item label="关系类型数量">4</el-descriptions-item>
          </el-descriptions>
          <div>
            <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
            <div style="display: inline-block" class="text item">2022-11-2 12:00:00</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
<!--    <el-row style="padding: 15px">
      <el-col v-for="(o, index) in 4" :span="4" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>水资源知识库</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="toOntoManagement">知识库管理</el-button>
          </div>
          &lt;!&ndash;以下为知识库描述信息&ndash;&gt;
          <div class="text item">
            建设水资源知识实体与关系对象，建设水资源知识实体与关系对象，建设水资源知识实体与关系对象。
          </div>
          &lt;!&ndash;以下为数量信息&ndash;&gt;
          <el-descriptions style="width: 140%">
            <el-descriptions-item label="实体类型数量">6</el-descriptions-item>
            <el-descriptions-item label="关系类型数量">4</el-descriptions-item>
          </el-descriptions>
          <div>
            <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
            <div style="display: inline-block" class="text item">2022-11-2 12:00:00</div>
          </div>
        </el-card>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
export default {
  name: 'KGOnto',
  data() {
    return {}
  },
  methods: {
    toOntoManagement() {
      this.$router.push('KgOntoMananement')
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
  width: 135%;
}
</style>
