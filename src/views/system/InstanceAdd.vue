<template >
    <span>
    <div>
<el-form label-width="200px" inline label-position="left"  align="left"  >

        <el-form-item >
            <el-select
                v-model="ontoType"
                @change="changeType($event,ontoType)"
                placeholder="请选择实例的本体类型"
                clearable
                filterable
            >
        <el-option label="实体类型" value="object" ></el-option>
      <el-option label="关系" value="relation"></el-option>
        </el-select>
   </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>

     <div v-show="object">
      <el-form-item>
        <el-select
            v-model="ontoId"
            placeholder="请选择实例所属本体"
            clearable
            filterable
        >
          <el-option
              v-for="(item,index) in ontoList"
              :key="index"
              :label="item.name"
              :value="item.neoId"
          />
        </el-select>
        </el-form-item>
      <el-form-item label="">
        <el-input v-model="insName" placeholder="请输入实例名称进行创建" clearable />
      </el-form-item>
        <el-button v-show="object"  type="success" @click="handleInsCreate(ontoId)" >创建实例</el-button>
      </div>

<!--        创建关系实例  -->
         <div v-show="relation">
        <el-form  label-width="100px" label-position="left" align="left" inline >
      <el-form-item>
        <el-select
            v-model="AId"
            placeholder="请选择实例A"
            clearable
            filterable
        >
                <el-option
                    v-for="(item, index) in tableData"
                    :key="index"
                    :label="item.name "
                    :value="item.neoId"
                />
              </el-select>
      </el-form-item>

      <el-forom-item>
        <el-select
            v-model="insRelation"
            placeholder="请选择关系"
            clearable
            filterable
        >
                <el-option
                    v-for="(item, index) in insRelList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                />
              </el-select>

      </el-forom-item>

      <el-form-item>
        <el-select
            v-model="BId"
            placeholder="请选择实例B"
            clearable
            filterable
        >
                <el-option
                    v-for="(item, index) in tableData"
                    :key="index"
                    :label="item.name"
                    :value="item.neoId"
                />
              </el-select>
      </el-form-item>

              </el-form>

                  <div >
            <KGVisibleVisNetwork
                ref="KGVisibleVisNetwork"
                :kgTypeProp = "kgType"
                :neoIdProp = "neoId"
                :snameProp = "sname">

            </KGVisibleVisNetwork>
        </div>

         </div>
<!--        创建关系实例 结束-->
    </el-form-item>

       <el-form-item>
       <el-button v-show="relation"  type="success" @click="Recreate" >创建关系实例</el-button>
      </el-form-item>

      <el-form-item>
        <el-input
            placeholder="请输入实例名称进行搜索"
            clearable
            v-model="searchContent"
            @keyup.enter="searchInst"
            autofocus
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="Search" @click="searchInst"
        >搜索</el-button
        >
      </el-form-item>
    </el-form>

      <!-- 实例表格 -->
      <div v-show = "object">
<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: auto"
          border stripe :header-cell-class-name="headerBg1"  >
            <el-table-column prop="name" label="实例名称" width="auto" />
    <el-table-column prop="ontoName" label="所属本体名称" width="auto" align="left" />

    <el-table-column  prop="gmtCreated" label="创建时间" width="auto" align="left"></el-table-column>
    <el-table-column  prop="creator" label="创建人" width="auto" align="left"></el-table-column>


      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click="openUpdateDialog(scope.row.neoId)"
          >修改实例属性</el-button>
        <el-button
            link
            type="danger"
            size="small"
            @click="deleteObject(scope.row.neoId)"
        >删除实例</el-button>
        </template>
      </el-table-column>
    </el-table>
      <!-- 分页器 -->
  <el-pagination align='center'
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="pageNum"
                 :page-sizes="[2, 5, 10, 20]"
                 :page-size="pageSize1"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="tableData.length">
  </el-pagination>
  </div>
      </div>


      <!-- 创建实例时输入属性值的对话框 -->
  <el-dialog
      v-model="dialogVisible_create"
      title="实例属性值提交"
      class="update-dialog"
      width="30vw"
      style="position: relative;"
  >
    <el-row v-for="(attr, index) in attrList" :gutter="20" align="middle">
        <el-text>{{ attrList[index].name }}</el-text>
      <el-col :span="6" :offset="2">
        <el-input
            v-model="attrList[index].value"
            :placeholder="请输入属性值"
            clearable
        ></el-input>
      </el-col>
         <el-text>{{ attrList[index].dimension }}</el-text>
    <el-col :span="5"  >
        <el-button
            v-show = "false"
            @click="handleUpdateAtrr(attrList[index].neoId, attrList[index].value)"
            type="primary"

            html-type="submit"
            :id="'submit' + index"
        >提交</el-button>
      </el-col>
    </el-row>
    <el-col :span="5"  >
        <el-button
            @click="submitAll"
            type="primary"
            class="submit-button"
        >提交属性</el-button>

      </el-col>
  </el-dialog>
      <!-- 创建实例时输入属性值的对话框结束 -->

      <!-- 属性修改对话框 -->
  <el-dialog
      v-model="dialogVisible_update"
      title="实例属性修改"
      class="update-dialog"
      width="30vw"
  >
    <el-row v-for="(attr, index) in attrList" :gutter="20" align="middle">
      <el-text>{{ attrList[index].name }}</el-text>
      <el-col :span="10">
        <el-input
            v-model="attrList[index].value"
            :placeholder="请输入属性值"
            clearable
        ></el-input>
      </el-col>
     <el-text>{{ attrList[index].dimension }}</el-text>
      <el-col :span="8">
        <el-button
            v-show = "false"
            @click="handleUpdateAtrr(attr.neoId, attr.value)"
            type="primary"
            html-type="submit"
            :id="'submit' + index"
        >更新</el-button
        >
      </el-col>
    </el-row>
    <el-col :span="5"  >
        <el-button
            @click="submitAll"
            type="primary"
            class="submit-button"
        >更新属性</el-button>
      </el-col>
  </el-dialog>
<!-- 属性修改对话框结束 -->



</span>
</template>


<script >
import {
  createIns,
  queryOntoList,
  queryInsList,
  queryRelList,
  inslist, createRelIns, getontoProp, getInsProp, deleteIns, instanceByFatherId, updateInst
} from "@/api/module/instance.js";
import { getEntity as getInstance } from "@/api/module/result.js";
import {reactive, ref, computed, onMounted} from "vue";
import { Search, Plus } from "@element-plus/icons-vue";
import MyPagination from "@/components/common/MyPagination.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter,useRoute} from "vue-router";
import {createRel, Ontolist} from "@/api/module/ontology.js";
//import KGVisibleVisNetwork from "@/components/common/KGVisibleVisNetwork.vue";
import KGVisibleVisNetwork from "../../components/common/KGVisibleVisNetwork.vue";
const route = useRoute();
const router = useRouter();

export default {
  components: {KGVisibleVisNetwork, MyPagination},
  data(){
  return{
    tableData:[],
    ontoId:["a","b"],
    insName:"",
    ontoName:" ",
    ontoType:"",
    object:false,
    relation:false,
    AId:null,
    BId:null,
    insRelation:null,
    insList:[],
    receivedNeoId:"",  ////接收Index.vue传来的父本体Id
    ontoList:[],
    insRelList:[],
    attrList:[],
    searchContent: "",
    dialogVisible_create:false,
    dialogVisible_update:false,
    // 表格相关
    currentPage: 1,
    total :20,
    pageSize: 10,
    pageSize1:10,
    layout : "total, prev, pager, next, jumper, ->, slot",
    headerBg: 'headerBg',
    headerBg1:'headerBg',
    neoId : "",//父节点标签id
    sname : "",//父节点标签名称
    kgType:2,
    attUpdated:true,     //用于多个属性同时更新时，判断是否所有属性都成功更新了，只提示一次是否全部更新完毕。
  }
  },

  created() {

    // 请求分页查询数据
    console.log("this.tableData是"+ this.tableData)
    //this.receivedNeoId = this.$route.query.neoId
    //获取上个页面传来的参数
    this.sname = this.$route.query.sname;
    this.neoId = this.$route.query.neoId;

    this.receivedNeoId = this.neoId;

    this.load()
    this.loadFatherOnto()
    this.loadOnto()
   // this.loadRel()
    console.log("this.receivedNeoId是"+ this.receivedNeoId)
    console.log("created")

  },

  methods: {
    //按照父本体的id来查询所有本体（参数isSub为0的时候，会查询该本体的子本体对应的实例集合，并分类返回
    //参数isSub为1的时候，只会查询指定本体对应的实例）
    load() {
      instanceByFatherId(this.receivedNeoId, 0).then(res => {
        console.log("父本体id是", this.receivedNeoId);
        console.log("res.data是");
        console.log("res.data.subData   ", res.data.subData);
        console.log("subData长度为", res.data.subData.length)
        this.tableData = [];
        for (let i = 0; i < res.data.subData.length; i++) {
          this.tableData.push(...res.data.subData[i].list)
        }
        this.total = res.total;
      })
      //获取该父本体下的所有本体
      queryOntoList(this.receivedNeoId).then(({ data }) => {
        this.ontoList.length = 0;
        this.ontoList.push(...data);
        console.log("ontoList ",this.ontoList);
      });
    },

    loadFatherOnto(){
      Ontolist({name:""}).then(res=>{
            this.tableData1=res.data;
            this.total=res.total;
          }
      )
    },

    loadOnto(){
      //获取该父本体下的所有本体
      queryOntoList(this.receivedNeoId).then(({ data }) => {
        this.ontoList.length = 0;
        this.ontoList.push(...data);
        console.log("ontoList ",this.ontoList);
      });

    },


    // loadOnto(){
    // queryOntoList(this.receivedNeoId).then(res => {
    //   console.log("receivedNeoId.value",this.receivedNeoId)
    //   console.log("data ",data);
    //   ontoList.length = 0;
    //   ontoList.push(...data);
    //   console.log("ontoList ",ontoList);
    // })
    // },

    loadRel(){
      queryRelList().then(({ data }) => {
        this.insRelList.length = 0;
        this.insRelList.push(...data);
        //console.log(insRelList);
      });
    },

    //选择本体类型：实体 or 关系？
    changeType(ontoType){
      if(ontoType=="object"){
        this.object=true;
      }
      else{
        this.object=false;
      }

      if (ontoType=="relation"){
        this.relation=true;
        // console.log("this.object="+object);
        // console.log("this.relation =" + relation );
      }
      else{this.relation=false;}
    },

    handleInsCreate(ontoId){
      ElMessageBox.confirm("确定创建该本体的实例吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "创建确认",
      }).then(() => {
        if (ontoId.value === null) {
          ElMessage.warning("请选择本体源");
          return;
        }
        if (this.insName=== "") {
          ElMessage.warning("请输入实例名");
          return;
        }

        createIns(ontoId, this.insName).then(({ data }) => {
          this.dialogVisible_create = true;
          console.log("本次创建实例的data : ", data);
          //创建实例时会返回属性id，属性名，属性值，将propObjList数组放到attrList中
          this.attrList.length = 0;
          this.attrList.push(...data.propObjList);
          console.log("data.propObjList.length 是 ",data.propObjList.length);
          console.log("data.propObjList【0】.neoId 是 ",this.attrList[0].neoId);

          for (let i in data.propObjList.length){
            if (this.attrList[i]=== "null") this.attrList[i] = "";
          }
        });
        this.load();
        this.loadFatherOnto()
        this.loadOnto()
      });
    },

    //更新实例属性值
    handleUpdateAtrr(neoId,value){
      console.log("neoId是", neoId)
      console.log("value是", value)
      updateInst(neoId, value).then((res) => {
        if(res.msg == "更新成功")  this.attUpdated =  true;
        else  this.attUpdated =  false;
        this.load()
        this.loadFatherOnto()
        this.loadOnto()
      });
      this.dialogVisible_create= false;
    },


    //表单选择单个实例修改属性
    openUpdateDialog(insneoId){
      console.log("insneoId", insneoId);

      this.dialogVisible_update= true;
      getInsProp(insneoId).then(({data}) => {
        console.log("本次修改实例属性所属的本体的ID", this.ontoId);
        console.log("本次修改实例的实例ID", data.neoId);
        console.log("data.propObjList" + data.propObjList);
        this.attrList.length = 0;
        this.attrList.push(...data.propObjList)
        for (let i in this.attrList)
          if (this.attrList[i] === "null") this.attrList[i] = "";
      });
    },

    //提交全部属性
    submitAll(){
      for (let index in this.attrList){
        document.getElementById('submit'+ index ).click();
      }
      if(this.attUpdated ==  true)
        ElMessage.success("更新属性成功");
      else
        ElMessage.error("存在属性更新失败");
      this.dialogVisible_update = false;
      this.dialogVisible_create = false;
    },

    searchInst(){
      inslist(["水利对象"], this.searchContent).then(({ data }) => {
        this.tableData.length = 0;
        this.tableData.push(...data);
        console.log("object="+this.object);
        console.log("relation =" + this.relation );
      });
      this.searchContent  = "";
    },

    deleteObject(neoId){
      ElMessageBox.confirm("确定删除该实例吗？", "warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        title: "删除确认",
      }).then(()=>{
        console.log("要删除的实例id是" + neoId)
        deleteIns(neoId).then(({ data }) => {
          ElMessage.success("删除成功");
          this.load()
        });
      });
    },

    Recreate(){
      console.log("AID.value:"+this.AId);
      console.log("BID.value:"+this.BId);
      console.log("insRelation.value"+insRelation);
      createRelIns(this.AId,this.BId,this.insRelation).then(({ data })=>{
        ElMessage.success("构建成功");
        router.push({ path: "/InstanceWatch"});
      });
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

    InstanceView(){
      this.$router.push("InstanceView");
    },
    InstanceAdd(){
      this.$router.push("InstanceAdd");
    },
    InstanceWatch(){
      this.$router.push("InstanceWatch");
    },




  },

  watch:{

  },
}

</script>

<style lang="less" scoped>
@import url("../../assets/css/global.less");
@length: 130px;
.main-content {
  width: 100%;
  height: 100%;
  // padding: 30px;
  overflow: hidden;
  .el-form {
    width: 30%;
    .el-button {
      margin-left: 0;
    }
  }
  .el-table {
    margin-left: 30px;
  }
}
.search {
  display: flex;
  width: 50%;
  justify-content: start;
  align-items: center;
}

.update-dialog {
  .el-row {
    margin: 20px 0;
  }
}
//放在最右下角
.submit-button {
  position: absolute;
  bottom: 30px;
  right: 60px;
}

</style>
