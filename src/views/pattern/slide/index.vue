<template>
  <div class="brush-main">
    <div class="brush-main-top">
      <div class="brush-top-left">
<!--        <div class="rain-flood-chart" ref="rainFlood" id="rainChart"> </div>-->
        <SliderChart/>
      </div>
      <div class="brush-top-right">
<!--        <div class="rain-flood-chart" ref="brushMatch" id="brushMatch"> </div>-->
        <ZoomChart/>
      </div>
    </div>
    <div class="brush-main-down">
      <el-tabs style="width: 100%;height: 100%">
        <el-tab-pane label="滑动窗口" style="height: 100%">
          <!--          <result-chart/>-->
          <BrushResultChart/>
        </el-tab-pane>
        <el-tab-pane label="选择匹配" style="height: 100%">
          <!--          <pre-flood-chart/>-->
<!--          <ResultPreChart/>-->
          <brush-all-result-chart/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SliderChart from "./components/SliderChart";
import ZoomChart from "./components/ZoomChart";
import BrushResultChart from "./components/BrushResultChart";
import BrushAllResultChart from "./components/BrushAllResultChart";
export default {
  name: "index",
  components: {BrushAllResultChart, BrushResultChart, ZoomChart, SliderChart}
}
</script>

<style scoped>
.brush-main{
  min-height: calc(100vh - 96px);
  width: 100%;
  /*background-color: #afc;*/

}
.brush-main-top{
  min-height: calc(50vh - 96px);
  width: 100%;
  /*background-color: #b1d;*/
  display: flex;
  flex-direction: row;
}
.brush-main-down{
  min-height: calc(50vh - 96px);
  width: 100%;
  /*background-color: #1ad;*/
}
.brush-top-left{
  width: 50%;
}
.brush-top-right{
  width: 50%;
}

</style>
