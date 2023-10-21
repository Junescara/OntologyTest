<template >
    <span>
    <div>
     <el-form label-width="200px" inline label-position="left"  align="left" @submit.prevent >
              <el-form-item>
           <el-input align="left"
                     placeholder="请输入实例名进行搜索"
                     clearable
                     v-model="searchContent"
                     width="auto"
                     @keyup.enter="searchInst"
                     autofocus
           />
         </el-form-item>
         <el-form-item>
           <el-button type="primary" :icon="Search" @click="searchInst"
           >搜索实例</el-button>
         </el-form-item>
        <el-form-item ></el-form-item> <el-form-item ></el-form-item><el-form-item ></el-form-item><el-form-item ></el-form-item>
        <el-form-item ></el-form-item> <el-form-item ></el-form-item><el-form-item ></el-form-item><el-form-item ></el-form-item>
        <el-form-item ></el-form-item> <el-form-item ></el-form-item><el-form-item ></el-form-item><el-form-item ></el-form-item>
       <el-form-item  >
        <el-button type="primary" :icon="Plus" @click="
                 this.$router.push({
                   path: 'instanceAdd',
                   query: { neoId: this.receivedNeoId },
                 })
               ">新增实例</el-button>
      </el-form-item>
       <el-form-item>
        <el-button type="primary"  @click="
                 this.$router.push({
                   path: 'instanceWatch',
                 })
               ">浏览实例图谱</el-button>
      </el-form-item>
    </el-form>
    </div>

   </span>


  <el-divider></el-divider>
  <br>



  <el-table :data="tableData.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)" style="width: auto" border stripe :header-cell-class-name="headerBg1"  >
    <!--    <el-table-column  prop="labels" label="所属本体类型" width="auto" align="left">-->
    <!--    </el-table-column>-->
    <el-table-column prop="name" label="实例名称" width="auto" />
    <el-table-column prop="ontoName" label="所属实例类型名称" width="auto" align="left" />
<!--    <el-table-column prop="neoId" label="实例编号" width="auto" />-->

    <el-table-column  prop="gmtCreated" label="创建时间" width="auto" align="left"></el-table-column>
    <el-table-column  prop="creator" label="创建人" width="auto" align="left"></el-table-column>

    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="small"
            @click="this.$router.push({ path: 'entity-result', query: { neoId: scope.row.neoId } })"
        >查看结点</el-button>
      </template>
    </el-table-column>


  </el-table>

  <el-pagination align='center'
                 @size-change="handleSizeChange1"
                 @current-change="handleCurrentChange1"
                 :current-page="pageNum"
                 :page-sizes="[2, 5, 10, 20]"
                 :page-size="pageSize1"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="tableData.length">
  </el-pagination>
</template>


<script >
import {createOnto, DeleteOnto} from "@/api/module/ontology.js";
import { listbasic } from "@/api/module/ontology.js";
import {loadOntoInfo} from "@/api/module/ontology.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Ontolist } from "../../api/module/ontology";
import {deleteIns, inslist, instanceByFatherId, queryInsList} from "@/api/module/instance.js";

const router = useRouter();



export default {
  data() {
    return {
      tableData:  [],
      tableData1:  [],
      ontoName:"啊啊啊",
      insName:"",
      ontoId:["a","b"],
      searchContent:"",
      rangeItem:[],
      time:"2023-1-1",
      multipleSelection: [],
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg',
      headerBg1:'headerBg',
      currentPage: 1, // 当前页码
      //total: 20, // 总条数
      pageSize: 10// 每页的数据条数
      ,
      currentPage1: 1, // 当前页码
      total: 20, // 总条数
      pageSize1: 10,// 每页的数据条数
      receivedNeoId: " ", //接收Index.vue传来的父本体Id
      fatherOntoIdList:["0da94327-0c07-4c70-8050-5c8c9e808a38", "694a16b5-0ebf-4784-aa25-d4b776292b15", "b82314fd-7c78-4a05-98e3-9e51b2ae8ccc", "ef3f1eb4-020f-4fa6-999f-fb67b7644511", "55f3d081-fa7d-4271-9200-5461b51aa89a"],
      //   行政区划父本体 0da94327-0c07-4c70-8050-5c8c9e808a38
      //   流域机构父本体 694a16b5-0ebf-4784-aa25-d4b776292b15
      //   流域对象父本体 b82314fd-7c78-4a05-98e3-9e51b2ae8ccc
      //   应急抢险父本体 ef3f1eb4-020f-4fa6-999f-fb67b7644511
      //   抢险技术父本体 55f3d081-fa7d-4271-9200-5461b51aa89a
    }
  },
  created() {
    // 请求分页查询数据
    this.getParams()
    // this.receivedNeoId = this.$route.query.neoId
    console.log("this.receivedNeoId"+this.receivedNeoId)
    this.load()
    this.load1()

    console.log("this.receivedNeoId是"+this.receivedNeoId)
    console.log("created")
  },
  // created() {
  //   this.load();
  // },
  // mounted() {
  //   // 现在你可以访问this.$route.query.neoId
  //   this.receivedNeoId = this.$route.query.neoId;
  //   console.log("this.receivedNeoId: ", this.$route.query.neoId);
  //   this.load();
  //   this.load1();
  //   console.log("mounted");
  // },




//方法
  methods: {
    //不按照父本体来查询所有实例的接口
    // load() {
    //   queryInsList(["水利实例", "实例主节点"]).then(res => {
    //     this.tableData.time="2023-1-1";
    //     this.tableData = res.data;
    //     console.log("res.total"+res.total)
    //     this.total = res.total;
    //   })
    // },

    //按照父本体的id来查询所有本体（参数isSub为0的时候，会查询该本体的子本体对应的实例集合，并分类返回
    //参数isSub为1的时候，只会查询指定本体对应的实例）
    load(){
      instanceByFatherId(this.receivedNeoId,0).then(res=>{
        console.log("父本体id是",this.receivedNeoId);
        console.log("res.data是");
        //console.log(res.data.subData[0].list);
        // this.tableData = res.data.subData[0].list;
        console.log("res.data.subData   ",res.data.subData);
        console.log("subData长度为",res.data.subData.length)
        this.tableData= [];
        for( let i =  0;i <res.data.subData.length;i++){
          this.tableData.push(...res.data.subData[i].list)
        }

        // this.tableData=res.data;



        this.total = res.total;
      })
    },
    


    load1() {
      Ontolist({name:""}).then(res=>{

            this.tableData1=res.data;
            this.total=res.total;
          }

      )

    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.load()
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.load()
    },

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage1 = 1;
      this.pageSize1 = val;

    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;

    },

    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },

    create() {
      let insName = ref("");
      let propsClzs = this.multipleSelection.map((v) => v.code);
      ElMessageBox.confirm("确定创建该实例吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "创建确认",
      }).then(() => {
        createOnto({ propsClzs, name: this.insName }).then(({ data }) => {
          // console.log(data);
          ElMessage.success("构建成功");
          this.$router.push({
            path: "/Ontology-result",
            query: { neoId: data.neoId },
          });
        });
      });
    },

    searchInst(){
      console.log( "index ",this.$route.query.neoIdIndex )
      // inslist([
      //   "水利对象"
      // ],this.searchContent).then(res=>{
      //   console.log(res);
      //   console.log(res.data.length);
      //   this.tableData=res.data;
      //   this.total=res.data.length;
      //
      // })
      inslist(["水利对象"], this.searchContent).then(({ data }) => {
        this.tableData=data;
        this.total=data.length;
      });
      this.searchContent = "";
    },
    //
    // deleteObject(neoId){
    //   ElMessageBox.confirm("确定删除该实例吗？", "warning", {
    //     confirmButtonText: "确认",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //     title: "删除确认",
    //   }).then(()=>{
    //     console.log("要删除的实例id是" + neoId)
    //     deleteIns(neoId).then(({ data }) => {
    //       // console.log(data);
    //       ElMessage.success("删除成功");
    //     });
    //     this.load();
    //   });
    //
    // }

    getParams() {
      this.receivedNeoId = this.$route.query.neoId


      console.log(this.receivedNeoId);
    
      
    },


  },
  watch: {
    $route(to, from) {
      if (to.fullPath.indexOf("InstanceView") !== -1) {
        console.log(to.query.neoId);
        console.log("数据传过来了");
        this.receivedNeoId = to.query.neoId;
        //this.sname = to.query.sname;
        this.load();
        this.load1();

        
       // this.$refs.KGVisibleVisNetwork.getParams(this.neoId,this.sname,1);
      }
    },
  },



}

</script>
<script setup>
import {
  createIns,
  queryOntoList,
  queryInsList,
  udpateInst,
} from "@/api/module/instance.js";
import {Plus, Search} from "@element-plus/icons-vue";
import {ref} from "vue";

let ontoId = ref(null); //当前选择本体源neoid
// 搜索实例
// const searchInst = () => {
//   queryInsList([], searchContent.value).then(({ data }) => {
//     insList.length = 0;
//     insList.push(...data);
//   });
// };
</script>

<style lang="less" scoped>
@import url("../../assets/css/global.less");

</style>
