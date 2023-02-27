<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/2/13 20:39
 * @description：ToDo
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>

    <div style="padding: 30px 30px">
      <el-row style="margin-bottom: 20px;margin-left: 10px">
        <el-col v-for="(item, index) in list.connectShowList.firstLine" :span="4" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{item.dbCName}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="childClick(item.dbId,item.dbCName)">本体管理</el-button>
            </div>
            <!--以下为知识库描述信息-->
            <div class="text item">
              {{item.dbNote}}
            </div>
            <!--以下为数量信息-->
            <el-descriptions style="width: 140%">
              <el-descriptions-item label="实体类型数量">{{item.conceptNum}}</el-descriptions-item>
              <el-descriptions-item label="关系类型数量">{{item.relationNum}}</el-descriptions-item>
            </el-descriptions>
            <div>
              <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
              <div style="display: inline-block" class="text item">2022-11-2 12:00:00</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px;margin-left: 10px">
        <el-col v-for="(item, index) in list.connectShowList.secondLine" :span="4" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{item.dbCName}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="childClick(item.dbId,item.dbCName)">本体管理</el-button>
            </div>
            <!--以下为知识库描述信息-->
            <div class="text item">
              {{item.dbNote}}
            </div>
            <!--以下为数量信息-->
            <el-descriptions style="width: 140%">
              <el-descriptions-item label="实体类型数量">{{item.conceptNum}}</el-descriptions-item>
              <el-descriptions-item label="关系类型数量">{{item.relationNum}}</el-descriptions-item>
            </el-descriptions>
            <div>
              <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
              <div style="display: inline-block" class="text item">2022-11-2 12:00:00</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px;margin-left: 10px" v-if="list.connectShowList.secondLine.length == 0">
          <div style="height: 250px;width: 100%">

          </div>
      </el-row>

      <el-row>
        <el-button type="primary" plain style="margin-bottom: 20px;margin-left: 10px;float:left;" @click="handleAdd">新增本体库</el-button>
      </el-row>
    </div>

    <el-pagination style="display: flex;float: left"
      background
      layout="prev, pager, next"
      :total="pageInfo.total"
      :current-page="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      @current-change="handleChangePage"
      @next-click="handleNextPage"
      @prev-click="handlePrevPage"
    >
    </el-pagination>

    <el-dialog
      :title="flags.updateFlag ? '编辑' : '新增'"
      :visible.sync="visibles.addOrUpdateVisible"
      width="50%">
      <el-form ref="form" :model="dataInfo" label-width="80px">
        <el-form-item label="图谱库id" label-width="150px">
          <el-input disabled placeholder="系统随机生成" v-if="!flags.updateFlag"></el-input>
          <el-input v-model="dataInfo.dbId" disabled placeholder="系统随机生成" v-if="flags.updateFlag"></el-input>
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
import OntoConnectApi from "../../../../api/neo4j/OntoConnectApi";
export default {
  name: 'KGOntoManagementList',
  components: {KGUploadFile},
  data() {
    return {
      currentDate: new Date(),
      visibles:{
        dialogVisible:false,
        addOrUpdateVisible:false
      },
      flags:{
        updateFlag:false,
        listSplitFlag:false,
        currentPageCountFlag:Number
      },
      pageInfo:{
        currentPage:1,
        pageSize:8,
        total:50,
      },
      list:{
        connectList:[],
        connectShowList:{
          firstLine:[],
          secondLine:[],
        },
      },
      dataInfo:{
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
    childClick(instanceId,instanceName) {
      const data = 1
      // this.$emit('toDetails',data)
      //将选中的图谱信息储存刀localStorage
      localStorage.setItem("ontoId",instanceId)
      localStorage.setItem("ontoName",instanceName)
      this.$router.push('KgOntoMananement')
    },
    init(){
      return this.listConnectors()
    },
    listConnectors(){
      let params = {
        pageSize: this.pageInfo.pageSize,
        currentPage: this.pageInfo.currentPage,
        total:this.pageInfo.total
      }
      return OntoConnectApi.getConnects(params).then(({data}) => {
        this.list.connectList = data.data.list
        this.pageInfo.total = data.data.total
        this.pageInfo.pageSize = data.data.pageSize;
        this.pageInfo.currentPage = data.data.currentPage;
        this.flags.currentPageCountFlag = data.data.list.length
        this.splitConnectList()
      })
    },
    getConnectById(id){
      OntoConnectApi.getConnectionById(id).then(({data}) => {
        this.dataInfo = data.data
      })
    },
    handleAdd(){
      this.reset()
      this.flags.updateFlag = false
      this.visibles.addOrUpdateVisible = true
    },
    handleUpdate(id){
      this.flags.updateFlag = true
      this.visibles.addOrUpdateVisible = true
      this.getConnectById(id)
    },
    fetchData(){
      if (!this.flags.updateFlag){
        KGConnectApi.addConnection(this.dataInfo).then(({data}) => {
          if (data.code == 200){
            this.$message.success(data.data)
            this.reset()
          }else {
            this.$message.error(data.data)
          }
          this.visibles.addOrUpdateVisible = false
          this.init()
        })
      }else {
        console.log("更新的数据为：",this.dataInfo)
        KGConnectApi.fetchUpdate(this.dataInfo).then(({data}) => {
          if (data.code == 200){
            this.$message.success(data.data)
            this.reset()
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
          this.flags.currentPageCountFlag = this.flags.currentPageCountFlag - 1
          if (this.flags.currentPageCountFlag <= 0){
            this.pageInfo.currentPage = this.pageInfo.currentPage > 1 ? this.pageInfo.currentPage - 1 : 1
          }
        }else {
          this.$message.error(data.data)
        }
        return this.init()
      })
    },
    reset(){
      this.dataInfo = {
        dbId:0,
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
    },
    splitConnectList(){
      this.list.connectShowList.firstLine = []
      this.list.connectShowList.secondLine = []
      if (this.list.connectList.length <= 4){
        this.list.connectShowList.firstLine = this.list.connectList
      }else {
        for (let i = 0; i < 4; i++){
          this.list.connectShowList.firstLine.push(this.list.connectList[i])
        }
        for (let i = 4; i < this.list.connectList.length; i++){
          this.list.connectShowList.secondLine.push(this.list.connectList[i])
          this.flags.listSplitFlag = true
        }
      }
    },
    handleNextPage(){
      let pageCount = this.pageInfo.total % this.pageInfo.pageSize == 0 ? this.pageInfo.total / this.pageInfo.pageSize : this.pageInfo.total / this.pageInfo.pageSize + 1
      if (this.pageInfo.currentPage < pageCount){
        this.pageInfo.currentPage = this.pageInfo.currentPage + 1
      }
      this.listConnectors();
    },
    handlePrevPage(){
      if (this.pageInfo.currentPage > 1){
        this.pageInfo.currentPage = this.pageInfo.currentPage - 1
      }
      this.listConnectors();
    },
    handleChangePage(page){
      this.pageInfo.currentPage = page
      this.listConnectors();
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
  width: 300px;
}
</style>
