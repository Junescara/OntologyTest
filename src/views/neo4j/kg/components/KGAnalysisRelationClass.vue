<template>
  <div style="display: flex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>关联对象查询</span>
      </div>
      <div>
        <div style="margin-top: 15px;">
          <div class="block">
            <span class="demonstration"/>
            <el-select v-model="value" placeholder="选择水利对象">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <div style="margin-top: 15px;">
              <el-button icon="el-icon-delete">清空</el-button>
              <el-button type="primary" icon="el-icon-data-analysis">分析</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card-2">
      <el-empty description="这一块用来展示查出来的节点和关系"/>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'KGAnalysisRelationClass',
  data() {
    return {
      options: [{
        value: '选项1',
        label: '屯西流域'
      }, {
        value: '选项2',
        label: 'XX流域'
      }],
      value: ''
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
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
