<template>


  <div>
    <p>流域水循环对象关系图谱构建平台（原型）</p>
    <br />
    <div  >
      <el-row :gutter="80" style="margin-bottom: 20px;margin-left: 10px">
        <el-col :span="12" v-for="(item,index) in dataList.slice(start,end)" :key="index" >
          
          <el-card class="box-card" style="width: 100%" >
            <el-text type="primary" size="large" style="padding-right:250px ;">
            {{item.name}}
          </el-text>
            <el-descriptions column="1" >
              
              <el-descriptions-item label="用途"
                >用于规范{{item.name}},以及属性定义、对象间空间等基础语义关系</el-descriptions-item
              >
              <template>
                <div><slot name="extra"></slot></div
              ></template>
              <template v-slot:extra >

                
                <el-button
                  type="primary"
                  size="small"
                  @click="  this.$router.push({
                path: item.view ,
                query: { neoId: item.neoId },
              })
            ">
                  查看
                </el-button>

                <el-button
                  type="primary"
                  size="small"
                  @click="this.$router.push({
                path:  item.add ,
                query: { sname: item.sname,neoId:item.neoId},
              })"
                >
                  新增
                </el-button>

                <el-button
                  type="primary"
                  size="small"
                  @click="this.$router.push({
                path:  item.watch ,
                query: { neoId: item.neoId,sname: item.sname }
                // query: { neoId: scope.row.neoId },
              })"
                >
                  浏览
                </el-button>

              </template>
            </el-descriptions>
            <div>
              <div></div>
              <el-avatar
                size="medium"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <div style="display: inline-block" class="text item">admin</div>
              <div
                style="display: inline-block; padding-left: 100px"
                class="text item"
              >
                2022-11-2 12:00:00
              </div>
            </div>
          </el-card>
          <br><br>
        </el-col>
<!-- 
        <el-col :span="12" v-for="(item,index) in dataList1" :key="index" >
          <el-card class="box-card" style="width: 100%" >
            <el-text type="primary" size="large" style="padding-left:300px ;">
            {{item}}
          </el-text>
            <el-descriptions column="1" title="实例管理">
              <template>
                <div><slot name="extra"></slot></div
              ></template>
              <template v-slot:extra >
                <el-button
                  type="primary"
                  size="small"
                  @click="this.$router.push('InstanceView')"
                >
                  查看
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="this.$router.push('InstanceAdd')"
                >
                  新增
                </el-button>

                <el-button
                  type="primary"
                  size="small"
                  @click="this.$router.push('InstanceWatch')"
                >
                  浏览
                </el-button>
              </template>

              <el-descriptions-item label="所属分类"
                >流域水循环关系对象本体库</el-descriptions-item
              >
              <el-descriptions-item label="用途"
                >对水循环图谱中的实例进行管理</el-descriptions-item
              >
            </el-descriptions>
            <div>
              <el-avatar
                size="medium"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <div style="display: inline-block" class="text item">竹子</div>
              <div
                style="display: inline-block; padding-left: 200px"
                class="text item"
              >
                2022-11-2 12:00:00
              </div>
            </div>
          </el-card></el-col
        > -->
      </el-row>

      <!-- 分页 -->
    
      <el-pagination align='center' 
  @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[2, 4, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dataList.length">
</el-pagination>
    </div>

    <!-- <button @click="router.push('ontology')">本体管理</button>
    <button @click="router.push('instance')">实例管理</button> -->
  </div>
</template>

<script >

export default {
		data() {
			return {
				//多选默认不选中
				//多选默认不选中
        currentPage: 1, // 当前页码
                    total: 10, // 总条数
                    pageSize: 4 // 每页的数据条数
                    ,
                    dataList:[],
                    start:0,
                    end:4,
			}
		},
    created(){
     this.load()
    },
    methods:{ 
      load(){
          this.dataList=[{name:"河流本体管理",view:"OtherOnto",add:"OntoAdd",watch:"OntoWatch",sname:"河流",neoId:"6aec1cfe-b22c-4e2f-abd9-25fa61bfb2d7"}
              ,{name:"河流实例管理",view:"InstanceView",add:"InstanceAdd",watch:"InstanceWatch",sname:"河流",neoId:"6aec1cfe-b22c-4e2f-abd9-25fa61bfb2d7"}
              ,{name:"湖泊本体管理",view:"OtherOnto",add:"OntoAdd",watch:"OntoWatch",sname:"湖泊",neoId:"8b5c7f66-395f-4349-a487-88969f3fdda9"}
              ,{name:"湖泊实例管理",view:"InstanceView",add:"InstanceAdd",watch:"InstanceWatch",sname:"湖泊",neoId:"8b5c7f66-395f-4349-a487-88969f3fdda9"}
              ,{name:"测站本体管理",view:"OtherOnto",add:"OntoAdd",watch:"OntoWatch",sname:"测站",neoId:"951327b1-2539-4d3b-9e82-48a8cb4ec412"}
              ,{name:"测站实例管理",view:"InstanceView",add:"InstanceAdd",watch:"InstanceWatch",sname:"测站",neoId:"951327b1-2539-4d3b-9e82-48a8cb4ec412"}
              ,{name:"方案本体管理",view:"OtherOnto",add:"OntoAdd",watch:"OntoWatch",sname:"方案",neoId:"0a8ec04e-7ed5-4eaf-9c3b-009c89984429"}
              ,{name:"方案实例管理",view:"InstanceView",add:"InstanceAdd",watch:"InstanceWatch",sname:"方案",neoId:"0a8ec04e-7ed5-4eaf-9c3b-009c89984429"}
              ,{name:"水库本体管理",view:"OtherOnto",add:"OntoAdd",watch:"OntoWatch",sname:"水库",neoId:"3569a2ec-66d7-484e-a3d7-7b521b4b4bbc"}
              ,{name:"水库实例管理",view:"InstanceView",add:"InstanceAdd",watch:"InstanceWatch",sname:"水库",neoId:"3569a2ec-66d7-484e-a3d7-7b521b4b4bbc"}
              ,{name:"本体管理",view:"OntoView",add:"OntoAdd",watch:"OntoWatch",sname:"本体管理",neoId:"0000"}
              ,{name:"实例管理",view:"InstanceView",add:"InstanceAdd",watch:"InstanceWatch",sname:"实例管理",neoId:"0000"}]
    },
      
      handleSizeChange(val) {
                  console.log(`每页 ${val} 条`);
                  this.currentPage = 1;
                  this.pageSize = val;
                  this.start=(this.currentPage-1)*this.pageSize;
                  this.end=this.start+this.pageSize;
                  console.log(this.start);
                  console.log(this.end);
          
                },
                //当前页改变时触发 跳转其他页
                handleCurrentChange(val) {
                  console.log(`当前页: ${val}`);
                  this.currentPage = val;
                  this.start=(val-1)*this.pageSize;
                  this.end=this.start+this.pageSize;
                  console.log(this.start);
                  console.log(this.end);
                  
                },
      

    }

  }


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
