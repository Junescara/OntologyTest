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
            <el-descriptions-item label="实体数量/个">
              <el-tag size="small">{{ nodeCounts }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="实体类型数量/个">
              <el-tag size="small">{{ nodeTypeCounts }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
    </el-card>
    <div style="display: flex">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>知识库管理</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
              <el-input placeholder="请搜索实体名称" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"/>
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
              <el-input placeholder="请搜索关系名称" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"/>
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
            >
              {{ item }}
            </el-tag>
          </div>
          <div class="tag-group" v-if="number === 1">
            <span class="tag-group__title"></span>
            <!--以下标签用于显示查询出来的节点名称-->
            <el-tag
              v-for="(item,index) in relNames"
              :key=index
              type=''
              effect="plain"
              >
              {{ item }}
            </el-tag>
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
        <KGVisibleEcahrts :current-node="nodeByName"></KGVisibleEcahrts>
      </el-card>
      <el-card class="box-card" style="width: 400px">
        <div slot="header" class="clearfix">
          <span>实体类信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
      </el-card>
    </div>
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
export default {
  name: 'KGInstance',
  components: {KGVisibleEcahrts, KGVisible},
  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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
      //记录下拉菜单索引
      number: 0,
      //记录通过名称查询出来的节点
      nodeByName: null,
      relBYName:null,
      currentType: null,
      currentRelType:null,
    }
  },
  mounted() {
    console.log('instance挂载了')
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
            }
          })
          console.log("relnames++++++",this.relNames)
          break;
        case '关联':
          this.currentRelType = '关联'
          stationApi.getStationNames()
            .then((response) => {
              this.nodeNames = response.data.data.stationNames
            })
            .catch((error) => {
              console.log(error);
            });
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
    //根据名称查询行政规划节点
    getRegionalismNodeByName(regionalismName) {
      regionalismApi.getRegionalismByName(regionalismName)
        .then((response) => {
          this.nodeByName = response.data.data.result
          console.log(this.nodeByName)
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
