<template>
  <div>
    <h1>此页面为完成数据提取页面</h1>
    <el-steps :active="3" align-center>
      <el-step title="步骤1" description="选择出口断面和预报范围"></el-step>
      <el-step title="步骤2" description="对象关系拓扑展示"></el-step>
      <el-step title="步骤3" description="完成数据提取"></el-step>
    </el-steps>

    <el-form ref="form" label-width="80px" class="form">
      <el-form-item>
        <div>您最终生成的拓扑图为</div>
        <div>
          <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
          <div id="network_id" class="network" style="height:80vh"></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="finish">结束</el-button>
      </el-form-item>
    </el-form>

  </div>


</template>

<script>
export default {
  name: "finish",
  data() {
    return {
      //保存拓扑图信息
      data: {}
    }
  },
  created() {
    this.getParams()
  },
  methods: {
    //获取生成拓扑步骤中的拓扑图
    getParams() {
      this.data = this.$route.query.data
    },
    finish() {
      this.$router.push({ path: '/workflow/choose'})
    }
  }
}
</script>

<style scoped>

</style>
