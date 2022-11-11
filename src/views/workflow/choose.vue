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
        <el-select v-model="valueSection" clearable filterable placeholder="请选择出口断面">
          <el-option
            v-for="item in section"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预报范围">
        <el-select v-model="valueRange" clearable filterable placeholder="请选择预报范围">
          <el-option
            v-for="item in range"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      section: [
        {
        value: '选项1',
        label: '呈村测站'
        },
        {
        value: '选项2',
        label: '叶力水库'
        },
        {
        value: '选项3',
        label: '溪口水库'
        },
        {
        value: '选项4',
        label: '月潭测站'
        }
      ],
      range: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      valueSection: '',
      valueRange: ''
    }
  },
  created() {

  },
  methods: {
    toShow() {
      this.$router.push({ path: '/workflow/show/'})
    }
  }
}
</script>

<style scoped>

</style>
