<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="riverList" border fit highlight-current-row >
        <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">
                {{ (page - 1) * size + scope.$index + 1 }}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="80" align="center"/>
        <el-table-column prop="len" label="河流长度" width="80" align="center"/>
        <el-table-column prop="area" label="河流面积" width="80" align="center"/>
        <el-table-column prop="latitude" label="纬度" width="120" align="center"/>
        <el-table-column prop="longitude" label="经度" width="120" align="center"/>
        <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <router-link :to="'/teacher/edit/' + scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="size"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import riverApi from '@/api/neo4j/river'
export default {
    data() {
        return {
            page: 1,//当前页
            size: 10,//每页个数
            total: 0,//总记录数
            riverList: null
        }
    },
    methods: {
        //河流节点列表的方法
        getList(page = 1) {
            this.page = page;
            riverApi
                .pageRiver(this.page, this.size)
                .then((response) => {
                    this.riverList = response.data.data.rows.content
                    this.total = response.data.data.total;
                    console.log(this.riverList)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    created() {
        this.getList()
    }

}
</script>