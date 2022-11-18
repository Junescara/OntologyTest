<template>
  <div>
    <h1>此页面为选择页面</h1>
    <el-steps :active="1" align-center>
      <el-step title="步骤1" description="选择出口断面和预报范围"></el-step>
      <el-step title="步骤2" description="对象关系拓扑展示"></el-step>
      <el-step title="步骤3" description="完成数据提取"></el-step>
    </el-steps>

    <el-form ref="form" label-width="80px" class="form" style="margin-top: 30px">
      <el-form-item label="出口断面">
        <el-input
          placeholder="请输入出口断面"
          v-model="outletSection"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="预报范围">
        <el-input
          placeholder="请输入预报范围"
          v-model="forecastRange"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toShow" align="center">生成拓扑</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
export default {
  name: "choose",
  data() {
    return {
      //存放输入框内的出口断面
      outletSection: '屯溪',
      //存放输入框内的预报范围
      forecastRange: '横江流域'
    }
  },
  created() {

  },
  methods: {
    toShow() {
      this.$router.push({
        path: '/workflow/show/',
        query: {
          outlet: this.outletSection,
          inRegion: this.forecastRange
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
