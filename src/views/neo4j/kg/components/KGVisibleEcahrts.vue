<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/6 20:04
 * @description：使用echarts绘制的可视化知识图谱组件
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <chart-block :option="chartData"></chart-block>
  </div>
</template>

<script>
import ChartBlock from "../../../../components/Echarts/ChartsBlock";
import relationApi from "../../../../api/neo4j/relationApi";
import EchartsUtils from "../../../../utils/EchartsUtils";
export default {
  name: "KGVisibleEcahrts",
  components: {ChartBlock},
  data(){
    return {
      chartData:{

      },
    }
  },
  methods:{
    init(){
      let rels = []
      let nodes = [{name:'72'},{name:'3182'}, {name:'3039'}, {name:'3038'},{name:'2853'},{name:'2719'},{name:'2457'},{name:'2172'},{name:'1754'},{name:'1650'},{name:'1532'},{name:'1530'},{name:'1396'},{name:'1193'},{name:'1049'},{name:'1048'},{name:'921'},{name:'920'},{name:'654'},{name:'277'},{name:'73'},{name:'1189'}]
      let nodeIds = []
      // for (let i = 0; i < 100; i++){
      //   nodes.push({
      //     id:i
      //   })
      // }
      //测试显示
      relationApi.getRelsByNodeId(72).then(({data}) => {
        rels = data.data.relationList
        console.log("rels:",rels)
        for (let item of rels){
            nodeIds.push(item.end)
        }
        //发起第二次异步请求，查询每一个目标结点的信息
        console.log("nodeIds=====",nodeIds)
        return relationApi.getNodesByIds(nodeIds)
      }).then(({data}) => {
        nodes = data.data.nodeList
        return relationApi.getNodeById(72)
      }).then(({data}) => {
        nodes.push(data.data)
        let dataList = {
          nodes,
          rels
        }
        this.chartData = EchartsUtils.createKG(dataList)
        console.log("chartset；",this.chartData)
      })
    }
  },
  mounted() {
    //初始化可视化图谱
    this.init()
  }
}
</script>

<style scoped>

</style>
