<template>
    <!-- <div class="app-container"> -->
    <!-- 表格 -->
    <!-- <el-table :data="labels" border fit highlight-current-row>
            <el-table-column prop="name" label="本体名称" width="120" align="center" />
        </el-table> -->
    <!-- </div> -->
    <div>
        节点标签
        <ul>
            <li v-for="label in labels" :key="label">{{ label }}</li>
        </ul>
        关系标签
        <ul>
            <li v-for="relation in relations" :key="relation">{{relation}}</li>
        </ul>
    </div>


</template>
  
<script>
import ontologyApi from '@/api/neo4j/ontology'
export default {
    data() {
        return {
            labels: {},
            relations: {}
        }
    },
    methods: {
        //查询所有节点label
        getLabels() {
            ontologyApi
                .getLabels()
                .then((response) => {
                    this.labels = response.data.data
                    console.log(this.labels)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //查询所有关系label
        getRelations() {
            ontologyApi.getRelations()
                .then((response) => {
                    this.relations = response.data.data
                    console.log(this.relations)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    },
    created() {
        this.getLabels()
        this.getRelations()
    }

}
</script>