<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/2 0:38
 * @description：知识图谱实例页面
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="知识库" name="first">
        <KGOnto></KGOnto>
      </el-tab-pane>
      <el-tab-pane label="图谱管理" name="second">
        <KGManagement></KGManagement>
      </el-tab-pane>
      <el-tab-pane label="知识分析" name="third">
        <KGAnalysis></KGAnalysis>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import KGOnto from './components/KGOnto'
import KGManagement from './components/KGManagement'
import KGAnalysis from './components/KGAnalysis'

export default {
  name: 'Index',
  components: {
    KGOnto,
    KGManagement,
    KGAnalysis,
  },
  data() {
    return {
      activeName: 'second'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>

</style>
