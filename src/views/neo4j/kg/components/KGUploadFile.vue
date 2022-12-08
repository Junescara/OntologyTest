<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/9 16:51
 * @description：从表中把数据导入neo4j的组件
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <el-form ref="form" :model="dataform" label-width="90px">
      <el-form-item label="导入类型">
        <el-radio-group v-model="flags.fileFlag">
          <el-radio label="1">关系</el-radio>
          <el-radio label="2">实体</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关系名称" v-if="flags.fileFlag == '1'" >
        <el-input v-model="dataform.relationship" placeholder="请输入关系名称 示例值：上级流域"></el-input>
      </el-form-item>
      <el-form-item label="头实体" v-if="flags.fileFlag == '1'" >
        <el-input v-model="dataform.labelFrom" placeholder="关系的出发结点 三元组的头 示例值：A"></el-input>
      </el-form-item>
      <el-form-item label="尾实体" v-if="flags.fileFlag == '1'">
        <el-input v-model="dataform.labelTo" placeholder="关系的到达结点 三元组的尾 示例值：B"></el-input>
      </el-form-item>
      <el-form-item label="起点所在列" v-if="flags.fileFlag == '1'" >
        <el-input v-model="dataform.coFrom" placeholder="关系出发结点在表中所在列数 示例值：1"></el-input>
      </el-form-item>
      <el-form-item label="终点所在列" v-if="flags.fileFlag == '1'">
        <el-input v-model="dataform.coTo" placeholder="关系到达结点在表中所在列数 示例值：2"></el-input>
      </el-form-item>
      <el-form-item label="起始行" v-if="flags.fileFlag == '1'">
        <el-input v-model="dataform.skip" placeholder="需要跳过的表头的行数 示例值：1 （如无需跳过则请填入0）"></el-input>
      </el-form-item>
      <el-form-item label="实体类名称" v-if="flags.fileFlag == '2'">
        <el-input v-model="dataform.label" placeholder="实体标签名称"></el-input>
      </el-form-item>
      <el-form-item label="主键所在列" v-if="flags.fileFlag == '2'">
        <el-input v-model="dataform.co" placeholder="主键属性所在列数 实例值：0"></el-input>
      </el-form-item>
    </el-form>

    <el-upload
      class="upload-demo"
      drag
      action="String"
      ref="upload"
      multiple
      :auto-upload="false"
      :limit="1"
      :on-exceed="handleExceed"
      :http-request="uploadFile">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将图谱文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">待上传的文件：</div>
    </el-upload>
    <br>
    <el-button type="primary" @click="submitUpload" plain>导入</el-button>
<!--    <el-button style="margin-left: 10px;" type="success" @click="uploadFile">导入</el-button>-->

<!--    <el-button type="primary" plain>上传</el-button>-->
  </div>
</template>

<script>
import fileApi from "../../../../api/neo4j/fileApi";

export default {
  name: "KGUploadFile",
  data(){
    return {
      labelPosition: 'left',
      dataform:{

      },
      flags:{
        fileFlag:'1', //1表示关系，2表示结点
      }
    }
  },
  methods:{
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleExceed(files, fileList) {
      this.$message.warning(`限制选择1个文件`);
    },
    uploadFile(params,type){
      console.log("params=======",params)
      if (this.flags.fileFlag == 1){
        //导入关系文件
        fileApi.importRelation(this.dataform,params.file).then(({data}) => {
          console.log("测试结果data===========",data);
          this.$message({
            message: '导入成功',
            type: 'success'
          });
        },(error) => {
          console.log("/测试结果error=======",error);
          this.$message.error('导入失败');
        });

      }else {
        //导入实体文件
        fileApi.importEntities(this.dataform,params.file).then(({data}) => {
          console.log("测试结果data===========",data);
          this.$message({
            message: '导入成功',
            type: 'success'
          });
        },(error) => {
          console.log("/测试结果erroe=======",error);
          this.$message.error('导入失败');
        })
      }

    }
  }
}
</script>

<style scoped>

</style>
