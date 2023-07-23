<template slot-scope="scope">
  <div class="top-content">
    <h5>构建本体</h5>
  </div>
  <div style="width: 200px; height: 100px">
    <el-form-item label="本体名称">
      <el-input v-model="insName" placeholder="请输入本体名" clearable>
      </el-input> </el-form-item
    ><br /><br />
    请选择此本体应有的属性：
  </div>
  <br />

  <div align-items: center>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      border
      stripe
      :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="400" align="left" />
      <el-table-column prop="code" label="属性编号" width="300" align="left">
      </el-table-column>
      <el-table-column prop="name" label="属性名" width="400" align="left">
      </el-table-column>
    </el-table>
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>

  <br />
  <el-row class="mb-6" justify="end">
    <el-button type="success" @click="create">提交</el-button>
  </el-row>
</template>

<script>
import { createOnto } from "@/api/module/ontology.js";
import { listbasic } from "@/api/module/ontology.js";
import { loadOntoInfo } from "@/api/module/ontology.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

export default {
  data() {
    return {
      tableData: [],
      insName: "",
      multipleSelection: [],
      msg: "hello 竹子",
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: "headerBg",
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 2, // 每页的数据条数
    };
  },
  created() {
    // 请求分页查询数据
    this.load();
  },

  //方法
  methods: {
    load() {
      listbasic({ type: "p" }).then((res) => {
        // console.log(res);

        this.tableData = res.data;
        this.total = res.total;
      });
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.load();
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.load();
    },

    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
    },

    create() {
      let insName = ref("");
      let propsClzs = this.multipleSelection.map((v) => v.code);

      ElMessageBox.confirm("确定创建该本体吗？", "warning", {
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
  },
};
</script>
<script setup></script>

<style lang="less" scoped>
@import url("../../assets/css/global.less");

</style>
