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
    <el-table
      :data="
        insList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 50%"
      empty-text="暂无实例"
    >
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

const ontoList = reactive([]); //本体源列表
const insList = reactive([]); //实例列表
const attrList = reactive([]); //当前实例属性列表

const dialogVisible = ref(false);

// 表格相关
let currentPage = ref(1);
let total = computed(() => {
  return insList.length;
});
let pageSize = ref(5);
let layout = "total, prev, pager, next, jumper, ->, slot"; //分页组件会展示的功能项

// 初始化数据
const initData = () => {
  // 获取本体列表
  queryOntoList().then(({ data }) => {
    ontoList.length = 0;
    ontoList.push(...data);
  });
  // 获取实例列表
  queryInsList().then(({ data }) => {
    insList.length = 0;
    insList.push(...data);
  });
};
initData();
// 创建实例
const handleInsCreate = () => {
  ElMessageBox.confirm("确定创建该本体源的实例吗？", "warning", {
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

    createIns(ontoId.value, insName.value, []).then(({ data }) => {
      console.log(data);
      initData();
      router.push({ path: "/entity-result", query: { neoId: data.neoId } });
    });
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
