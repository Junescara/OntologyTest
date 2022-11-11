<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/2 13:10
 * @description：ToDo
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <el-row>
      <el-col v-for="(o, index) in 4" :span="4" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="require('@/assets/images/sanxia.jpg')" class="image">
          <div style="padding: 14px;">
            <span>水利知识图谱</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button" @click="childClick">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="(o, index) in 4" :span="4" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="require('@/assets/images/sanxia.jpg')" class="image">
          <div style="padding: 14px;">
            <span>水利知识图谱</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button" @click="childClick">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'KGManagementList',
  data() {
    return {
      currentDate: new Date()
    }
  },
  methods: {
    childClick() {
      const data = 1
      // this.$emit('toDetails',data)
      this.$router.push('KGInstance')
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
