<template>
   <span>
    <div>
     <el-form label-width="200px" inline label-position="left"  align="right">
    
      <el-form-item left-padding="300px">
        <el-button  type="primary"  @click="OntoView">
          查看
        </el-button>
      </el-form-item>
      <el-form-item  >
        <el-button type="primary"  @click="OntoAdd">
         新增
        </el-button>
      </el-form-item>
      <el-form-item >
        <el-button type="primary"  @click="OntoWatch">
         浏览
        </el-button>
      </el-form-item>
    </el-form>
    </div>
    
   </span>

    
   <el-divider></el-divider>
</template>

<script>
export default {
    methods:{
        OntoView(){
      this.$router.push("OntoView");
    },
    OntoAdd(){
      this.$router.push("OntoAdd");
    },
    OntoWatch(){
      this.$router.push("OntoWatch");
    },

    }
   
}
</script>

<style>

</style>