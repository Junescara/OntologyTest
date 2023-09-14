<template>
  <!--进度条,应该嵌在模态框中-->
  <el-dialog :visible.sync="isVisible" title="历史模式库匹配" append-to-body destroy-on-close @closed="matchDialogVisible = false">
    <el-progress :percentage="percentage" :show-text="false" :key="reRenderNum"></el-progress>
  </el-dialog>
</template>

<script>
export default {
  name: 'load-progress',
  props:['isVisible'],
  data(){
    return{
      resetStatus:true,
      status:0,
      reRenderNum:1,
      speed:500,
      percentage:0,

    }
  },
  methods:{
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
  },
  watch:{
      isVisible(newVal){
        if (newVal == true){
          this.start()
        }
      }
  }
}
</script>

<style scoped>

</style>
