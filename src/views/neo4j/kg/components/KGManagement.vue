<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/2 1:21
 * @description：图谱管理组件
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <el-row style="margin-left: 20px;margin-bottom: 10px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: './' }">图谱管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-divider></el-divider>
    <KGManagementList @toDetails="toDetails" v-if="visibles.mgVisible"></KGManagementList>
    <KGInstance v-if="visibles.detailsVisible" @goBack="toList"></KGInstance>
<!--    <router-view ref="child" @childClick="childClick"></router-view>-->

  </div>
</template>

<script>
import KGManagementList from "./KGManagementList";
import KGInstance from "./KGInstance";

export default {
  name: 'KGManagement',
  components:{
    KGManagementList,
    KGInstance
  },
  data() {
    return {
      currentDate: new Date(),
      visibles:{
        mgVisible:true,
        detailsVisible:false,
      }
    };
  },
  methods:{
    toDetails(data){
      this.visibles.mgVisible = false
      this.visibles.detailsVisible = true
    },
    toList(data){
      this.visibles.mgVisible = true
      this.visibles.detailsVisible = false
    },
  },
  mounted() {
    console.log("kgList挂载了")
  }
}
</script>

<style scoped>

</style>
