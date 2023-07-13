<template>
  <div class="top-content">
    <h5>构建实例</h5>
  </div>
  <div class="main-content">
    <el-form label-width="120px" inline>
      <el-form-item label="实例本体源">
        <el-select
          v-model="ontoId"
          placeholder="请选择实例所属本体源"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in ontoList"
            :key="index"
            :label="item.name"
            :value="item.neoId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="实例名称">
        <el-input v-model="insName" placeholder="请输入实例名" clearable />
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleInsCreate" :icon="Plus"
          >创建实例</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-input placeholder="请输入实例名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 实例表格 -->
    <el-table :data="insList" style="width: 50%" empty-text="暂无实例">
      <el-table-column prop="neoId" label="实例编号" width="180" />
      <el-table-column prop="name" label="实例名称" width="180" />
      <el-table-column label="实例标签" width="240">
        <template v-slot="scope"> {{ scope.row.labels.toString() }} </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="openUpdateDialog(scope.row)"
            >修改属性</el-button
          ></template
        >
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
  <!-- 属性修改对话框 -->
  <el-dialog
    v-model="dialogVisible"
    title="实例属性修改"
    class="update-dialog"
    width="30vw"
  >
    <el-row v-for="(attr, index) in attrList" :gutter="20" align="middle">
      <el-col :span="4" :offset="2"
        ><span>{{ attr.label }}</span></el-col
      >
      <el-col :span="10">
        <el-input
          v-model="attrList[index].value"
          :placeholder="`请输入${attr.label}`"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="8">
        <el-button
          @click="handleUpdateAtrr(attr.neoId, attr.value)"
          type="primary"
          >更新</el-button
        >
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import {
  createIns,
  queryOntoList,
  queryInsList,
  udpateInst,
} from "@/api/module/instance.js";
import { reactive, ref, computed } from "vue";
import { Search, Plus } from "@element-plus/icons-vue";
import MyPagination from "@/components/common/MyPagination.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

let ontoId = ref(null); //当前选择本体源neoid
let insName = ref(""); //创建实例名称
let ontoName = computed(() => (neoId) => {
  for (let i in ontoList)
    if (ontoList[i].neoId === neoId) {
      return ontoList[i].name;
    }
}); //本体源id对应本体名

const ontoList = reactive([
  {
    name: '"水库"',
    labels: ["水利对象本体"],
    neoId: "ba096d0a-bc85-4445-9a47-7aa0e93c89d4",
    basicClzList: null,
    funcClzList: null,
    propClzList: null,
  },
]); //本体源列表
const insList = reactive([
  {
    neoId: "b7557188-0a48-4046-93a8-25b6b48e760a",
    name: '"水利对象接口测试1"',
    labels: ["水利对象", "水库"],
    basicObjList: [],
    funcObjList: [],
    propObjList: [
      {
        typeCode: "p00001",
        neoId: "95924061-16dc-4987-be0a-0dba1fa5f455",
        value: "null",
        dimension: "°",
        range1: "-180",
        range2: "180",
        label: "经度",
        allowEqual: true,
      },
      {
        typeCode: "p00002",
        neoId: "a58b21fd-4652-40a4-b8aa-ff541df2a7df",
        value: "null",
        dimension: "°",
        range1: "-90",
        range2: "90",
        label: "纬度",
        allowEqual: true,
      },
      {
        typeCode: "p10001",
        neoId: "c6cbc8ea-882d-47b7-8304-3255cdeb43bf",
        value: "null",
        dimension: "m",
        range1: "-10000",
        range2: "10000",
        label: "监测水位",
        allowEqual: true,
      },
      {
        typeCode: "p10004",
        neoId: "099a1406-c92f-4e48-bc70-f844549af5b9",
        value: "null",
        dimension: "m³",
        range1: "0",
        range2: "100000",
        label: "径流量",
        allowEqual: true,
      },
    ],
  },
]); //实例列表
const attrList = reactive([]); //当前实例属性列表

const dialogVisible = ref(false);

// 表格相关
let currentPage = ref({ type: Number, default: 1 });
let total = computed(() => {
  return insList.length;
});
let pageSize = ref(6);
let layout = "total, prev, pager, next, jumper, ->, slot"; //分页组件会展示的功能项

// 初始化数据
const initData = () => {
  // 获取本体列表
  queryOntoList().then((data) => {
    ontoList.push(data);
  });
  // 获取实例列表
  queryInsList().then((data) => {
    insList.length = 0;
    insList.push(data);
  });
};
initData();
// 创建实例
const handleInsCreate = () => {
  ElMessageBox.confirm("确定创建该本体源的实例吗？", "warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    if (ontoId.value === null) {
      ElMessage.warning("请选择本体源");
      return;
    }
    if (insName.value === "") {
      ElMessage.warning("请输入实例名");
      return;
    }
    createIns(ontoId.value, insName.value, [ontoName(ontoId.value)]).then(
      ({ neoId }) => {
        initData();
        router.push({ path: "/entity-result", query: { neoId } });
      }
    );
  });
};
// 打开修改属性窗口
const openUpdateDialog = (instance) => {
  dialogVisible.value = true;
  attrList.length = 0;
  attrList.push(...instance.propObjList);
  for (let i in attrList)
    if (attrList[i].value === "null") attrList[i].value = "";
};
// 更新实例属性
const handleUpdateAtrr = (neoId, value) => {
  console.log(neoId, value);
  udpateInst(neoId, value).then(() => {
    initData();
  });
};

// 处理分页
const pageFunc = (pageData) => {
  currentPage.value = pageData.pageNum;
  pageSize.value = pageData.pageSize;
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
</style>
