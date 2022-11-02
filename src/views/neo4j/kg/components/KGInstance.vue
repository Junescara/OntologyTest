<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/2 12:53
 * @description：图谱实例详情组件
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <el-row style="margin-bottom: 20px;margin-left: 20px">
      <el-button type="danger" @click="goBack">返回</el-button>
    </el-row>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-image
            style="width: 200px; height: 150px"
            :src="url"
            :fit="'contain'"></el-image>
        </el-col>
        <el-col :span="6">
          <el-descriptions title="图谱信息" :column="2">
            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
    </el-card>
    <div style="display: flex">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>知识库管理</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div>
          <el-radio-group>
            <el-radio-button label="实体"></el-radio-button>
            <el-radio-button label="关系"></el-radio-button>
          </el-radio-group>
          <el-select v-model="value" placeholder="请选择实体类型" style="margin-top: 20px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-empty description="描述文字"></el-empty>
        </div>
      </el-card>
      <el-card class="box-card-2">
        <div slot="header" class="clearfix">
          <span>知识图谱</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <el-empty description="描述文字"></el-empty>
      </el-card>
      <el-card class="box-card" style="width: 400px">
        <div slot="header" class="clearfix">
          <span>实体类信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <el-descriptions :column="1">
          <el-descriptions-item label="实体所属类型">
            <el-tag size="small">水库</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="更新时间">2022.11.2</el-descriptions-item>
        </el-descriptions>
        <el-divider></el-divider>
        <span>实体属性</span>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="60">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "KGInstance",
  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      options: [{
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
      }],
      value: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    goBack(){
      const data = true
      this.$emit('goBack',data)
    }
  },
  mounted() {
    console.log("instance挂载了")
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

。clearfix {
  background-color: #4AB7BD;
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
  height: 500px;
  margin-top: 20px;
  margin-left: 20px;
}

.box-card-2 {
  width: 750px;
  height: 500px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
