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
      <el-button type="primary" plain style="margin-bottom: 20px;margin-left: 10px">新增图谱</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;margin-left: 10px">
      <el-col v-for="(item, index) in list.connectList" :span="4" :key="index" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="require('@/assets/images/sanxia.jpg')" class="image">
          <div style="padding: 14px;">
            <span>{{item.db_C_NAME}}</span>
            <div class="bottom clearfix">
              <p class="time">{{item.db_NOTE}}</p>
              <el-button type="text" class="button" @click="childClick(item.db_ID)">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import KGUploadFile from "./KGUploadFile";
import KGConnectApi from "../../../../api/neo4j/KGConnectApi";
export default {
  name: 'KGManagementList',
  components: {KGUploadFile},
  data() {
    return {
      currentDate: new Date(),
      visibles:{
        dialogVisible:false
      },
      list:{
        connectList:[]
      }
    }
  },
  methods: {
    childClick(instanceId) {
      const data = 1
      // this.$emit('toDetails',data)
      this.$router.push({name:'KGInstance',params:{id:instanceId}})
    },
    init(){
      this.listConnectors()
    },
    listConnectors(){
      KGConnectApi.getConnects().then(({data}) => {
        this.list.connectList = data.data
      })
    }
  },
  mounted() {
    this.init()
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
