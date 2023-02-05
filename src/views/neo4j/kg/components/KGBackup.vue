<!--
 * @author     ：QYC
 * @date       ：Created in 2023/2/3 16:51
 * @description：Neo4j库备份
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <el-form ref="form" :model="backupInfo" label-width="160px">
<!--      <el-form-item label="选择需要备份的标签">-->
<!--        <el-input v-model="backupInfo.label" placeholder="输入label，如 对象本体"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="选择需要备份的数据库">
        <el-select clearable @clear="clear"  v-model="LabelOfDataBase.index" placeholder="请选择要备份的数据库"
                   style="margin-top: 0px">
          <el-option
            v-for="(item,index) in LabelOfDataBase"
            :key=index
            :label=item
            :value=item

          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择需要备份的标签">
      <el-select clearable @clear="clear"  v-model="LabelOfOntoObj.index" placeholder="请选择要备份的标签"
                 style="margin-top: 0px">
        <el-option
          v-for="(item,index) in LabelOfOntoObj"
          :key=index
          :label=item
          :value=item

        />
      </el-select>
      </el-form-item>
<!--      <el-form-item label="选择需要备份的数据库">-->
<!--        <el-input v-model="backupInfo.database" placeholder="输入database的label 如 水利对象本体库"></el-input>-->
<!--      </el-form-item>-->

      <el-form-item label="文件路径">
        <el-input v-model="backupInfo.path" placeholder="输入路径和文件名，如C:/N4jBackup/relbackupdemo.txt"></el-input>
      </el-form-item>
    </el-form>
    <br>
    <el-button type="primary" @click="createBackup" plain>备份！</el-button>
<!--    <el-button style="margin-left: 10px;" type="success" @click="uploadFile">导入</el-button>-->
  </div>
</template>

<script>
import fileApi from "../../../../api/neo4j/fileApi";
import backupApi from "../../../../api/neo4j/backupApi";

export default {
  name: "KGBackup",
  data(){
    return {
      labelPosition: 'left',
      dataform:{

      },
      LabelOfOntoObj:[
        "全部",
        "水利对象",
        "水库",
        "流域",
        "测站",
        "湖泊",
        "断面",
        "河段",
        "水闸",
        "河流",
      ],
      LabelOfDataBase:[
        "椒江流域知识图谱",
        "屯溪流域知识图谱",
        "水利对象本体库",
      ],
      flags:{
        fileFlag:'1', //1表示关系，2表示结点
      },
      backupInfo:{
        path:"C:/N4jBackup/relbackupdemo.txt",
        label:"对象本体",
        database:"需要备份内容所在库",
      }
    }
  },
  methods:{
    createBackup(){
      backupApi.createBackup(this.backupInfo).then(({data}) => {
        if (data.code == 200){
          this.$message.success(data.data)
          this.reset()
        }else {
          this.$message.error(data.data)
        }
      })
    },

  }
}
</script>

<style scoped>

</style>
