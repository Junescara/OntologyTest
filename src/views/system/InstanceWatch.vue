<template>
   <span>
    <div>
     <el-form label-width="200px" inline label-position="left"  align="right">
         <el-form-item left-padding="300px">
        <el-button  type="primary"  @click="handelReturn">
          返回
        </el-button>
      </el-form-item>
      <el-form-item left-padding="300px">
        <el-button  type="primary"  @click="InstanceView">
          查看
        </el-button>
      </el-form-item>
      <el-form-item  >
        <el-button type="primary"  @click="InstanceAdd">
         新增
        </el-button>
      </el-form-item>

       <el-form-item >
        <el-button type="primary"  @click="Export">
         导出
        </el-button>
      </el-form-item>
    </el-form>
    </div>

       <div style="display: flex">
            <KGVisibleVisNetwork ref="KGVisibleVisNetwork" :kgType = "2">

            </KGVisibleVisNetwork>
        </div>
   </span>

  <el-divider></el-divider>
</template>

<script>
    import KGVisibleVisNetwork from "../../components/common/KGVisibleVisNetwork.vue";
export default {
    components:{
        KGVisibleVisNetwork
    },
  methods:{
      handelReturn(){
          this.$refs.KGVisibleVisNetwork.handleReturn();
      },
    InstanceView(){
      this.$router.push("InstanceView");
    },
    InstanceAdd(){
      this.$router.push("InstanceAdd");
    },
    InstanceWatch(){
      this.$router.push("InstanceWatch");
    },
    Export(){

    }

  }
}
</script>

<style>

</style>