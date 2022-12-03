<template>
  <div class="info-main" id="infomain">
    <div class="head-part">
      <div class="leftTop-chart">
<!--        <rain-andflood :floodId ="floodID"/>-->
        <FloodChart/>
      </div>
      <div class="rightTop-chart">
        <FloodTable/>
      </div>
    </div>
    <div class="bottom-part">
      <el-tabs style="width: 100%;height: 100%">
        <el-tab-pane label="匹配结果" style="height: 100%">
<!--          <result-chart/>-->
          <ResultSimChart/>
        </el-tab-pane>
        <el-tab-pane label="预测结果" style="height: 100%">
<!--          <pre-flood-chart/>-->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// import RainAndflood from "@/views/Pattern/rainAndflood";
// import FloodTable from "@/views/Pattern/floodTable";
// import ResultChart from "@/views/Pattern/resultChart";
// import PreFloodChart from "@/views/Pattern/preFloodChart";
import FloodChart from "./components/FloodChart";
import FloodTable from "./components/FloodTable";
import ResultSimChart from "./components/ResultSimChart";
export default {
  name: "index",
  components: {ResultSimChart, FloodTable, FloodChart},
  // components: {PreFloodChart, ResultChart, FloodTable, RainAndflood},
  data(){
    return {
      floodID:1,
    }
  },
  methods:{
    changeChartData(floodID){
      this.floodID = floodID;
      console.log("rfinfo监听到了",floodID)
    }
  }
}
</script>

<style scoped>
.info-main{
  width: 100%;
  min-height: calc(100vh - 96px);
  /*background-color: #123;*/
  display: flex;
  flex-direction: column;

}
.leftTop-chart{
  width: 50%;
  height: 100%;
  background-color: #fff;
}
.rightTop-chart{
  width: 50%;
  height: 100%;
  background-color: #abc;
}
.bottom-chart{
  height: 100%;
  width: 100%;
}
.head-part{
  width: 100%;
  min-height: calc(50vh - 96px);
  /*background-color: #123;*/
  display: flex;
  flex-direction: row;
}
.bottom-part{
  min-height: calc(50vh - 96px);
  width: 100%;
}

</style>
