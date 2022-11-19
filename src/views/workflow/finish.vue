<template>
  <div>
    <h1>此页面为完成数据提取页面</h1>
    <el-steps :active="3" align-center>
      <el-step title="步骤1" description="选择出口断面和预报范围"></el-step>
      <el-step title="步骤2" description="对象关系拓扑展示"></el-step>
      <el-step title="步骤3" description="完成数据提取"></el-step>
    </el-steps>

    <el-form ref="form" label-width="80px" class="form">
      <el-form-item>
        <div>您最终生成的拓扑图为</div>
        <div>
          <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
          <div id="mynetwork" class="network" style="height:80vh"></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="finish">结束</el-button>
      </el-form-item>
    </el-form>

  </div>


</template>

<script>
import Vis from "vis";
export default {
  name: "finish",
  data() {
    return {
      //保存拓扑图信息
      data: {},
      nodes: [],
      edges: [],
      container: null,
      options: {}
    }
  },
  created() {
    //从vuex中获取已经保存到的nodes和edges
    this.nodes = this.$store.state.nodes
    this.edges = this.$store.state.edges
  },
  methods: {
    finish() {
      this.$router.push({ path: '/workflow/choose'})
    },
    //展示现有的拓扑图
    showTopo() {
      this.container = document.getElementById('mynetwork');
      this.data = {
        nodes: this.nodes,
        edges: this.edges
      };
      this.options = {
        //节点的配置
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
      }

      this.network = new Vis.Network(this.container, this.data, this.options);

    }
  },
  mounted() {
    this.showTopo()
  }
}
</script>

<style scoped>

</style>
