<template >
    <span>
    <div>

<el-form label-width="200px" inline label-position="left"  align="left">

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
                    v-for="(item, index) in insList"
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
                    v-for="(item, index) in insList"
                    :key="index"
                    :label="item.name"
                    :value="item.neoId"
                />
              </el-select>
      </el-form-item>

              </el-form>
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
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="Search" @click="searchInst"
        >搜索</el-button
        >
      </el-form-item>
    </el-form>

      <!-- 实例表格 -->
    <el-table
        :data="
        insList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
        style="width: 70%; text-align: left"
        empty-text="暂无实例"
    >
    <el-table-column prop="ontoName" label="所属本体名称" width="auto" align="left" />
<!--      <el-table-column prop="neoId" label="实例编号" width="auto" />-->
      <el-table-column prop="name" label="实例名称" width="auto" />
    <el-table-column  prop="gmtCreated" label="创建时间" width="auto" align="left"></el-table-column>
    <el-table-column  prop="creator" label="创建人" width="auto" align="left"></el-table-column>


      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click="openUpdateDialog(scope.row.neoId)"
          >修改属性</el-button>
          <el-button
              link
              type="primary"
              size="small"
              @click="
              router.push({
                path: 'entity-result',
                query: { neoId: scope.row.neoId },
              })
            "
          >浏览结点</el-button
          >
        </template>
      </el-table-column>
    </el-table>
      <!-- 分页器 -->
    <MyPagination
        :pageSize="pageSize"
        :layout="layout"
        :pageTotal="total"
        @pageFunc="pageFunc"
        style="margin-left: -100px"
    />
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


<script setup>
import {
  createIns,
  queryOntoList,
  queryInsList,
  queryRelList,
  udpateInst, inslist, createRelIns, getontoProp, getInsProp
} from "@/api/module/instance.js";
import { getEntity as getInstance } from "@/api/module/result.js";
import {reactive, ref, computed, onMounted} from "vue";
import { Search, Plus } from "@element-plus/icons-vue";
import MyPagination from "@/components/common/MyPagination.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import {createRel} from "@/api/module/ontology.js";

const router = useRouter();

let ontoId = ref(null); //当前选择本体源neoid
let insName = ref(""); //创建实例名称
let ontoType = ref("");
let object = ref(false);
let relation = ref(false);
let AId = ref(null);
let BId = ref(null);
let insRelation = ref(null);
const individualButtons = reactive([]);


const ontoList = reactive([]); //本体源列表
const insList = reactive([
  {
    neoId: "5249d48f-b96d-4a71-bbc3-6d2da022951a",
    name: '"btest5"',
    labels: ["水利对象", "水库"],
    basicObjList: null,
    funcObjList: null,
    propObjList: null,
  },
]); //实例列表
const insRelList = reactive([{
  "startList": [
    "A"
  ],
  "endList": [
    "B"
  ],
  "name": "关系11",
  "strategy": "NAME_CONSTRAINT",
  "neoId": "c108a370-9665-4a33-a0cf-0e1edd8be248",
  "scope": "INST_RELATION"
}]);//关系本体列表
const attrList = reactive([]); //当前实例属性列表
let searchContent = ref("");

const dialogVisible_create = ref(false);
const dialogVisible_update = ref(false);


// 表格相关
let currentPage = ref(1);
let total = computed(() => {
  return insList.length;
});
let pageSize = ref(10);
let layout = "total, prev, pager, next, jumper, ->, slot"; //分页组件会展示的功能项

// 初始化数据
const initData = () => {
  // 获取本体列表
  queryOntoList().then(({ data }) => {
    ontoList.length = 0;
    ontoList.push(...data);
  });
  // 获取实例列表
  const labels = [ "水利实例", "实例主节点"];
  queryInsList(labels).then(({ data }) => {
    insList.length = 0;
    insList.push(...data);
  });
  queryRelList().then(({ data }) => {
    insRelList.length = 0;
    insRelList.push(...data);
    //console.log(insRelList);
  });

};
initData();

// 创建对象实例
const handleInsCreate = (ontoId) => {
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
    if (insName.value === "") {
      ElMessage.warning("请输入实例名");
      return;
    }

    createIns(ontoId, insName.value).then(({ data }) => {
      dialogVisible_create.value = true;
      console.log("本次创建实例的data : ", data);
      //创建实例时会返回属性id，属性名，属性值，将propObjList数组放到attrList中
      attrList.length = 0;
      attrList.push(...data.propObjList);
      console.log("data.propObjList.length 是 ",data.propObjList.length);
      console.log("data.propObjList【0】.neoId 是 ",attrList[0].neoId);

      for (let i in data.propObjList.length){
        if (attrList[i].value === "null") attrList[i].value = "";
      }
        console.log("attrList是",attrList);
        console.log("attrList【0】.value是",attrList[0].value);
        console.log("attrList【0】.name是",attrList[0].name);
      console.log("attrList【0】.neoId 是 ",attrList[0].neoId);
      console.log("attrList【1】.value是",attrList[1].value);
      console.log("attrList【1】.name是",attrList[1].name);



          });
      initData();

    });
    //changeOnto(ontoId);
   // console.log("本次创建实例的本体的ID", ontoId);


    // getInsProp(ontoId).then(({data}) => {
    //   console.log("本次创建实例的本体的ID", ontoId);
    //   console.log("本次创建实例的实例ID", data.neoId);
    //   console.log("本次创建实例属性返回的data",data);
    //   console.log("data.propObjList" + data.propClzList);
    //   attrList.length = 0;
    //   attrList.push(...data.propClzList);
    //   console.log("attrList是",attrList);
    //   console.log("attrList【0】.value是",attrList[0].value);
    //   console.log("attrList【0】.name是",attrList[0].name);
    //   for (let i in attrList)
    //     if (attrList[i].value === "null") attrList[i].value = "";
    //     });
  };


//创建关系实例
const Recreate = () => {
  console.log("AID.value:"+AId.value);
  console.log("BID.value:"+BId.value);
  console.log("insRelation.value"+insRelation.value);
  createRelIns(AId.value,BId.value,insRelation.value).then(({ data })=>{
    ElMessage.success("构建成功");
    router.push({ path: "/InstanceWatch"});
  });
};

const  changeType = (ontoType) => {

  if(ontoType=="object"){
    object.value=true;
  }
  else{
    object.value=false;
  }

   if (ontoType=="relation"){
    relation.value=true;
    // console.log("this.object="+object);
    // console.log("this.relation =" + relation );
  }else{relation.value=false;}

};

// 打开修改属性的窗口
const openUpdateDialog = (insneoId) => {
  console.log("insneoId", insneoId);

  dialogVisible_update.value = true;
  getInsProp(insneoId).then(({data}) => {
    console.log("本次修改实例属性所属的本体的ID", ontoId);
    console.log("本次修改实例的实例ID", data.neoId);
    console.log("data.propObjList" + data.propObjList);
    attrList.length = 0;
    attrList.push(...data.propObjList);
    console.log("attrList是",attrList);
    console.log("attrList【0】.value是",attrList[0].value);
    console.log("attrList【0】.name是",attrList[0].name);
    for (let i in attrList)
      if (attrList[i].value === "null") attrList[i].value = "";
  });
};
// 更新实例属性
const handleUpdateAtrr = (neoId, value) => {

  console.log("neoId是", neoId)
  console.log("value是", value)
  udpateInst(neoId, value).then(() => {
    initData();
  });
  dialogVisible_create.value = false;
};

//提交全部按钮
const submitAll = () => {
  for (let index in attrList){
    document.getElementById('submit'+ index ).click();
  }
  dialogVisible_update.value = false;
 dialogVisible_create.value = false;
}
onMounted(() => {
  // 在组件挂载后将按钮引用存入 ref
  const buttons = document.querySelectorAll('[data-hide-on-submit]');
  buttons.forEach(button => {
    button.style.display = 'none'; // 隐藏按钮
  });
});
// 处理分页
const pageFunc = (pageData) => {
  currentPage.value = pageData.pageNum;
  pageSize.value = pageData.pageSize;
};
// 搜索实例
const searchInst = () => {
  inslist(["水利对象"], searchContent.value).then(({ data }) => {
    insList.length = 0;
    insList.push(...data);
    console.log("object="+object);
    console.log("relation =" + relation );
  });
};
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
