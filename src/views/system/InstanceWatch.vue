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

       <div >
            <KGVisibleVisNetwork
                    ref="KGVisibleVisNetwork"
                    :kgTypeProp = "kgType"
                    :neoIdProp = "neoId"
                    :snameProp = "sname">

            </KGVisibleVisNetwork>
        </div>
   </span>

  <el-divider></el-divider>
</template>

<script>
    import KGVisibleVisNetwork from "../../components/common/KGVisibleVisNetwork.vue";
export default {
    data() {
        return {
            neoId : "",//父节点标签id
            sname : "",//父节点标签名称
            kgType:2,
        }},
    created() {
        // 请求分页查询数据
        this.neoId = this.$route.query.neoId;
        this.sname = this.$route.query.sname;
        this.kgType = 1;//代表按模块展示的示例图
        if(this.sname == "实例管理")
            this.kgType = 4//代表展示所有本体的总图

        console.log("InsWatch ==> created: neoId", this.neoId, this.sname,this.kgType);

    },
    components:{
        KGVisibleVisNetwork,

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

    },



  },
    watch: {
        $route(to, from) {
            if (to.fullPath.indexOf("InstanceWatch") !== -1) {
                console.log("InstanceWatch==>to.query",to.query);
                this.neoId = to.query.neoId;
                this.sname = to.query.sname;
                this.$refs.KGVisibleVisNetwork.getParams(this.neoId,this.sname,2);
            }
        },
    },
}
</script>

<style>

</style>