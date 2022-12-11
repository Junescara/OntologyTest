<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/2 17:34
 * @description：基于vis-network实现的图谱可视化
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <div id="KGNetwork" ref="KGNetwork"></div>
  </div>
</template>

<script>
import Vis from "vis-network/dist/vis-network.min"
import relationApi from "../../../../api/neo4j/relationApi";
import EchartsUtils from "../../../../utils/EchartsUtils";
import VisUtils from "../../../../utils/VisUtils";
import CommonUtils from "../../../../utils/commonUtils";

export default {
  name: "KGVisibleVisNetwork",
  data() {
    return {
      nodes: null,
      edges: null,
      options: null,
      network: null,
      currentNodeId:7,
    }
  },
  props: {
    currentNode: {
      type: Number,
      default: 7
    }
  },
  created() {
    this.nodes = new Vis.DataSet([  // nodes是节点
      {id: 1, label: 'Node 1',level: 1},
      {id: 2, label: 'Node 2',level: 2},
      {id: 8, label: 'Node 8',level: 2},
      {id: 9, label: 'Node 9',level: 2},
      {id: 10, label: 'Node 10',level: 2},
      {id: 3, label: 'Node 3',level: 2},
      {id: 4, label: 'Node 4',level: 3},
      {id: 5, label: 'Node 5',level: 3},
      {id: 6, label: 'Node 6',level: 4},
      {id: 7, label: 'Node 7',level: 5},
    ]);
    this.edges = new Vis.DataSet([  // edges是线
      {from: 1, to: 2},  // 决定了节点从左往右的顺序
      {from: 1, to: 3},
      {from: 1, to: 8},
      {from: 1, to: 9},
      {from: 1, to: 10},
      {from: 2, to: 4},
      {from: 2, to: 5},
      {from: 5, to: 6},
      {from: 6, to: 7},
    ]);
  },
  mounted() {
    this.initKG()
  },
  methods: {
    initKG() {
      let rels = []
      let nodes = []
      let _this = this
      relationApi.getKGVisiblesData(this.currentNodeId).then(({data}) => {
        rels = data.data.relationShips.relationList
        nodes = data.data.endNodes.nodeList
        let startNode = data.data.startNode
        nodes.push(startNode)
        console.log("从库中查得得nodes",nodes)

        const datas = {
          nodes:VisUtils.createNodes(nodes,CommonUtils.getNodeByType(startNode)._id),
          edges:VisUtils.createRelsEdges(rels)
        }

        const container = this.$refs.KGNetwork;
        _this.options = {
          autoResize: true, // 默认true,自动调整容器的大小
          height: '100%', // 默认值
          width: '100%',  // 默认值
          locale: 'cn',   // 选择语言，默认英文en，cn为汉语
          locales: {      // 语言格式化对象
            cn: {
              edit: '编辑',
              del: '删除',
              back: '返回',
              addNode: '添加节点',
              addEdge: '添加连线',
              editNode: '编辑节点',
              editEdge: '编辑连线',
              addDescription: '点击空白区域添加节点',
              edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
              editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
              createEdgeError: 'Cannot link edges to a cluster.',
              deleteClusterError: 'Clusters cannot be deleted.',
              editClusterError: 'Clusters cannot be edited.',
            },
          },
          // 配置模块
          configure: {
            enabled: true, // false时不会在界面上出现各种配置项
          },
          // 节点模块
          nodes: {
            chosen: true, // 对选择节点做出反应
            shape: "circle",
            color: {
              border: '#2B7CE9',
              background: '#97C2FD',
              highlight: {
                border: '#2B7CE9',
                background: '#FFEC8B'
              },
              hover: {
                border: '#2B7CE9',
                background: '#FFC125'
              }
            },
            font: {
              align: 'left',
              color: '#171615',
              size: 12
              // vadjust: 10, // 标签文本的垂直位置，值越大离节点越远
            },
            labelHighlightBold: false,
            // hidden: true, // 为true不会显示节点。但仍是物理模拟的一部分
            // shape: 'image',
            // image: {    // 路径问题要注意，一定要存储在静态文件夹中
            //   unselected: '/static/images/icon_normal.svg',
            //   selected: '/static/images/icon_selected.svg',
            // },
            size: 40, // 节点大小
            // physics: false, // 关闭物理引擎
            title: '本体', // 用户悬停在节点上时显示的标题,可以是HTML元素或包含纯文本或HTML的字符串
            widthConstraint: { // 节点的最小宽度与最大宽度
              // maximum: 100,
            }
          },
          // 边模块
          edges: {
            // label: '哈哈哈',
            width: 2,
            length: 200,
            // physics: false,
            font: {
              //字体配置
              size: 12
            },
            shadow: true,
            smooth: {
              enabled: true,
              type: 'dynamic', // 平滑曲线的类型
              forceDirection: 'horizontal' // 用于分层布局的配置项,可选值有: ['horizontal', 'vertical', 'none']
            },
            arrows: {to: true} //箭头指向to
            // arrows: {  // 这里可以用来自定义箭头，type为image类型即可
            // middle: { enabled: true, type: 'image', imageHeight: 12, imageWidth: 12, src: getOpticalRed() }
            // },
          },
          // 交互模块
          interaction: {
            hover: true, // 启用鼠标悬停
            hoverConnectedEdges: false, // 鼠标悬停在节点上时，与其连接的边不高亮显示
            hideEdgesOnDrag: false, // true时拖动视图时不会绘制边。这会加快拖动时的响应速度
            hideNodesOnDrag: false, // true时拖动视图时不会绘制节点
            navigationButtons: true,
            selectConnectedEdges: false, // 选中节点时，与其连接的边不高亮
            multiselect: false, // true时长时间单击（或触摸）以及控件单击将添加到选择中
            tooltipDelay: 100,
          },
          // 可视化操作: 没起作用，不知道是不是版本的问题
          manipulation: {
            enabled: false,
            initiallyActive: true,
            addNode: true,
            addEdge: true,
            // editNode: undefined,
            editEdge: true,
            deleteNode: true,
            deleteEdge: true,
            controlNodeStyle:{
              // all node options are valid.
            }
          },
          // 物理引擎
          physics: {
            enabled: true,
            barnesHut: {
              gravitationalConstant: -5000, //斥力
              centralGravity: 0.3,
              springLength: 400, //弹簧长度
              springConstant: 0.04,
              damping: 0.09,
              avoidOverlap: 0
            },
            maxVelocity: 50,
            minVelocity: 1,
            stabilization: {
              iterations: 500, // 最大迭代次数
              enabled: true,
              // fit: true,
              fit: false,   // 值为false时，点击刷新后可回到刷新前的页面
            },
          },
          // 布局
          layout: {
            randomSeed: 2000,
            // hierarchical: {
            //   enabled: true,
            //   levelSeparation: 100, // 层级之间的距离,太小的话箭头会盖住标签字
            //   nodeSpacing: 100,     // 节点之间的距离
            //   treeSpacing: 100,     // 树之间的距离
            //   sortMethod: 'directed',
            // },
          },
        }
        _this.network = new Vis.Network(container, datas, _this.options);

      })
      // setTimeout(() => {
      //   this.nodes.update({id: 9, label: '更新后的9'})
      // },10000)
    }
  },
  watch:{
    currentNode: {
      handler(newValue, oldValue) {
        console.log("currentId",newValue)
        this.currentNodeId = newValue
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
#KGNetwork{
  width: 1450px;
  height: 760px;
}
</style>


