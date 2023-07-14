<template>
  <div>
    <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
    <div id="network_id" class="network" style="height: 80vh"></div>
  </div>
</template>
<script>
import Vis from "vis";
// import OntologyApi from "@/api/module/result.js";
import { getOntology } from "@/api/module/result.js";

export default {
  data() {
    return {
      neoId: "",
      dialogVisible: false,
      nodes: [],
      edges: [],
      id: "",
      label: "",
      color: "",
      from: "",
      to: "",
      // network:null,
      container: null,
      //   节点数组
      nodesArray: [],
      //   关系线数组
      edgesArray: [],
      options: {},
      //保存拓扑图信息
      data: {},
      //保存拓扑图的设置信息
      topoOptions: {
        autoResize: true, //网络将自动检测其容器的大小调整，并相应地重绘自身
        locale: "cn", //语言设置：工具栏显示中文
        //设置语言
        locales: {
          cn: {
            //工具栏中文翻译
            edit: "Edit",
            del: "删除当前节点或关系",
            back: "返回",
            addNode: "添加节点",
            addEdge: "添加连线",
            editNode: "编辑节点",
            editEdge: "编辑连线",
            addDescription: "点击空白处可添加节点",
            edgeDescription: "点击某个节点拖拽连线可连接另一个节点",
            editEdgeDescription: "可拖拽连线改变关系",
            createEdgeError: "无法将边连接到集群",
            deleteClusterError: "无法删除集群.",
            editClusterError: "无法编辑群集'",
          },
        },
        // 设置节点样式
        nodes: {
          shape: "circle",
          size: 40,
          font: {
            //字体配置
            size: 25,
          },
          color: {
            // border: "#2B7CE9", //节点边框颜色
            background: "#97C2FC", //节点背景颜色
            highlight: {
              //节点选中时状态颜色
              border: "#2B7CE9",
              background: "#D2E5FF",
            },
            hover: {
              //节点鼠标滑过时状态颜色
              border: "#2B7CE9",
              background: "#D2E5FF",
            },
          },
          borderWidth: 0, //节点边框宽度，单位为px
          borderWidthSelected: 2, //节点被选中时边框的宽度，单位为px
        },
        // 边线配置
        edges: {
          width: 2,
          length: 260,
          font: {
            //字体配置
            size: 25,
          },
          color: {
            color: "#848484",
            highlight: "#848484",
            hover: "#848484",
            inherit: "from",
            opacity: 1.0,
          },
          shadow: true,
          smooth: {
            //设置两个节点之前的连线的状态
            enabled: true, //默认是true，设置为false之后，两个节点之前的连线始终为直线，不会出现贝塞尔曲线
          },
          arrows: { to: true }, //箭头指向to
        },
        //计算节点之前斥力，进行自动排列的属性
        physics: {
          enabled: true, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
          barnesHut: {
            gravitationalConstant: -4000,
            centralGravity: 0.3,
            springLength: 120,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0,
          },
        },
        //用于所有用户与网络的交互。处理鼠标和触摸事件以及导航按钮和弹出窗口
        interaction: {
          dragNodes: true, //是否能拖动节点
          dragView: true, //是否能拖动画布
          hover: true, //鼠标移过后加粗该节点和连接线
          multiselect: true, //按 ctrl 多选
          selectable: true, //是否可以点击选择
          selectConnectedEdges: true, //选择节点后是否显示连接线
          hoverConnectedEdges: true, //鼠标滑动节点后是否显示连接线
          zoomView: true, //是否能缩放画布
        },
        //操作模块:包括 添加、删除、获取选中点、设置选中点、拖拽系列、点击等等
        manipulation: {
          enabled: true, //该属性表示可以编辑，出现编辑操作按钮
          addNode: true,
          addEdge: true,
          // editNode: undefined,
          editEdge: true,
          deleteNode: true,
          deleteEdge: true,
        },
      },
    };
  },
  created() {
    //获取路由中的参数
    this.getParams();
    this.topoPictureInit();
  },
  methods: {
    //编码转换——将属性编码转换为属性名称
    codeConversion(propCode) {
      if (propCode == "p00001") {
        return "经度";
      } else if (propCode == "p00002") {
        return "纬度";
      } else if (propCode == "p00003") {
        return "面积";
      } else if (propCode == "p10001") {
        return "监测水位";
      } else if (propCode == "p10002") {
        return "入库流量";
      } else if (propCode == "p10003") {
        return "出库流量";
      } else if (propCode == "p10004") {
        return "径流量";
      } else if (propCode == "p10005") {
        return "库容";
      } else if (propCode == "p10006") {
        return "警戒水位";
      } else if (propCode == "p10007") {
        return "水库等级";
      } else if (propCode == "p10008") {
        return "汛限水位";
      } else if (propCode == "p20001") {
        return "水库描述";
      } else if (propCode == "p20002") {
        return "水库负责人";
      } else if (propCode == "p30001") {
        return "完工日期";
      } else if (propCode == "p40001") {
        return "是否启用";
      } else if (propCode == "p80001") {
        return "行政区划";
      }
    },
    //给nodesArray[]和edgesArray[]数组赋值
    topoPictureInit() {
      getOntology(this.neoId).then((res) => {
        //给nodeArray数组赋值
        //本体结点的id为neoId，label为本体名称，颜色为黄色
        // (this.nodesArray[0].id = res.data.neoId),
        //   (this.nodesArray[0].label = res.data.name),
        //   (this.nodesArray[0].color = { background: "yellow" });
        this.nodesArray.push({
          id: res.data.neoId,
          label: res.data.name,
          color: "yellow",
        });
        //属性结点的id为属性编码，label为属性名，颜色为粉色
        for (let i = 1; i <= res.data.propClzList.length; i++) {
          //  (this.nodesArray[i].id = res.data.propClzList[i - 1]),
          //    (this.nodesArray[i].label = res.data.propClzList[i - 1]),
          //将属性编码转换为属性名
          //    this.codeConversion(this.nodesArray[i].label),
          //    (this.nodesArray[i].color = { background: "pink" });
          this.nodesArray.push({
            id: res.data.propClzList[i - 1],
            label: this.codeConversion(res.data.propClzList[i - 1]),
            color: "pink",
          });
        }
        //给edgesArray数组赋值
        for (let i = 0; i < res.data.propClzList.length - 1; i++) {
          //  (this.edgesArray[i].from = res.data.neoId),
          //    (this.edgesArray[i].to = this.nodesArray[i + 1].id),
          //    (this.edgesArray[i].label = "包含");
          this.edgesArray.push({
            from: res.data.neoId,
            to: this.nodesArray[i + 1].id,
            label: "包含",
          });
        }
        this.getTopoPicture();
      });
    },
    //获取拓扑图
    getTopoPicture() {
      getOntology(this.neoId)
        .then((response) => {
          //1.创建一个nodes数组
          this.nodes = new Vis.DataSet(this.nodesArray);
          //2.创建一个edges数组
          this.edges = new Vis.DataSet(this.edgesArray);
          this.container = document.getElementById("network_id");
          this.data = {
            nodes: this.nodes,
            edges: this.edges,
          };
          console.log(this.data);
          this.options = this.topoOptions;

          this.network = new Vis.Network(
            this.container,
            this.data,
            this.options
          );
          // 点击事件
          this.network.on("click", (params) => {
            console.log("点击", params.nodes);
            // this.network.addEdgeMode();
          });
          // 点击鼠标右键事件
          this.network.on("oncontext", (params) => {
            console.log("右击", params);
            this.dialogVisible = true;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取neoId
    getParams() {
      this.neoId = this.$route.query.neoId;
    },
  },
};
</script>
<style lang="less"></style>
