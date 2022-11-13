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
      <el-button type="primary" plain style="margin-bottom: 20px;margin-left: 10px" @click="visibles.dialogVisible = true">文件上传</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;margin-left: 10px">
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
    <el-row style="margin-bottom: 20px;margin-left: 10px">
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

    <el-dialog
      title="上传文件"
      :visible.sync="visibles.dialogVisible"
      width="50%">
      <KGUploadFile></KGUploadFile>
      <span slot="footer" class="dialog-footer">
    <el-button @click="visibles.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="visibles.dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import KGUploadFile from "./KGUploadFile";
export default {
  name: 'KGManagementList',
  components: {KGUploadFile},
  data() {
    return {
      currentDate: new Date(),
      visibles:{
        dialogVisible:false
      }
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
