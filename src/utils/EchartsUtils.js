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
      //调用生成结点的方法，将结点源数据转换为echarts所需要的结点列表
      dataList = this.createNodes(data.nodes)
    }

    //如果关系边数据不为空
    if (data.rels.length > 0){
      //调用生成关系边的方法，将关系源数据转换为echarts所需要的关系列表
      linkList = this.createRelsEdges(data.rels)
    }

    option = {
      chartsData: {
        title: {
          text: '可视化知识图谱'
        },
        //鼠标事件函数
        tooltip: {
          show:true,
          trigger:'item',
          label: {
            margin: 10,    // label 距离轴的距离
            color: 'rgba(24,12,12,0.7)',     // 文字的颜色
            fontStyle: 'normal',    // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体）
            fontWeight: 'normal',    // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
            fontSize: '20',    // 文字字体大小
            lineHeight: '50',    // 行高
            padding : [5, 7, 5, 7],    // 内边距，单位px
            backgroundColor : 'auto',    // 文本标签的背景颜色
          },
          formatter:function(params){
            console.log("params:",params)
            //判定是结点，显示结点相关数据
            if (params.data.category !== undefined){
              if (params.data.regionalism != null){
                return `行政区划名称：${params.data.regionalism.extraName ? params.data.regionalism.extraName : ''}
                        行政区划编码：${params.data.regionalism.code ? params.data.regionalism.code : ''}
                        经度：${params.data.regionalism.longitude ? params.data.regionalism.longitude : ''}
                        纬度：${params.data.regionalism.latitude ? params.data.regionalism.latitude : ''}
                        `
              }
            }
            //判定为边，显示边数据
            if(params.data.name && params.data.category === undefined){
              return [params.data.name]
            }
            else{
              return params.name;
            }
          }
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        draggable: true,//指示节点是否可以拖动
        focusNodeAdjacency: true,//当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
        legend: {
          x: "center",
          show: true
        },
        //图表中的数据源
        series: [
          {
            type: 'graph', //图表类型
            layout: 'force', //使用力导图
            symbolSize: 25, //结点大小
            roam: true, //是否允许滚轮缩放以及鼠标拖拽
            //结点标签下显示设置
            label: {
              show: true,
              textStyle: {
                fontSize: 12,
                color: "black",
              }
            },
            //边显示设置
            edgeSymbol: ['', 'arrow'],
            //边的大小设置
            edgeSymbolSize: [4, 20],
            //边标签显示设置
            edgeLabel: {
              fontSize: 20,
              textStyle: {
                fontSize: 10,
                color: "black",
              },
              formatter: "{c}"
            },
            //力导图显示设置
            force: {
              repulsion: 4000,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              edgeLength: 80,//边的两个节点之间的距离
              gravity: 0.1, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            },
            data: dataList, //结点数据源
            links: linkList,//边数据源
            //类别集合，可以在结点数据源中声明该节点所属类型
            categories:[
              {
                name:'Resource',
                itemStyle:{
                  "color": "rgba(229,102,63,0.89)"
                }
              },
              {
                name:'行政区划',
                itemStyle:{
                    "color": "rgba(245,10,241,0.89)"
                  }
              },
              {
                name:'断面',
                itemStyle:{
                  "color": "rgba(245,233,10,0.89)"
                }
              },
              {
                name:'测站',
                itemStyle:{
                  "color": "rgba(47,178,159,0.89)"
                }
              },
            ],
            //连线显示设置
            lineStyle: {
              opacity: 0.9,
              width: 1,
              curveness: 0
            }
          }
        ]
      }
    };
    return option.chartsData
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
        source: item.start.toString(),
        target: item.end.toString(),
        name:item.relList[0],
        value:'link',
        // label: {
        //   show: true,
        // },
        symbolSize: [5, 20],
        lineStyle: {
          width: 1,
          curveness: 0
        },

        // des: 'link01des'
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
      console.log("nodeItem++++++",item)
      let nodeItem = CommonUtils.deepClone(item)
      /*nodeItem['itemStyle'] = {
        "normal": {
          "borderColor": "#ff8400",
          "borderWidth": 4,
          "shadowBlur": 20,
          "shadowColor": "#ff8400",
          "color": "#11213b"
        }
      }*/
      //现在传入的参数中尚未填入category，这里临时补一个
      if (item.nodeType.length <= 1){
        nodeItem['category'] = item.nodeType[0]
      }
      nodeItem['category'] = item.nodeType[1]
      nodeItem['name'] = item.regionalism._id.toString()
      nodeList.push(nodeItem)
    }
    return nodeList
  }
}
