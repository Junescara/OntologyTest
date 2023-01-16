<template>
  <div class="flood-table-main">
    <div class="flood-table-up">
      <el-select v-model="selectBasin" clearable placeholder="选择流域数据">
        <el-option
          v-for="item in basinName"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="flood-table-below">
      <el-table
        :data="tableData"
        style="width: 100%"
        @row-dblclick="dbClick2ChangeTableData"
        highlight-current-row
      >
        <el-table-column prop="floodId" label="洪水场次" width="80"></el-table-column>
        <el-table-column prop="floodStartTime" label="起涨时间" width="110" :formatter="tableTimeFormatter"></el-table-column>
        <el-table-column prop="floodEndTime" label="退水时间" width="110" :formatter="tableTimeFormatter"></el-table-column>
        <el-table-column prop="peakPattern" label="洪峰型态"></el-table-column>
        <el-table-column prop="floodDurationTime" label="持续时间"></el-table-column>
        <el-table-column prop="peakFlow" label="洪峰流量"></el-table-column>
        <el-table-column prop="peakStage" label="洪峰水位"></el-table-column>
        <el-table-column prop="totalFloodVolume" label="洪水总量" width="110"></el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template slot-scope="scope">
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
      <el-pagination small background layout="total,prev,pager,next" :total=31 :current-page.sync="currentPage" :page-size.sync="pageSize"
                     @current-change="changePage"
      ></el-pagination>
      <!--   模态框-->
      <!--   <match-dialog v-model:match-dialog-visible="matchDialogVisible" @close="close"></match-dialog>-->
      <el-dialog class="match-dialog" :visible.sync = 'matchDialogVisible' title="特征选取"  width="40%"
                 @close="matchDialogCancel">
        <template #default>
          <!--带slider的对话框-->
          <div class="slider-demo-block" v-for="fea in Features">
            <span class="demonstration">{{fea.name}}</span>
            <el-slider v-model="fea.value" :max="1"  :step="0.1" show-input size="small"/>
          </div>

          <!--进度条,应该嵌在模态框中-->
          <el-dialog :visible.sync="matchInnerDialogVisible" title="历史模式库匹配" append-to-body destroy-on-close @closed="matchDialogVisible = false">
            <el-progress :percentage="percentage" :show-text="false" :key="reRenderNum"></el-progress>
          </el-dialog>
        </template>
        <template #footer>
          <el-button @click="matchDialogCancel">取消</el-button>
          <el-button @click="innerDialogVisibleControl(matchInnerDialogVisible = true)" type="primary">匹配</el-button>
        </template>
      </el-dialog>
        <!--详细信息模态框-->
      <el-dialog :visible.sync="detailVisible" title="场次详情信息">
        <el-descriptions :column="3" size="mini" border>
          <el-descriptions-item label="所属流域">
            <el-tag size="small">{{detailDialogMsg.basin}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="场次编号">
            {{detailDialogMsg.floodId}}
          </el-descriptions-item>
          <el-descriptions-item label="起涨时间">
            {{detailDialogMsg.floodStartTime}}
          </el-descriptions-item>
          <el-descriptions-item label="洪峰形态">
            {{detailDialogMsg.peakPattern}}
          </el-descriptions-item>
          <el-descriptions-item label="持续时间">
            {{detailDialogMsg.floodDuration}}
          </el-descriptions-item>
          <el-descriptions-item label="退水时间">
            {{detailDialogMsg.floodEndTime}}
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import {mapState,mapMutations} from 'vuex'
import {DateFormation2} from "../../../../api/pattern/timeUtil";
import {postRequest, postRequestJson} from "../../../../api/pattern/api";
import {Message} from "element-ui";
import MatchModel from "./MatchModel";


export default {
  name: "floodTable",
  components: {MatchModel},
  // components: {MatchDialogWithSlider, MatchDialog},
  setup(){
    // let matchDialogVisible = ref(false);
  },
  data(){
    return{
      tableData:[{
        "flood_id":1,
        "flood_start_time":"2020-01-22 08:00:00",
        "flood_end_time":"2020-02-03 15:00:00",
        "peak_pattern":"双峰",
        "flood_duration_time":"295H",
        "peak_flow":"515",
        "peak_stage":"122.59",
        "total_flood_volume":"46160.34",
      }],
      currentPage:1,
      pageSize:5,
      currentSelect:1,
      currentMatchedShouldHighLight:[2,7,10],
      matchDialogVisible:false,
      status:0,
      resetStatus:true,
      reRenderNum:1,
      percentage:0,
      speed:500,
      matchInnerDialogVisible:false,
      Features:[{'name':'降雨量序列','value':1},{'name':'降雨趋势','value':1},{'name':'面降雨总量','value':1},{'name':'MaxIndex','value':1}
        ,{'name':'降雨量级','value':1},{'name':'格点最大小时雨量','value':1},{'name':'最大格点累计雨量','value':1},{'name':'蓄水流量','value':1}],
      basinName:[{
        value:"1",
        label:"屯溪"
      },{
        value:"2",
        label:"椒江"
      },{
        value:"3",
        label:"湟水河"
      }],
      selectBasin:"",
      detailVisible:false,//详情dialog是否可见
      detailDialogMsg:{//详情dialog中的内容
        basin:"屯溪",
        floodId:1,
        floodStartTime:"2020-01-22 08:00:00",
        floodEndTime:"2020-02-03 15:00:00",
        peakPattern:"双峰",
        floodDuration:"295h",
      }
    }
  },
  methods:{
    ...mapMutations(['changeSelectedFlood','changeMatchID','getMatchID', 'changeMatchedSim3', 'changeMatchedPre']),
    matchFlood(index,row){
      console.log(index,row)//当前列表第几个，一行的proxy数据
      let matchId = row.floodId
      // this.clickMatch(matchId)
      this.currentSelect = matchId

      this.matchDialogVisible = true
      console.log("现在是",this.matchDialogVisible)
      this.changeMatchID(this.currentSelect)
      // console.log("currentSelect",this.currentSelect)
    },
    //页面改变，重新请求。
    changePage(page){
      let _this = this
      postRequest("/flood",{
        "page":page,
        "size":_this.pageSize
      }).then((res)=>{
        console.log(res.data)
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
      let formatTime = DateFormation2(cellValue)
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
    close(){
      this.matchDialogVisible = false
    },
    start() {
      console.log("start", this.status)
      if (this.resetStatus) {
        this.status = 0
        this.resetStatus = false
        this.reRenderNum++
        this.progress(0)
      }

      this.work()
    },

    mockIncrease(amount) {
      let n = this.status
      if (!n) {
        this.start()
      } else if (n > 1) {
        return
      } else {
        if (typeof amount !== 'number') {
          if (n >= 0 && n < 0.2) {
            amount = 0.03
          } else if (n >= 0.2 && n < 0.5) {
            amount = 0.1
          } else if (n >= 0.5 && n < 0.8) {
            amount = 0.07
          } else if (n >= 0.8 && n < 0.99) {
            amount = 0.01
          } else {
            amount = 0
          }
        }
      }
      n = this.clamp(n + amount, 0, 0.994)
      this.progress(n)
    },
    work() {
      let _this = this
      setTimeout(function () {
        if (_this.resetStatus) return
        _this.mockIncrease()
        _this.work()
        // console.log("当前进度：",status)
      }, _this.speed)
    },
    clamp(n, min, max) {
      if (n < min) return min
      if (n > max) return max
      return n
    },
    progress(n) {
      this.status = this.clamp(n, 0.02, 1)
      if (this.status == 1) {
        this.resetStatus = true
        //结束
      }
      //继续
    },
    done() {
      this.mockIncrease(0.02 + 0.01 * Math.random())
      this.progress(1)
      // console.log("status.value",status)
      //关闭窗口
      this.innerModelFinish()
    },
    innerDialogVisibleControl() {
      let _this = this;
      //得到当前权重
      let weights = []
      for (let i = 0; i < this.Features.length; i++) {
        let v = this.Features[i].value
        weights.push(v)
      }
      console.log(weights)
      this.start()
      let matchID = this.currentSelect;
      console.log(matchID)
      //请求后端拿到匹配的结果
      postRequestJson("/match", JSON.stringify({"id": matchID, "weights": weights}))
        .then((res) => {
          console.log(res.data.data)
          let sim3 = res.data.data.sim3
          let pre = res.data.data.pre

          //用匹配到的数据，改变pinia中的sim3和pre数据
          _this.changeMatchedSim3(sim3)
          _this.changeMatchedPre(pre)
          console.log("匹配到sim3和pre")
          //结束进度条
          _this.done()
        })
        .catch((err) => {
          _this.done()
          console.log("出错了", err)
        })

    },
    matchDialogCancel() {
      this.matchInnerDialogVisible = false
      this.$emit('close')
      // console.log("有发射啊")
    },
    innerModelFinish() {
      Message({
        message: '匹配完成',
        type: 'success'
      })
    },
    showFloodMsg(index,row){
      // console.log(index,row)
      this.detailVisible = true
      this.detailDialogMsg.floodId = row.floodId
      this.detailDialogMsg.floodStartTime = row.floodStartTime
      this.detailDialogMsg.floodEndTime = row.floodEndTime
      this.detailDialogMsg.peakPattern = row.peakPattern
      this.detailDialogMsg.floodDuration = row.floodDurationTime
    }

  },
  mounted() {
    postRequest("/flood",{//这里采用的是params传参
      "page":1,
      "size":this.pageSize
    }).then((res)=>{
      // console.log(res.data.data.records)

      this.tableData = res.data.data.records
    }).catch((err)=>{
      Message({
        message:err,
        type:'error'
      })
    })
  },
  watch: {
    status(newValue,oldValue){
      console.log(newValue)
      this.percentage = newValue * 100
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
}
</style>
