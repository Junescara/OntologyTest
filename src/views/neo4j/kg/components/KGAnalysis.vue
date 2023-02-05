<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/2 1:33
 * @description： 知识图谱分析组件
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%">
          <el-descriptions column="1" title="历史场景">
            <template slot="extra">
              <el-button type="primary" size="small" @click="toKGHistoryCase">查看详情</el-button>
            </template>
            <el-descriptions-item label="所属分类">图探索</el-descriptions-item>
            <el-descriptions-item label="用途">这是一段描述这是一段描述这是一段描述</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
<!--      <el-col :span="8">
        <el-card class="box-card" style="width: 100%">
          <el-descriptions column="1" title="滑动窗口">
            <template slot="extra">
              <el-button type="primary" size="small" @click="toKGPattern">查看详情</el-button>
            </template>
            <el-descriptions-item label="所属分类">图探索</el-descriptions-item>
            <el-descriptions-item label="用途">这是一段描述这是一段描述这是一段描述</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>-->
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%">
          <el-descriptions column="1" title="流域拓扑">
            <template slot="extra">
              <el-button type="primary" size="small" @click="toKGRiverSectionTopo">查看详情</el-button>
            </template>
            <el-descriptions-item label="所属分类">关联分析</el-descriptions-item>
            <el-descriptions-item label="用途">这是一段描述这是一段描述这是一段描述</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'KGAnalysis',
  data() {
    return {}
  },
  methods: {
    toKGHistoryCase() {
      this.$router.push('KGHistoryCase')
    },
    toKGPattern() {
      this.$router.push('KGPattern')
    },
    toKGRiverSectionTopo() {
      this.$router.push('KGRiverSectionTopo')
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
  width: 480px;
}
</style>
