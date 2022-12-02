<!--
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/2 12:53
 * @description：图谱实例详情组件
 * @modified By：
 * @version:     1.0
 -->
<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-image
            :src="url"
            :fit="'contain'"
            style="width: 200px; height: 150px"/>
        </el-col>
        <el-col :span="6">
          <el-descriptions :column="2" title="图谱信息">
            <el-descriptions-item label="数据库名称">
              <el-tag size="small">{{ kgInfo.dbName }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="数据库id">
              <el-tag size="small">{{ kgInfo.dbId }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="实体数量/个">
              <el-tag size="small">{{ nodeCounts }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="实体类型数量/个">
              <el-tag size="small">{{ nodeTypeCounts }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" plain style="margin-bottom: 20px;margin-left: 10px" @click="visibles.dialogVisible = true">导入文件</el-button>
        </el-col>
      </el-row>
    </el-card>
    <div style="display: flex">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>知识库管理</span>
          <el-button @click="addObjVisible = true" style="float: right; padding-top: 1px" type="text">增加</el-button>
        </div>
        <div>
          <el-button @click="change(0)">实体</el-button>
          <el-button @click="change(1)">关系</el-button>
          <!--以下为实体的下拉菜单-->
          <div v-show="0===number">
            <el-select v-show="0===number" clearable @clear="clear" @change="chooseEntity" v-model="nodeLabels.index" placeholder="请选择实体类型"
                       style="margin-top: 20px">
              <el-option
                v-for="(item,index) in nodeLabels"
                :key=index
                :label=item
                :value=item
              />
            </el-select>
            <div style="margin-top: 15px;">
              <el-input placeholder="请搜索实体名称" class="input-with-select" v-model="key.nodeKey">
                <el-button slot="append" icon="el-icon-search" @click="getNodeContainsName"/>
              </el-input>
            </div>
          </div>
          <!--以下为关系的下拉菜单-->
          <div v-show="1===number">
            <el-select clearable v-model="relLabels.index" placeholder="请选择关系类型" @change="chooseRelation"
                       style="margin-top: 20px">
              <el-option
                v-for="(item,index) in relLabels"
                :key=index
                :label=item
                :value=item
              />
            </el-select>
            <div style="margin-top: 15px;">
              <el-input placeholder="请搜索关系名称" class="input-with-select" v-model="key.relNodeKey">
                <el-button slot="append" icon="el-icon-search" @click="getRelsContainsNodeName"/>
              </el-input>
            </div>
          </div>

          <div class="tag-group" v-if="number === 0">
            <span class="tag-group__title"></span>
            <!--以下标签用于显示查询出来的节点名称-->
            <el-tag
              v-for="(item,index) in nodeNames"
              :key=index
              type=''
              effect="plain"
              @click="getNodeByName(item)"
            >
              {{ item }}
            </el-tag>
          </div>
          <div class="tag-group infinite-list-wrapper" v-if="number === 1"  style="overflow: auto;height: calc(100vh - 72px)">
            <span class="tag-group__title"></span>
            <!--以下标签用于显示查询出来的关系名称-->
            <ui v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-distance="1" class="list">
              <li v-for="(item,index) in relNamesLazy"
                  :key=index
                  effect="plain"
                  style="list-style:none"
                  >
                <el-tag
                  type=''
                  @click="getRelByName(item)">
                  {{ item }}
                </el-tag>
              </li>
            </ui>
            <p v-if="flags.loadingFlag" style="text-align: center">加载中...</p>
            <p v-if="noMore" style="text-align: center">没有更多了</p>
          </div>
        </div>
      </el-card>
      <el-card class="box-card-2">
        <div slot="header" class="clearfix">
          <span>知识图谱</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <!--        <el-empty description="描述文字"></el-empty>-->
<!--        <KGVisible/>-->
<!--        <KGVisibleEcahrts :current-node="nodeByName"></KGVisibleEcahrts>-->
        <KGVisibleVisNetwork :current-node="nodeByName"></KGVisibleVisNetwork>
      </el-card>
      <el-card class="box-card" style="width: 400px">
        <div slot="header" class="clearfix">
          <span>实体类信息</span>
          <el-button @click="editObjVisible = true" style="float: right; padding-top: 1px; margin-left: 6px " type="text">修改</el-button>
          <el-button @click="delObject" style="float: right; padding-top: 1px " type="text">删除</el-button>
        </div>
        <el-descriptions :column="1">
          <el-descriptions-item label="实体所属类型">
            <el-tag size="small">水库</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="更新时间">2022.11.2</el-descriptions-item>
        </el-descriptions>
        <el-divider/>
        <!--以下为实体属性的表格-->
        <el-descriptions v-for="(item,index) in nodeByName" class="margin-top" title="实体属性" :key="index" :column="1" border>
          <el-descriptions-item label="属性名">属性值</el-descriptions-item>
          <el-descriptions-item v-for="(proVals,proNames) in item" :label="proNames" :key="proNames">
            {{proVals}}
          </el-descriptions-item>
        </el-descriptions>

        <!--以下为关系属性的表格-->
        <el-descriptions v-for="(item,index) in relByName" class="margin-top" title="关系属性" :key="index" :column="1" border>
          <el-descriptions-item label="属性名">属性值</el-descriptions-item>
          <el-descriptions-item label="起点">
            {{item[0]}}
            <el-button type="primary" plain size="mini" style="float: right">查看详情</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="关系">
            {{item[1]}}
          </el-descriptions-item>
          <el-descriptions-item label="终点">
            {{item[2]}}
            <el-button type="primary" plain size="mini" style="float: right">查看详情</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <!--以下为修改实例卡片-->
      <el-dialog
        title="修改实例"
        :visible.sync="editObjVisible"
        width="50%"
        center>
        <el-form :label-position="labelPosition" :model="formLabelAlign">
          <el-form-item label-width="120px" v-for="(proVals,proNames) in editNodeInfo.editNodeAtts" :label="proNames">
            <el-input size="medium" :placeholder="proVals" v-model="editNodeInfo.editNodeAtts[proNames]"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editObjVisible = false">取 消</el-button>
          <el-button type="primary" @click="editObiect">确 定</el-button>
        </span>
      </el-dialog>

      <!--以下为增加实例卡片-->
      <el-dialog
        title="增加实例"
        :visible.sync="addObjVisible"
        width="25%"
        center>
        <el-form :model="InstanceForm" class="demo-form-inline">
          <el-form-item label="请选择需要增加的实例类型" prop="name">
            <el-cascader
              v-model="InstanceForm.types"
              :options="addOptions"
              :props="{ expandTrigger: 'hover' }"
              style="margin-left: 6px "
              @change="chooseAddAtts"></el-cascader>
          </el-form-item>
          <el-form-item
            v-for="(domain) in InstanceForm.attributes"
            :label="domain.name"
            :key="domain.key"
            :prop="domain.key">
            <el-input v-model="domain.value"></el-input>
          </el-form-item>
        </el-form>


        <span slot="footer" class="dialog-footer">
    <el-button @click="addObjVisible = false">取 消</el-button>
    <el-button type="primary" @click="addObject">确 定</el-button>
  </span>
      </el-dialog>

    </div>

    <el-dialog
      title="上传文件"
      :visible.sync="visibles.dialogVisible"
      width="50%">
      <KGUploadFile></KGUploadFile>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibles.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="visibles.dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import KGVisible from './KGVisible'
import aggregateApi from '@/api/neo4j/aggregate';
import regionalismApi from '@/api/neo4j/regionalism';
import sectionApi from '@/api/neo4j/section';
import stationApi from '@/api/neo4j/station';
import KGVisibleEcahrts from "./KGVisibleEcahrts";
import relationApi from "../../../../api/neo4j/relationApi";
import KGUploadFile from "./KGUploadFile";
import KGConnectApi from "../../../../api/neo4j/KGConnectApi";
import KGVisibleVisNetwork from "./KGVisibleVisNetwork";
export default {
  name: 'KGInstance',
  components: {KGVisibleVisNetwork, KGVisibleEcahrts, KGVisible,KGUploadFile},
  props:{
    kgConnectInfo:{
      type:Object,
      default:() => {}
    }
  },
  data() {
    return {
      tempAtt:null,
      //增加实例的相关信息
      InstanceForm: {
        //实例的标签信息
        types:[],
        //实例的属性列表，记录要添加的属性
        attributes:[{
        }]
      },
      //增加、修改实体时用于提交的数据格式
      submitInstance: {
        //实例的标签信息
        types:[],
        //实例的属性列表，记录要添加的属性
        attributes:[]
      },
      //“增加实体或关系”标签选择
      addOptions:[{
        value: '实体',
        label: '实体',
        children: [{
          value: '行政区划',
          label: '行政区划',
        },
          {
            value: '测站',
            label: '测站',
          },
          {
            value: '断面',
            label: '断面',
          }]
      }, {
          value: '关系',
          label: '关系',
          children: [{
            value: '关联',
            label: '关联',
          },
            {
              value: '下级行政区划',
              label: '下级行政区划',
            }]
        }],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      visibles:{
        dialogVisible:false
      },
      //标记类
      flags:{
        relLazyCountFlag:0,
        relLoadingFlag:false,
        loadingFlag:false
      },
      //查询关键字
      key:{
        nodeKey:'',
        relNodeKey:'',
      },
      kgInfo:{

      },
      //记录节点的数量
      nodeCounts: 0,
      //记录节点类型的数量
      nodeTypeCounts: 0,
      //记录节点的标签，用于下拉菜单选择
      nodeLabels: [],
      //记录关系的标签，用于下拉菜单选择
      relLabels: [],
      //记录查询出的节点名称
      nodeNames: [],
      //查询出来的关系组合
      relNames:[],
      //查询出来的关系组合及id
      relNamesAndIds:[],
      //实现懒加载的relNames
      relNamesLazy:[],
      //记录下拉菜单索引
      number: 0,
      //记录通过名称查询出来的节点
      nodeByName: null,
      relByName:null,
      currentType: null,
      currentRelType:null,
      currentId:null,
      currentRelId:null,
      //修改对话框是否开启
      editObjVisible: false,
      //增加对话框是否开启
      addObjVisible: false,
      editNodeInfo:{
        editNodeId:null,
        editNodeAtts:null
      }
    }
  },
  mounted() {
    this.currentId = this.$route.params.id
    console.log('id=======',this.currentId)
    if (this.currentId !== undefined){
      KGConnectApi.getConnectionById(this.currentId).then(({data}) => {
        this.kgInfo = data.data
      })
    }
  },
  created() {
    this.getAllNodeCounts()
    this.getAllNodeLabels()
    this.getAllRelLabels()
  },
  methods: {
    goBack() {
      const data = true
      this.$emit('goBack', data)
    },
    //选择实体菜单
    chooseEntity(value) {
      switch (value) {
        case '行政区划':
          this.currentType = '行政区划'
          regionalismApi.getRegionalismNames()
            .then((response) => {
              this.nodeNames = response.data.data.regionalismNames
              console.log(this.nodeByName)
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '测站':
          this.currentType = '测站'
          stationApi.getStationNames()
            .then((response) => {
              this.nodeNames = response.data.data.stationNames
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case '断面':
          this.currentType = '断面'
          sectionApi.getSectionNames()
            .then((response) => {
              this.nodeNames = response.data.data.sectionNames
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        default:
      }
    },
    //选择关系菜单
    chooseRelation(value) {
      switch (value) {
        case '下级行政区划':
          this.currentRelType = '下级行政区划'
          relationApi.getRelsByName(this.currentRelType).then(({data}) => {
            for (let item of data.data.relationList){
              this.relNames.push(item.pathName);
              let relNameAndId = {
                id:item.id,
                path:item.pathName
              }

              this.relNamesAndIds.push(relNameAndId);
            }
            this.load()
          })
          console.log("relNamesAndIds++++++",this.relNamesAndIds)
          console.log("relnames++++++",this.relNames)
          console.log("relsNamesLazy=====",this.relNamesLazy)
          break;
        case '关联':
          this.currentRelType = '关联'
          relationApi.getRelsByName(this.currentRelType).then(({data}) => {
            for (let item of data.data.relationList){
              this.relNames.push(item.pathName);
              let relNameAndId = {
                id:item.id,
                path:item.pathName
              }

              this.relNamesAndIds.push(relNameAndId);
            }
            this.load()
          })
          console.log("relnames++++++",this.relNames)
          break;
        default:
      }
    },
    //切换下拉菜单
    change(index) {
      this.number = index;
      this.nodeNames = null
      this.nodeByName = null
    },
    //清空查询出来的实体类型
    clear() {
      this.nodeNames = null
      this.nodeByName = null
    },
    getNodeByName(name) {
      if (this.currentType === '行政区划') {
        this.getRegionalismNodeByName(name)
      }
      if (this.currentType === '断面') {
        this.getSectionNodeByName(name)
      }
      if (this.currentType === '测站') {
        this.getStationNodeByName(name)
      }
    },
    getRelByName(name) {
      if (this.currentRelType === '下级行政区划') {

        for(let i in this.relNamesAndIds){
          if(this.relNamesAndIds[i].path === name){
            this.currentRelId = this.relNamesAndIds[i].id;
            break;
          }
        }

        let nameArray = name.split("->")
        this.relByName = [nameArray]
        console.log("relByName=====",this.relByName)
        console.log("currentRelId=====",this.currentRelId)
      }
      if (this.currentRelType === '关联') {

        //业务逻辑
        //TODO
      }
    },
    //根据名称查询行政规划节点
    getRegionalismNodeByName(regionalismName) {
      regionalismApi.getRegionalismByName(regionalismName)
        .then((response) => {
          this.nodeByName = response.data.data.result
          let tmp = JSON.stringify(this.nodeByName[0]);
          this.editNodeInfo.editNodeAtts = JSON.parse(tmp);
          this.editNodeInfo.editNodeId = this.editNodeInfo.editNodeAtts._id
          delete this.editNodeInfo.editNodeAtts._id

          console.log("nodebyname=====",this.nodeByName)
          console.log("editNodeInfo=====",this.editNodeInfo)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //根据名称查询断面节点
    getSectionNodeByName(sectionName) {
      sectionApi.getSectionByName(sectionName)
        .then((response) => {
          this.nodeByName = response.data.data.result
          let tmp = JSON.stringify(this.nodeByName[0]);
          this.editNodeInfo.editNodeAtts = JSON.parse(tmp);
          this.editNodeInfo.editNodeId = this.editNodeInfo.editNodeAtts._id
          delete this.editNodeInfo.editNodeAtts._id
          console.log(this.nodeByName)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //根据名称查询测站节点
    getStationNodeByName(stationName) {
      stationApi.getStationByName(stationName)
        .then((response) => {
          this.nodeByName = response.data.data.result
          let tmp = JSON.stringify(this.nodeByName[0]);
          this.editNodeInfo.editNodeAtts = JSON.parse(tmp);
          this.editNodeInfo.editNodeId = this.editNodeInfo.editNodeAtts._id
          delete this.editNodeInfo.editNodeAtts._id
          console.log(this.nodeByName)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获得所有节点的数量和节点类型的数量
    getAllNodeCounts() {
      aggregateApi.getNodeCounts()
        .then((response) => {
          this.nodeCounts = response.data.data.nodeCounts
          this.nodeTypeCounts = response.data.data.nodeTypeCounts
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获得所有节点的标签
    getAllNodeLabels() {
      aggregateApi.getNodeLabels()
        .then((response) => {
          this.nodeLabels = response.data.data.nodeLabels
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获得所有关系的标签
    getAllRelLabels() {
      aggregateApi.getRelLabels()
        .then((response) => {
          this.relLabels = response.data.data.relLabels
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //增加功能 —— 根据标签选择对应实体或关系的属性
    chooseAddAtts(types){

      //清空属性列表
      this.InstanceForm.attributes = [];

      if(types[0]==="关系"){
        this.InstanceForm.attributes.push({
          key: "startEntityId",
          name: "起始实体id",
          value: ""
        });
        this.InstanceForm.attributes.push({
          key: "endEntityId",
          name: "终止实体id",
          value: ""
        });
      }
      else if(types[1]==="行政区划"){
        this.InstanceForm.attributes.push({
          key: "jurisdiction_num",
          name: "行政区划编码",
          value: ""
        });
        this.InstanceForm.attributes.push({
          key: "jurisdiction",
          name: "行政区划名称（带乡镇）",
          value: ""
        });
        this.InstanceForm.attributes.push({
          key: "jurisdiction_s",
          name: "行政区划名名称",
          value: ""
        });
        this.InstanceForm.attributes.push({
          key: "lgtd",
          name: "经度",
          value: ""
        });
        this.InstanceForm.attributes.push({
          key: "lttd",
          name: "纬度",
          value: ""
        });
        this.InstanceForm.attributes.push({
          key: "class",
          name: "类别",
          value: ""
        });
      }
      else{
        console.log("没有写");
      }

    },
    //修改选定实例
    editObiect(){
      this.submitInstance.attributes = []
      this.submitInstance.types = []
      this.submitInstance.types.push(this.currentType)
      this.submitInstance.attributes.push({
        name:"_id",
        value:this.editNodeInfo.editNodeId
      })
      Object.keys(this.editNodeInfo.editNodeAtts).forEach((key)=>{
        if(this.editNodeInfo.editNodeAtts[key] != "" && this.editNodeInfo.editNodeAtts[key] != null){
          this.submitInstance.attributes.push({
            name: key,
            value: this.editNodeInfo.editNodeAtts[key]
          });
        }
      });
      aggregateApi.editNode(JSON.stringify(this.submitInstance))
        .then(
          (response) => {
            let mes = 'id为' + response.data.data + '的实体修改成功!'
            this.$message({
              type: 'success',
              message: mes
            });
            this.getAllNodeCounts()
            this.getAllNodeLabels()
            this.getAllRelLabels()
          })
        .catch(
          (error) => {
            console.log(error);
          }
        );
      this.editObjVisible = false
    },
    //增加选定实例
    addObject() {
      this.submitInstance.attributes = []
      this.submitInstance.types = []
      this.submitInstance.types.push(this.InstanceForm.types[1]);
      this.InstanceForm.attributes.forEach((item) => {
        if(item.value !== "" && item.value !== null){
          this.submitInstance.attributes.push({
            name: item.name,
            value: item.value
          });
        }
      });
      if(this.InstanceForm.types[0]==="关系"){
        relationApi.addRel(JSON.stringify(this.submitInstance))
        .then(
          (response) => {
            //如果起始实体不存在
            if(response.data.data==-1){
              this.$message({
                type: 'error',
                message: '起始实体不存在!'
              });
            } else if(response.data.data==-2){
              this.$message({
                type: 'error',
                message: '终止实体不存在!'
              });
            }else{
              let mes = 'id为' + response.data.data + '的关系创建成功!'
              this.$message({
                type: 'success',
                message: mes
              });
              this.getAllNodeCounts()
              this.getAllNodeLabels()
              this.getAllRelLabels()
            }
          })
        .catch(
          (error) => {
            console.log(error);
          }
        );
        this.addObjVisible = false
      }
      else if(this.InstanceForm.types[0]==="实体"){

        aggregateApi.addNode(JSON.stringify(this.submitInstance))
        .then(
          (response) => {
            let mes = 'id为' + response.data.data + '的实体创建成功!'
            this.$message({
              type: 'success',
              message: mes
            });
            this.getAllNodeCounts()
            this.getAllNodeLabels()
            this.getAllRelLabels()
          })
        .catch(
          (error) => {
            console.log(error);
          }
        );
        this.addObjVisible = false
      }
      else{
        this.$message({
          type: 'error',
          message: '出错了!'
        });
        this.addObjVisible = false
      }
    },

    //删除选定实例
    delObject(){
      if(JSON.stringify(this.relByName)=="null" && JSON.stringify(this.nodeByName)=="null"){
        //没有选中实例
        this.$message({
          type: 'error',
          message: '请选择要删除的实例!'
        });
      }else if(JSON.stringify(this.nodeByName)!="null" && JSON.stringify(this.relByName)=="null"){
        //选中实体
        this.delNode()
      }else if(JSON.stringify(this.relByName)!="null" && JSON.stringify(this.nodeByName)=="null"){
        //选中关系
        this.delRel()
      }else{
        //出现错误
        this.$message({
          type: 'error',
          message: '出现错误!'
        });
      }

    },
    //删除选定关系
    delRel(){
      relationApi.delRelById(this.currentRelId)
      .then((response) => {
        if(response.data.data==1){
          //删除成功
          this.$message({
            type: 'success',
            message: '删除关系成功!'
          });
          this.getAllNodeCounts()
          this.getAllNodeLabels()
          this.getAllRelLabels()
        }else{
          //删除失败
          this.$message({
            type: 'error',
            message: '删除关系失败!'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    //删除选定实体及关联关系
    delNodeAndRels(){
      aggregateApi.delNodeAndRelsById(this.nodeByName[0]._id)
        .then((response) => {
          if(response.data.data==1){
            //删除成功
            this.$message({
              type: 'success',
              message: '删除实体及关系成功!'
            });
            this.getAllNodeCounts()
            this.getAllNodeLabels()
            this.getAllRelLabels()
          }else{
            //删除失败
            this.$message({
              type: 'error',
              message: '删除实体及关系失败!'
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //删除选定实体
    delNode(){
      aggregateApi.delNodeById(this.nodeByName[0]._id)
      .then((response) => {
        if(response==0){
          //删除成功
          this.$message({
            type: 'success',
            message: '删除实体成功!'
          });
          this.getAllNodeCounts()
          this.getAllNodeLabels()
          this.getAllRelLabels()
        }else{
          const mes = "有"+response.data.data+"条关系与该实体相连，是否一起删除。"
          this.$confirm(mes, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //删除选定实体及关联关系
            this.delNodeAndRels()
            this.getAllNodeCounts()
            this.getAllNodeLabels()
            this.getAllRelLabels()
          }).catch(() => {
            //取消删除
            this.$message({
              type: 'info',
              message: '已取消删除！'
            });
          });
        }
      })
        .catch((error) => {
          console.log(error);
        });
    },
    load(){
      this.flags.relLoadingFlag = true
      this.flags.loadingFlag = true
      setTimeout(() => {
        let origin = this.flags.relLazyCountFlag
        this.flags.relLazyCountFlag = this.flags.relLazyCountFlag + 25
        if (this.flags.relLazyCountFlag < this.relNames.length){
          for (let i = origin; i < this.flags.relLazyCountFlag; i++){
            this.relNamesLazy.push(this.relNames[i])
          }
        }else {
          for (let i = origin; i < this.relNames.length; i++){
            this.relNamesLazy.push(this.relNames[i])
          }
        }
        this.flags.relLoadingFlag = false
        this.flags.loadingFlag = false
      }, 1000)
    },
    getNodeContainsName(){
      if (this.currentType === '行政区划'){
        regionalismApi.getRegionalismContainsName(this.key.nodeKey).then(({data}) => {
          let list = data.data.list
          this.nodeNames = []
          for (let item of list){
            this.nodeNames.push(item.name)
          }
        })
      }
    },
    getRelsContainsNodeName(){
      if (this.currentRelType === '下级行政区划'){
        relationApi.getRelsRegionContainsNodeName(this.key.relNodeKey).then(({data}) => {
          this.relNames = []
          let list = data.data.relationList
          for (let item of list){
            this.relNames.push(item.pathName)
          }
        })
      }
    }
  },
  computed:{
    disabled (){
      console.log("flag+++++",this.flags.relLoadingFlag)
      console.log("nomore+++++",this.noMore)
      return this.flags.relLoadingFlag || this.noMore
    },
    noMore () {
      return this.flags.relLazyCountFlag >= this.relNames.length
    },
  },
  watch:{
    relNames:{
      handler(newValue, oldValue) {
        // this.relNamesLazy = []
        if (oldValue.length > 0){
          this.relNamesLazy = []
          this.flags.relLazyCountFlag = 0
          this.load()
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
。clearfix {
  background-color: #4AB7BD;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 300px;
  height: 100%;
  margin-top: 20px;
  margin-left: 20px;
}

.box-card-2 {
  width: 750px;
  height: 500px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
