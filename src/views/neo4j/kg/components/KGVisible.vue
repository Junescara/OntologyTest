<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/3 1:34
 * @description：知识图谱可视化组件
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <div class="home">
      <div>
        <div id="viz" class="left" style="height:1000px;width: 1000px"/>
      </div>
    </div>
  </div>
</template>

<script>
import NeoVis from 'neovis.js/dist/neovis.js'
// import NeoVis from 'neovis.js';
export default {
  name: 'KGVisible',
  data() {
    return {
      viz: {}
    }
  },

  mounted() {
    this.draw()
  },

  // neovis.js画图
  methods: {
    draw() {
      // 获取dom元素
      var viz1 = this.$refs.viz1

      // 创建veovis实例
      var viz

      // 配置项
      var config = {
        containerId: 'viz',
        // neo4j服务器地址，用户名 和 密码
        neo4j: {
          serverUrl: 'bolt://localhost:7687',
          serverUser: 'neo4j',
          serverPassword: '123456'
        },

        // **///labels是节点央样式的配置：**
        // **/// caption ：节点显示的文字对应内容
        // **/// community： 节点颜色**
        // **/// size：节点大小**
        // **/// font：节点字体大小设置****
        // **/// label：节点显示的属性****
        // **//没有在这个地方配置的节点将会是默认样式**
        labels: {
          河段: { label: 'name', community: '#549633',value: "pagerank", group: "community", size: 2000, font: { size: 35, color: '#606266' }},
          河流: { label: 'name', community: '#d190d9', size: 200, font: { size: 35, color: '#d2213e' }},
          测站: { label: 'name', community: '#d190d9', size: 200, font: { size: 35, color: '#d2213e' }},
          流域: { label: 'name', community: '#d190d9', size: 200, font: { size: 35, color: '#d2213e' }},
          水库: { label: 'name', community: '#d190d9', size: 200, font: { size: 35, color: '#83e707' }},
        },

        // **///relationships是关系线段样式的配置：**
        // **/// caption ：线段显示的文字对应内容
        // **/// thickness： 线段粗细**
        // **/// font：节点字体大小设置****
        // **//没有在这个地方配置的线段将会是默认样式**
        relationships: {
          下游: { label:'name',thickness: 10, caption: true, font: { size: 15, color: "#1656d7", }, },
          上游: { thickness: 10, caption: true, font: { size: 15, color: "#606266", }, },
          位于: { thickness: 10, caption: true, font: { size: 15, color: "#606266", }, },
          包含: { thickness: 10, caption: true, font: { size: 15, color: "#606266", }, },
          流经: { thickness: 10, caption: true, font: { size: 15, color: "#606266", }, },
          监测: { thickness: 10, caption: true, font: { size: 15, color: "#606266", }, },
        },

        // 是否显示箭头
        arrows: true,
        hierarchical: true,

        // 分层结构或者默认 "hubsize"（默认）和"directed".
        // hierarchical_sort_method: 'hubsize',
        // hierarchical_sort_method: 'directed',

        // 配置数据库查询语句，MATCH n RETURN n,尝试过不对，必须用 MATCH p=()-->() RETURN p
        initialCypher: 'MATCH (n)-[r]->(m) RETURN n,r,m limit 50'
      }

      this.viz = new NeoVis(config)
      this.viz.render()
    }
  }
}
</script>

<style scoped>

</style>
