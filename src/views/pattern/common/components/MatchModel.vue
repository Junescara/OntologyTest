<template>
  <el-dialog class="match-dialog" :model-value = 'matchDialogVisible' title="特征选取"  width="40%"
             @close="matchDialogCancel">
    <template #default>
      <!--带slider的对话框-->
      <div class="slider-demo-block" v-for="fea in Features">
        <span class="demonstration">{{fea.name}}</span>
        <el-slider v-model="fea.value.value" max=1  step="0.1" show-input size="small"/>
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

</template>

<script>
import {mapMutations,mapState} from "vuex";
import {Message} from "element-ui";
import {postRequestJson} from "../../../../api/pattern/api";

export default {
  name: "matchModel",
  props:['matchDialogVisible'],
  data(){
    return{
      status:0,
      resetStatus:true,
      reRenderNum:1,
      percentage:0,
      speed:500,
      matchInnerDialogVisible:false,
      matchDialogVisible:false,
      Features:[{'name':'降雨量序列','value':1},{'name':'降雨趋势','value':1},{'name':'面降雨总量','value':1},{'name':'MaxIndex','value':1}
        ,{'name':'降雨量级','value':1},{'name':'格点最大小时雨量','value':1},{'name':'最大格点累计雨量','value':1},{'name':'蓄水流量','value':1}],


    }
  },
  methods: {
    ...mapMutations(['getMatchID', 'changeMatchedSim3', 'changeMatchedPre']),
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
    work() {
      setTimeout(function () {
        if (this.resetStatus) return
        this.mockIncrease()
        this.work()
        // console.log("当前进度：",status)
      }, this.speed)
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
            amount = 0.001
          } else if (n >= 0.2 && n < 0.5) {
            amount = 0.0006
          } else if (n >= 0.5 && n < 0.8) {
            amount = 0.0005
          } else if (n >= 0.8 && n < 0.99) {
            amount = 0.0006
          } else {
            amount = 0
          }
        }
      }
      n = this.clamp(n + amount, 0, 0.994)
      this.progress(n)
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
      for (let i = 0; i < Features.length; i++) {
        let v = Features[i].value.value
        weights.push(v)

      }
      // console.log(weights)
      this.start()
      let matchID = this.getMatchID();
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
    }
  },
  mounted() {


  },
  watch: {
      status(old,newValue){
        this.percentage = newValue * 100
      }
  }

}

</script>

<style scoped>
.el-dialog{
  height: 500px;

}
.ckb-class{
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
}
.match-dialog{
  text-align: left;
}
</style>
