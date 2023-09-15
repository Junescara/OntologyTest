<template>
  <el-dialog :visible.sync="visible" title="场次详情信息" @close="closeModel">
    <el-descriptions :column="3" size="mini" border>
      <el-descriptions-item label="所属流域">
        <el-tag size="small">{{floodDetails.basin}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="流量测站">
        <el-tag size="small">{{floodDetails.flowStation}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="降雨测站">
        <el-tag size="small">{{floodDetails.rainStation}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="场次编号">
        {{floodDetails.floodId}}
      </el-descriptions-item>
      <el-descriptions-item label="洪峰形态">
        {{floodDetails.peakPattern}}
      </el-descriptions-item>
      <el-descriptions-item label="持续时间">
        {{floodDetails.durationFlood}} H
      </el-descriptions-item>
      <el-descriptions-item label="峰值水位">
        {{floodDetails.peakLevel}}
      </el-descriptions-item>
      <el-descriptions-item label="峰值流量">
        {{floodDetails.peakFlood}}
      </el-descriptions-item>
      <el-descriptions-item label="降雨总量">
        {{floodDetails.rainSum}}
      </el-descriptions-item>
      <el-descriptions-item label="起涨时间">
        {{floodDetails.startTime}}
      </el-descriptions-item>
      <el-descriptions-item label="峰值时间">
        {{floodDetails.peakFloodTime}}
      </el-descriptions-item>
      <el-descriptions-item label="退水时间">
        {{floodDetails.endTime}}
      </el-descriptions-item>

    </el-descriptions>
  </el-dialog>
</template>

<script>
export default {
  name: 'FloodDetailsModel',
  props:['detailVisible','floodDetails'],
  data(){
    return{
      visible:false,
    }
  },
  methods:{
    closeModel(){
      this.$emit('closeDetailModel')
    }
  },
  watch:{
    detailVisible(newVal){
      this.visible = newVal
    }
  }
}
</script>

<style scoped>

</style>
