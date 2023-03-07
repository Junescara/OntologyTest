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
        <el-select clearable @clear="clear" @change="changeDatabase" v-model="LabelOfDataBase.index" placeholder="请选择要备份的数据库"
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
      <el-select clearable @clear="clear" @change="changeLabel" v-model="LabelOfOntoObj.index" placeholder="请选择要备份的标签"
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

      <el-form-item label="备份文件名称">
        <el-input v-model="backupInfo.name" placeholder="请输入备份文件名称（不用加格式后缀）"></el-input>
      </el-form-item>
    </el-form>
    <br>
    <el-button type="primary" @click="createBackup" plain>备份！</el-button>
<!--    <el-button type="primary" @click="downloadFile" plain>下载文件！</el-button>-->
<!--    <el-button style="margin-left: 10px;" type="success" @click="uploadFile">导入</el-button>-->
  </div>
</template>

<script>
import fileApi from "../../../../api/neo4j/fileApi";
import backupApi from "../../../../api/neo4j/backupApi";
import ontology from "../../../../api/neo4j/ontology";
import downloadFileApi from "../../../../api/neo4j/downloadFileApi";

export default {
  name: "KGBackup",
  data(){
    return {
      labelPosition: 'left',
      dataform:{

      },
      LabelOfOntoObj:[
        "全部",
        "对象本体",
        "属性本体",
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
        name:""
      }
    }
  },
  methods:{
    downloadFile(){
      downloadFileApi.downloadFile(this.backupInfo.name).then((res)=>{
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
    createBackup(){
      backupApi.createBackup(this.backupInfo).then((res)=>{
        console.log('文件下载成功');
        const blob = new Blob([res.data]);
        const fileName = this.backupInfo.name

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
