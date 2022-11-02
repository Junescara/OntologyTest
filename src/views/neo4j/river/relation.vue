<template>
    <div class="app-container">
      <!-- 表格 -->
      <el-table :data="[riverList,contains,stationList]" border fit highlight-current-row >
          <el-table-column prop="riverList.name" label="河流名称" width="120" align="center"/>
          <el-table-column prop="contains" label="关系" width="120" align="center"/>
          <el-table-column prop="area" label="测站名称" width="120" align="center"/>
      </el-table>
    </div>
  </template>
  
  <script>
  import riverApi from '@/api/neo4j/river'
  export default {
      data() {
          return {
              
            riverList: null,
            contains: null,
            stationList: null
              
          }
      },
      methods: {
          //河流节点有关的节点
          getRiverRelationNode() {
              riverApi
                  .getRiverRelation()
                  .then((response) => {
                      this.riverList = response.data.data.rivers
                      this.contains = response.data.data.contains
                      this.stationList = response.data.data.stations
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          },
      },
      created() {
          this.getRiverRelationNode()
      }
  
  }
  </script>