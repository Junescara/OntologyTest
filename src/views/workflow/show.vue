<template>
  <div>
    <h1>此页面为展示生成拓扑关系</h1>
    <el-steps :active="2" align-center>
      <el-step title="步骤1" description="选择出口断面和预报范围"></el-step>
      <el-step title="步骤2" description="对象关系拓扑展示"></el-step>
      <el-step title="步骤3" description="完成数据提取"></el-step>
    </el-steps>
    <el-form ref="form" label-width="80px" class="form">
      <el-form-item>

        <div>
          <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
          <div id="showTopo" class="network" style="height:80vh"></div>
          <el-dialog title="测试框" :visible.sync="dialogVisible" width="width">
            <div slot="footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>


      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toFinish">确定生成</el-button>
        <el-button @click="toChoose">取消生成</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
import Vis from "vis";
import visApi from '@/api/workflow/vis'

export default {
  name: "show",
  data() {
    return {
      //存储断面信息
      outlet: '',
      //存储范围信息
      inRegion: '',
      //控制弹框是否显示
      dialogVisible: false,
      nodes: [],
      edges: [],
      // network:null,
      container: null,
      //保存原始节点数组
      nodesOrigin: null,
      //保存原始关系数组
      edgesOrigin: null,
      //   节点数组
      nodesArray: [],
      //   关系线数组
      edgesArray: [],
      options: {},
      //保存拓扑图信息
      data: {}
    }
  },
  created() {
    //获取路由中的参数
    this.getParams()
    this.getTopoPicture()
  },
  methods: {
    //获取拓扑图
    getTopoPicture() {
      visApi.getTopo(this.outlet, this.inRegion)
        .then((response) => {
          //1.创建一个nodes数组
          this.nodes = new Vis.DataSet(response.data.data.nodesArray);
          //2.创建一个edges数组
          this.edges = new Vis.DataSet(response.data.data.edgesArray);
          this.container = document.getElementById("showTopo");
          this.data = {
            nodes: this.nodes,
            edges: this.edges
          };
          this.options = {
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
                editClusterError: "无法编辑群集'"
              }
            },

            // 设置节点样式
            nodes: {
              shape: "circle",
              size: 50,
              font: {
                //字体配置
                size: 32
              },
              color: {
                // border: "#2B7CE9", //节点边框颜色
                background: "#97C2FC", //节点背景颜色
                highlight: {
                  //节点选中时状态颜色
                  border: "#2B7CE9",
                  background: "#D2E5FF"
                },
                hover: {
                  //节点鼠标滑过时状态颜色
                  border: "#2B7CE9",
                  background: "#D2E5FF"
                }
              },
              borderWidth: 0, //节点边框宽度，单位为px
              borderWidthSelected: 2 //节点被选中时边框的宽度，单位为px
            },
            // 边线配置
            edges: {
              width: 1,
              length: 260,
              color: {
                color: "#848484",
                highlight: "#848484",
                hover: "#848484",
                inherit: "from",
                opacity: 1.0
              },
              shadow: true,
              smooth: {
                //设置两个节点之前的连线的状态
                enabled: true //默认是true，设置为false之后，两个节点之前的连线始终为直线，不会出现贝塞尔曲线
              },
              arrows: {to: true} //箭头指向to
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
                avoidOverlap: 0
              }
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
              zoomView: true //是否能缩放画布
            },
            //操作模块:包括 添加、删除、获取选中点、设置选中点、拖拽系列、点击等等
            manipulation: {
              enabled: true, //该属性表示可以编辑，出现编辑操作按钮
              addNode: true,
              addEdge: true,
              // editNode: undefined,
              editEdge: true,
              deleteNode: true,
              deleteEdge: true
            }
          };

          this.network = new Vis.Network(
            this.container,
            this.data,
            this.options
          );
          // 点击事件
          this.network.on("click", params => {
            console.log("点击", params.nodes);
            // this.network.addEdgeMode();
          });
          // 点击鼠标右键事件
          this.network.on("oncontext", params => {
            console.log("右击", params);
            this.dialogVisible = true;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toFinish() {
      console.log(this.data)
      this.$router.push({
        path: '/workflow/finish',
        query: {
          data: this.data,
        }
      })
    },
    toChoose() {
      this.$router.push({path: '/workflow/choose'})
    },
    //获取选择步骤中选择的断面和范围信息
    getParams() {
      this.outlet = this.$route.query.outlet
      this.inRegion = this.$route.query.inRegion
    },
    resetAllNodes() {
      this.nodes.clear();
      this.edges.clear();
      this.nodes.add(this.nodesArray);
      this.edges.add(this.edgesArray);
      this.data = {
        nodes: this.nodes,
        edges: this.edges
      };
      //network是一种用于将包含点和线的网络和网络之间的可视化展示
      this.network = new Vis.Network(
        this.container,
        this.data,
        this.options
      );
    },
    resetAllNodesStabilize() {
      this.resetAllNodes();
      this.network.stabilize();
    },
  },
}
</script>

<style scoped>
</style>
