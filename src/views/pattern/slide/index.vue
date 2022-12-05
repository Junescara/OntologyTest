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
      <BrushResultChart/>
<!--      <div class="brush-result-chart" ref="brushResChart" id="brushResChart" v-loading="loading"></div>-->
    </div>
  </div>
</template>

<script>
import SliderChart from "./components/SliderChart";
import ZoomChart from "./components/ZoomChart";
import BrushResultChart from "./components/BrushResultChart";
export default {
  name: "index",
  components: {BrushResultChart, ZoomChart, SliderChart}
}
</script>

<style scoped>
.brush-main{
  min-height: calc(100vh - 96px);
  width: 100%;
  /*background-color: #afc;*/

}
.brush-main-top{
  min-height: calc(50vh - 48px);
  width: 100%;
  /*background-color: #b1d;*/
  display: flex;
  flex-direction: row;
}
.brush-main-down{
  min-height: calc(50vh - 48px);
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
