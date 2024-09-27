<template>
   <span>
    <div>
     <el-form label-width="200px" inline label-position="left"  align="right">
    <el-form-item left-padding="300px">
        <el-button  type="primary"  @click="handelReturn">
          返回
        </el-button>
      </el-form-item>
      <!-- <el-form-item left-padding="300px">
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
      </el-form-item> -->
    </el-form>

    </div>
    <div >
            <KGVisibleVisNetwork
                    ref="KGVisibleVisNetwork"
                    :kgTypeProp = "kgType"
                    :neoIdProp = "neoId"
                    :snameProp = "sname"
            >

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
        level:0,
            neoId : "",//父节点标签id
            sname : "",//父节点标签名称
            kgType:1,
    }},
    mounted() {

    },
    created() {
        // 请求分页查询数据
        this.neoId = this.$route.query.neoId;
        this.sname = this.$route.query.sname;
        this.kgType = 1;//代表按模块展示的示例图
        if(this.sname == "本体管理")
            this.kgType = 3//代表展示所有本体的总图

        console.log("OntoWatch ==> created: neoId", this.neoId, this.sname,this.kgType);

    },
    components:{
        KGVisibleVisNetwork
    },
    methods:{
        handelReturn(){
            this.$refs.KGVisibleVisNetwork.handleReturn();
        },
        OntoView(){
      this.$router.push("OntoView");
    },
    OntoAdd(){
      this.$router.push("OntoAdd");
    },
    OntoWatch(){
      this.$router.push("OntoWatch");
    },

    } ,
    watch: {
        $route(to, from) {
            if (to.fullPath.indexOf("OntoWatch") !== -1) {
                //console.log(to.query);
                this.neoId = to.query.neoId;
                this.sname = to.query.sname;
                let kgType = 1;//代表按模块展示的示例图
                if(this.sname == "本体管理")
                    kgType = 3//代表展示所有本体的总图
                this.$refs.KGVisibleVisNetwork.getParams(this.neoId,this.sname,kgType);
            }
        },
    },
}
</script>

<style>

</style>