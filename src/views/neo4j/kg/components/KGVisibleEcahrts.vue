<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/6 20:04
 * @description：使用echarts绘制的可视化知识图谱组件
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div style="white-space:pre-line">
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
      currentNodeId:72,
    }
  },
  props: {
    currentNode: {
      type: Array,
      default: () => [{}]
    }
  },
  methods:{
    initKG(){
      let rels = []
      let nodes = []
      let nodeIds = []
      // for (let i = 0; i < 100; i++){
      //   nodes.push({
      //     id:i
      //   })
      // }
      relationApi.getKGVisiblesData(this.currentNodeId).then(({data}) => {
        rels = data.data.relationShips.relationList
        nodes = data.data.endNodes.nodeList
        let startNode = data.data.startNode
        nodes.push(startNode)

        let dataList = {
          nodes,
          rels
        }
        console.log("datalist============",dataList)
        this.chartData = EchartsUtils.createKG(dataList)
        console.log("chartset；",this.chartData)
      })
      /*relationApi.getRelsByNodeId(this.currentNodeId).then(({data}) => {
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
        //发起第三次异步请求，查询起点结点的信息
        console.log("nodes======",nodes)
        return relationApi.getNodeById(this.currentNodeId,"椒江流域知识图谱“)
      }).then(({data}) => {
        nodes.push(data.data)
        let dataList = {
          nodes,
          rels
        }
        this.chartData = EchartsUtils.createKG(dataList)
        console.log("chartset；",this.chartData)
      })*/
    }
  },
  mounted() {
    //初始化可视化图谱
    this.initKG()
  },
  watch:{
    currentNode: {
      handler(newValue, oldValue) {
        console.log("currentId",newValue[0]._id)
        this.currentNodeId = newValue[0]._id
        this.initKG()
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
