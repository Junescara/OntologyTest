<template>
  <div class="container">
    <p>本体-实例构建平台</p>
    <br>
    <div><el-row :gutter="15">
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%">
          <el-descriptions column="1" title="本体管理">
          
            <el-descriptions-item label="所属分类">图探索</el-descriptions-item>
            <el-descriptions-item label="用途">这是一段描述这是一段描述这是一段描述</el-descriptions-item>
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
      </el-card>
      </el-col>
    

      <el-col :span="8">
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
           
            <el-descriptions-item label="所属分类">图探索</el-descriptions-item>
            <el-descriptions-item label="用途">这是一段描述这是一段描述这是一段描述</el-descriptions-item>
          </el-descriptions>
         </el-card></el-col>


         <el-col :span="8">
        <el-card>
          <el-descriptions column="1" title="流域管理">
            <template>  <div>    <slot name="extra"></slot>  </div></template>
            <template v-slot:extra>
              <el-button type="primary" size="small" @click="toKGHistoryCase">查看详情</el-button>
            </template>
            <el-descriptions-item label="所属分类">图探索</el-descriptions-item>
            <el-descriptions-item label="用途">这是一段描述这是一段描述这是一段描述</el-descriptions-item>
          </el-descriptions>
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
