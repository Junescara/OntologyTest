<!--
 * @author     ：QYC
 * @date       ：Created in 2023/2/3 16:51
 * @description：Neo4j库备份
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <br>
<!--    <el-form ref="form" :model="recoverInfo" label-width="160px">-->
<!--      <el-form-item label="文件路径">-->
<!--        <el-input v-model="backupInfo.path" placeholder="输入路径和文件名，如C:/N4jBackup/relbackupdemo.txt"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->

<!--        <el-button type="primary" @click="recoverNeo4" plain>对库进行恢复</el-button>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="选择下载文件名称">-->
<!--      <el-input v-model="fileName" placeholder="输入文件名，如relbackupdemo.txt"></el-input>-->
<!--    </el-form-item>-->
<!--      <el-form-item >-->
<!--        <el-button type="primary" @click="downloadFile" plain>下载文件</el-button>-->
<!--      </el-form-item>-->
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
        <div class="el-upload__text">将备份文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">待上传的文件：</div>
      </el-upload>
    <br>
    <el-button type="primary" @click="submitUpload" plain>还原</el-button>
<!--    </el-form>-->


<!--    <el-button style="margin-left: 10px;" type="success" @click="uploadFile">导入</el-button>-->
  </div>
</template>

<script>
import fileApi from "../../../../api/neo4j/fileApi";
import backupApi from "../../../../api/neo4j/backupApi";
import ontology from "../../../../api/neo4j/ontology";
import downloadFileApi from "../../../../api/neo4j/downloadFileApi";

export default {
  name: "KGDownloadFile",
  data(){
    return {
      labelPosition: 'left',
      dataform:{

      },

      flags:{
        fileFlag:'1', //1表示关系，2表示结点
      },
      backupInfo:{
        path:"",
        label:"对象本体",
        database:"需要备份内容所在库",
      },
      fileName:"relbackupdemo.txt",  //
    }
  },
  methods:{
    submitUpload() {
      this.$refs.upload.submit();
    },
    uploadFile(params,type){
      console.log("开始恢复",params)
      fileApi.recoverFromUploadFile(params.file).then(({data}) => {
        console.log("测试结果data===========",data);
        this.$message({
          message: '还原完成！',
          type: 'success'
        });
      },(error) => {
        console.log("/测试结果error=======",error);
        this.$message.error('还原失败');
      });

    },
    handleExceed(files, fileList) {
      this.$message.warning(`限制选择1个文件`);
    },
    downloadFile(){
      downloadFileApi.downloadFile(this.fileName).then((res)=>{
        console.log('文件下载成功');
        const blob = new Blob([res.data]);
        const fileName = this.fileName;

        //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        //IE10以上支持blob，但是依然不支持download
        if ('download' in document.createElement('a')) {
          //支持a标签download的浏览器
          const link = document.createElement('a');//创建a标签
          link.download = fileName;//a标签添加属性
          link.style.display = 'none';
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();//执行下载
          URL.revokeObjectURL(link.href); //释放url
          document.body.removeChild(link);//释放标签
        } else {
          navigator.msSaveBlob(blob, fileName);
        }
/*        console.log(res);
        const data = res;
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', this.fileName);
        document.body.appendChild(link);
        link.click();*/
      })
    },
    downloadFile2() {
      window.location.href = 'http://localhost:8081/file/downloadFile/' + this.fileName;
    },
    recoverNeo4() {
      backupApi.recoverNeo4(this.backupInfo).then(({data}) => {
        if (data.code == 200){
          this.$message.success(data.data)
          this.reset()
        }else {
          this.$message.error(data.data)
        }
      })
    },

    changeLabel(value){
      if(value != "全部"){
        this.backupInfo.label = value
      }
      else{
        this.backupInfo.label = ""
      }

    },
    changeDatabase(value){
      switch (value) {
        case '椒江流域知识图谱':
          this.backupInfo.database ="A387BE524D344370A13F1DFF76C40493"
          break;
        case '屯溪流域知识图谱':
          this.backupInfo.database ="A387BE524D344370A13F1DFF76C40493"
          break;
        case '水利对象本体库':
          this.backupInfo.database ="水利对象本体库"
          break;
      }
    }

  }
}
</script>

<style scoped>

</style>
