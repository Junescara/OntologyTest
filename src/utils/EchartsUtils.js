/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/4 11:35
 * @description：Echarts工具类
 * @modified By：
 * @version:     1.0
 */
import CommonUtils from "./commonUtils";


export default {
  /**
   * 根据输入的参数生成可视化知识图谱
   * data中包含结点与关系
   * data.nodes 存放结点的数组
   * data.rels 存放关系边的数组
   * @param data
   */
  createKG(data){
    let option = {}
    //用于生成图表结点的数据集
    let dataList = []
    //用于生成图表边的数据集
    let linkList = []

    //如果结点数据不为空
    if (data.nodes.length > 0){
      dataList = this.createNodes(data.nodes)
    }

    //如果关系边数据不为空
    if (data.rels.length > 0){
      linkList = this.createRelsEdges(data.rels)
    }

    option = {
      chartsData: {
        title: {
          text: '可视化知识图谱'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 25,
            roam: true,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: dataList,
            links: linkList,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      }
    };
  },
  /**
   * 根据传入的边数据生成echarts边集，传进来的是关系边数组
   * @param rels
   */
  createRelsEdges(rels){
    let linkList = []
    for (let item of rels){
      //这里用结点的name属性来指定关系边的头尾
      let linkItem = {
        source: item.startNode._id,
        target: item.endNode._id,
        symbolSize: [5, 20],
        lineStyle: {
          width: 5,
          curveness: 0.2
        }
      }

      linkList.push(linkItem)
    }
    return linkList
  },
  /**
   * 根据传入的边数据生成echarts结点集，传进来的是结点数组
   * @param nodes
   */
  createNodes(nodes) {
    let nodeList = []
    for (let item of nodes) {
      //这里用结点的name属性来指定关系边的头尾
      let nodeItem = CommonUtils.deepClone(item)
      let x = Math.random() * 150
      let y = Math.random() * 150
      nodeItem['x'] = x
      nodeItem['y'] = y
      nodeList.push(nodeItem)
    }
    return nodeList
  }
}
