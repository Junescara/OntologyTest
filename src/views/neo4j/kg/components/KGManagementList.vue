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
      <el-button type="primary" plain style="margin-bottom: 20px;margin-left: 10px" @click="handleAdd">新增图谱</el-button>
    </el-row>
    <el-row style="margin-bottom: 20px;margin-left: 10px">
      <el-col v-for="(item, index) in list.connectList" :span="4" :key="index" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="require('@/assets/images/sanxia.jpg')" class="image">
          <div style="padding: 14px;">
            <span>{{item.dbCName}}</span>
            <div class="bottom clearfix">
              <p class="time">{{item.dbNote}}</p>
              <el-button type="warning" plain class="button" @click="handleUpdate" size="mini">编辑详情</el-button>
              <el-button type="success" plain class="button" @click="childClick(item.dbId)" size="mini">查看图谱</el-button>
              <el-button type="warning" plain class="button" @click="handleDelete(item.dbId)" size="mini">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :title="flags.updateFlag ? '编辑' : '新增'"
      :visible.sync="visibles.addOrUpdateVisible"
      width="50%">
      <el-form ref="form" :model="dataInfo" label-width="80px" v-show="flags.updateFlag == false">
        <el-form-item label="图谱库id" label-width="150px">
          <el-input v-model="dataInfo.dbId"></el-input>
        </el-form-item>
        <el-form-item label="图谱库名称" label-width="150px">
          <el-input v-model="dataInfo.dbName"></el-input>
        </el-form-item>
        <el-form-item label="图谱库中文名称" label-width="150px">
          <el-input v-model="dataInfo.dbCName"></el-input>
        </el-form-item>
        <el-form-item label="图谱库描述" label-width="150px">
          <el-input v-model="dataInfo.dbNote"></el-input>
        </el-form-item>
        <el-form-item label="联系人id" label-width="150px">
          <el-input v-model="dataInfo.contactId"></el-input>
        </el-form-item>
        <el-form-item label="图谱ip地址" label-width="150px">
          <el-input v-model="dataInfo.ipAddr"></el-input>
        </el-form-item>
        <el-form-item label="图谱端口" label-width="150px">
          <el-input v-model="dataInfo.srcPort"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="150px">
          <el-input v-model="dataInfo.srcUser"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="150px">
          <el-input v-model="dataInfo.srcPsw"></el-input>
        </el-form-item>
      </el-form>
      <span v-show="flags.updateFlag == true">编辑选项</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="visibles.addOrUpdateVisible = false">取 消</el-button>
    <el-button type="primary" @click="fetchData">确 定</el-button>
  </span>
    </el-dialog>
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
        dialogVisible:false,
        addOrUpdateVisible:false
      },
      flags:{
        updateFlag:false
      },
      list:{
        connectList:[]
      },
      dataInfo:{
        dbId:10000,
        dbName:'',
        dbCName:'',
        dbNote:'',
        entityNum:'',
        contactId:'',
        ipAddr:'',
        srcPort:'',
        srcUser:'',
        srcPsw:'',
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
        console.log("this.list.connectList=======",this.list.connectList)
      })
    },
    handleAdd(){
      this.flags.updateFlag = false
      this.visibles.addOrUpdateVisible = true
    },
    handleUpdate(){
      this.flags.updateFlag = true
      this.visibles.addOrUpdateVisible = true
    },
    fetchData(){
      if (!this.flags.updateFlag){
        KGConnectApi.addConnection(this.dataInfo).then(({data}) => {
          if (data.code == 200){
            this.$message.success(data.data)
          }else {
            this.$message.error(data.data)
          }
          this.visibles.addOrUpdateVisible = false
          this.init()
        })
      }
    },
    handleDelete(dbId){
      const params = {
        dbId
      }
      KGConnectApi.fetchDelete(params).then(({data}) => {
        if (data.code == 200){
          this.$message.success(data.data)
        }else {
          this.$message.error(data.data)
        }
        this.init()
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
  float: right;
  margin: 5px 5px;
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
