<template>
  <div class="container">
    <p>流域水循环关系平台</p>
    <br>
    <div><el-row :gutter="80">
      <el-col :span="12">
        <el-card class="box-card" style="width: 100%">
          <el-descriptions column="1" title="本体管理">
          
            <el-descriptions-item label="所属分类">流域水循环关系对象本体库</el-descriptions-item>
            <el-descriptions-item label="用途">用于规范水利对象属性定义及对象间空间、水流等基础语义关系</el-descriptions-item>
            <template> <div> <slot name="extra"></slot> </div></template>
            <template v-slot:extra>
              
        <el-button  type="primary" size="small"  @click="router.push('OntoView')">
          查看
        </el-button>

   
        <el-button type="primary" size="small" @click="router.push('OntoAdd')">
         新增
        </el-button>
   
   
        <el-button type="primary"  size="small" @click="router.push('OntoWatch')">
         浏览
        </el-button>
    
             
            
            </template>
          </el-descriptions>
          <div>
            <div></div>
              <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
              <div style="display: inline-block "  class="text item">竹子</div>
              <div style="display: inline-block;padding-left: 200px; "  class="text item"> 2022-11-2 12:00:00</div>
            </div>
      </el-card>
      </el-col>
    

      <el-col :span="12">
        <el-card>
          <el-descriptions column="1" title="实例管理">
            <template> <div> <slot name="extra"></slot> </div></template>
            <template v-slot:extra>
              
        <el-button  type="primary" size="small"  @click="router.push('InstanceView')">
          查看
        </el-button>

   
        <el-button type="primary" size="small" @click="router.push('InstanceAdd')">
         新增
        </el-button>
   
   
        <el-button type="primary"  size="small" @click="router.push('InstanceWatch')">
         浏览
        </el-button>
    
             
            
            </template>
           
            <el-descriptions-item label="所属分类">流域水循环关系对象本体库</el-descriptions-item>
            <el-descriptions-item label="用途">对水循环图谱中的实例进行管理</el-descriptions-item>
            
          </el-descriptions>
          <div>
              <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
              <div style="display: inline-block "  class="text item">竹子</div>
              <div style="display: inline-block;padding-left: 200px; "  class="text item"> 2022-11-2 12:00:00</div>
            </div>
         </el-card></el-col>


         
    
    </el-row></div>
   
         
    <!-- <button @click="router.push('ontology')">本体管理</button>
    <button @click="router.push('instance')">实例管理</button> -->
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();


</script>

<style lang="less" scoped>
// .container {
//   padding-top: 10vh;
//   button {
//     margin: 40px;
//   }
// }

// h1 {
//   font-size: 50px;
//   font-weight: bold;
//   margin-bottom: 20px;
//   color: #555;
// }

p {
  font-size: 24px;
  font-weight: bold;
  color: #777;
}

button {
  // background-color: #25a0c5;
  // color: #fff;
  // font-size: 24px;
  // padding: 10px 20px;
  // border: none;
  // border-radius: 8px;
  // margin-top: 40px;
  // cursor: pointer;
  // box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
  // transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #1a7592;
  transform: translateY(-2px);
}
.box-card {
  width: 480px;
}
</style>
