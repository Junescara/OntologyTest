<template>
  <div class="flood-table-main">
    <div class="flood-table-up">
      <el-select v-model="selectBasin" clearable placeholder="选择流域数据" @change="changeBasin" style="height: 100%">
        <el-option
          v-for="item in basinName"
          :key="item.basinId"
          :label="item.basinName"
          :value="item.basinId">
        </el-option>
      </el-select>
      <div class="flood-table-up-show">
        <div>当前展示场次ID</div>
        <el-tag style="margin-left: 5px ">{{currentDisplayId}}</el-tag>
      </div>
    </div>
    <div class="flood-table-below">
      <el-table
        :data="tableData"
        style="width: 100%;height: 90%"
        @row-dblclick="dbClick2ChangeTableData"
        ref="myTable"
      >
        <el-table-column prop="floodId" label="洪水场次" width="80"></el-table-column>
        <el-table-column prop="floodStartTime" label="起涨时间" width="150" :formatter="tableTimeFormatter"></el-table-column>
        <el-table-column prop="floodEndTime" label="退水时间" width="150" :formatter="tableTimeFormatter"></el-table-column>
        <el-table-column prop="flowStationName" label="流量站"></el-table-column>
        <el-table-column prop="rainStationName" label="雨量站"></el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              @click="showFlood(scope.$index,scope.row)"
              type="success"
              size="small">
              展示
            </el-button>
            <el-button
              @click="matchFlood(scope.$index,scope.row)"
              type="danger"
              size="small">
              匹配
            </el-button>
            <el-button
              @click="showFloodMsg(scope.$index,scope.row)"
              type="primary"
              size="small">
              信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--   分页器-->
      <el-pagination small background layout="total,prev,pager,next" :total="totalFloodNum" :current-page.sync="currentPage" :page-size.sync="pageSize"
                     @current-change="changePage"
      ></el-pagination>
      <!--   模态框-->
      <el-dialog class="match-dialog" :visible.sync = 'matchDialogVisible' title="特征选取"  width="40%"
                 @close="matchDialogCancel">
        <template #default>
          <!--带slider的对话框-->
          <div class="slider-demo-block" v-for="fea in Features">
            <span class="demonstration">{{fea.name}}</span>
            <el-slider v-model="fea.value" :max="1"  :step="0.1" show-input size="small"/>
          </div>

          <!--进度条,应该嵌在模态框中-->
          <load-progress :is-visible='progressVisible' @matchDialogCancel="matchDialogCancel"/>
        </template>
        <template #footer>
          <el-button @click="matchDialogCancel">取消</el-button>
          <el-button @click="innerDialogVisibleControl" type="primary">匹配</el-button>
        </template>
      </el-dialog>
        <!--详细信息模态框-->
        <flood-details-model :detail-visible="detailVisible" :flood-details="detailDialogMsg" @closeDetailModel="closeDetailModel"></flood-details-model>
    </div>
  </div>
</template>

<script>

import {mapState,mapMutations} from 'vuex'
import { DateFormation, DateFormation2 } from '../../../../api/pattern/timeUtil'
import { postRequest, postRequestJson, getRequest } from '../../../../api/pattern/api'
import {Message} from "element-ui";
import MatchModel from "./MatchModel";
import { MyLog } from '../../../../utils/LogUtils'
import { getAllBasins, getAllFloods, getFloodDetails, getFloodNum } from '../../../../api/pattern/floodTable'
import loadProgress from "../../../../components/FakeProgress/progress"
import { flaskGet } from '../../../../api/pattern/flaskApi'
import floodDetailsModel from './FloodDetailsModel'

export default {
  name: "floodTable",
  components: {loadProgress,floodDetailsModel},
  // components: {MatchDialogWithSlider, MatchDialog},
  setup(){
    // let matchDialogVisible = ref(false);
  },
  data(){
    return{
      tableData:[{
        "floodId":1,
        "floodStartTime":"2020-01-22 08:00:00",
        "floodEndTime":"2020-02-03 15:00:00",
        "flowStationName":"屯溪",
        "rainStationName":"屯溪",
      }],
      currentPage:1,
      pageSize:5,
      currentSelect:1,
      currentMatchedShouldHighLight:[2,7,10],
      matchDialogVisible:false,
      Features:[{'name':'降雨量序列','value':1},{'name':'降雨趋势','value':1},{'name':'面降雨总量','value':1},{'name':'最大降雨下标','value':1}
        ,{'name':'降雨量级','value':1},{'name':'最大雨量','value':1},{'name':'格点最大小时雨量','value':1},{'name':'流量序列','value':1},{'name':'峰值流量','value':1},
        {'name':'总流量值','value':1}],
      basinName:[],
      selectBasin: null,
      detailVisible:false,//详情dialog是否可见
      detailDialogMsg:{//详情dialog中的内容
      },
      uploadDialogVisible:false,
      totalFloodNum:0,
      progressVisible:false,
    }
  },
  methods:{
    ...mapMutations(['changeSelectedFlood','changeMatchID','getMatchID', 'changeMatchedSim3', 'changeMatchedPre']),
    matchFlood(index,row){
      // console.log(index,row)//当前列表第几个，一行的proxy数据
      let matchId = row.floodId
      // this.clickMatch(matchId)
      this.currentSelect = matchId

      this.matchDialogVisible = true
      // console.log("现在是",this.matchDialogVisible)
      this.changeMatchID(this.currentSelect)
      // console.log("currentSelect",this.currentSelect)
    },
    //页面改变，重新请求。
    changePage(page){
      let _this = this
      getAllFloods({
        "page":page,
        "size":_this.pageSize,
        "basinId":_this.selectBasin
      }).then((res)=>{
        _this.tableData = res.data.data.records
        _this.currentPage = res.data.data.current
      }).catch((err)=>{
        Message({
          message:err,
          type:"error"
        })
      })
    },
    //时间格式化
    tableTimeFormatter(row,column,cellValue,index){
      let formatTime = DateFormation(cellValue)
      // return toRaw(data).floodStartTime
      return formatTime
    },
    //双击某一列，根据id查数据库，改变左边图标的数据捏
    dbClick2ChangeTableData(row, column, event){
      let floodID = row.floodId//获得id
      // console.log("flood发送数据",floodID)
      //利用vuex进行兄弟组件的通信
      this.changeSelectedFlood(floodID);
    },
    //
    innerDialogVisibleControl() {
      let _this = this;
      //得到当前权重
      let weights = []
      for (let i = 0; i < this.Features.length; i++) {
        let v = this.Features[i].value
        weights.push(v)
      }
      weights = weights.toString()
      // this.start()
      this.progressVisible = true
      let matchID = this.currentSelect;
      console.log(matchID)
      //请求后端拿到匹配的结果
      flaskGet("/mdtw/match", {"flood_id": matchID, "weights": weights})
        .then((res) => {
          console.log(res.data.data)
          // let sim3 = res.data.data.sim3
          // let pre = res.data.data.pre

          //用匹配到的数据，改变pinia中的sim3和pre数据
          // _this.changeMatchedSim3(sim3)
          // _this.changeMatchedPre(pre)
          console.log("匹配到sim3和pre")
          //结束进度条
          _this.progressVisible = false
          //成功弹窗
          Message({
            message: '匹配完成',
            type: 'success'
          })
          _this.matchFinish()
        })
        .catch((err) => {
          _this.progressVisible = false
          console.log("出错了", err)
        })
    },
    //emit关闭窗口
    matchDialogCancel() {
      this.matchDialogVisible = false
    },
    //查询场次详情信息
    showFloodMsg(index,row){
      let _this = this
      console.log("showFloodMsg")
      let params = {
        "floodId":row.floodId
      }
      getFloodDetails(params)
        .then((res)=>{
          // console.log("floodDetail",res.data.data)
          let data = res.data.data
          data.startTime = _this.tableTimeFormatter(0,0,data.startTime)
          data.endTime = _this.tableTimeFormatter(0,0,data.endTime)
          data.peakFloodTime = _this.tableTimeFormatter(0,0,data.peakFloodTime)
          _this.detailDialogMsg = data
          _this.detailVisible = true
        })
        .catch((err)=>{
          Message(err.toString())
        })
    },
    changeBasin(value){
      let params = {
        "page":1,
        "size":5,
        "basinId":value}
      //切换流域，更新当前流域下的所有场次
      getAllFloods(params)
        .then((res)=>{
          this.tableData = res.data.data.records
        }).catch((err)=>{
        Message({
          message:err,
          type:'error'
        })
      })
      //切换流域，同时更新场次总数，用于分页
      getFloodNum({
        "basinId":this.selectBasin
      }).then((res)=>{
        // console.log("count",res.data.data)
        this.totalFloodNum = res.data.data
      })
    },
    showFlood(index,row){
      console.log(index,row)
      this.changeSelectedFlood(row.floodId)
    },
    closeDetailModel(){
      this.detailVisible = false
    }

  },
  mounted() {
    let _this = this
    getAllFloods({//这里采用的是params传参
      "page":1,
      "size":5,
      "basinId": null
    }).then((res)=>{
      console.log("res.data",res.data)
      this.tableData = res.data.data.records
    }).catch((err)=>{
      Message({
        message:err,
        type:'error'
      })
    })

    getAllBasins()
      .then((res)=>{
        let datas = res.data.data
        this.basinName = datas
      })

    getFloodNum({
      "basinId": null
    }).then((res)=>{
      this.totalFloodNum = res.data.data
    })
  },
  computed:{
    currentDisplayId(){
      return this.$store.state.pattern.selectedFlood
    }
  }
}
</script>

<style scoped>
.el-pagination{
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}

.flood-table-main{
  min-height: calc(50vh - 96px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.flood-table-up{
  display: flex;
  flex-direction: row;
  /*靠右显示*/
  /*justify-content: flex-end;*/
  justify-content: space-between;
}
.flood-table-up-show{
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}
</style>
