/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/2 18:37
 * @description：vis-network工具类
 * @modified By：
 * @version:     1.0
 */

import Vis from "vis-network/dist/vis-network.min"
import CommonUtils from "./commonUtils";
import th from "element-ui/src/locale/lang/th";
export default {

  /**
   * 创建格式化边数据集
   * @param rels
   */
  createRelsEdges(rels) {
    let linkList = []
    console.log("此时的rels为=============",rels)
    for (let item of rels) {
      //这里用结点的name属性来指定关系边的头尾
      let linkItem = {
        from: item.start.toString(),
        to: item.end.toString(),
        label: item.relList[0]
      }

      linkList.push(linkItem)
    }

    return new Vis.DataSet(linkList)
  },

  /**
   * 创建格式化点数据集
   * @param nodes
   * @param startId
   * @returns {*[]}
   */
  createNodes(nodes,startId) {
    let nodeList = []
    for (let item of nodes) {

      let node = CommonUtils.getNodeByType(item)

      if (node._id !=startId){
        let isStart = false;
        let nodeItem = this.switchNodeToItem(node,isStart)
        nodeList.push(nodeItem)
      } else {
        let isStart = true;
        let nodeItem = this.switchNodeToItem(node,isStart)
        nodeList.push(nodeItem)
      }
    }
    return new Vis.DataSet(nodeList)
  },
  /**
   * 直接利用转换好的结点生成vis的结点数据集
   * @param nodes
   * @returns {*}
   */
  createNodesV2(nodes) {
    let nodeList = []
    for (let item of nodes) {
      let nodeItem = this.switchNodeToItem(item,false)
      nodeList.push(nodeItem)
    }
    return new Vis.DataSet(nodeList)
  },
  /**
   * 将断面结点转换为存入datalist的对象元素
   * @param node
   * @param isStart 是否是起点
   */
  createSectionItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.sectionName,
        level:1
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.sectionName,
        level:2
      }
      return nodeItem
    }
  },
  /**
   * 将测站结点转换为存入datalist的对象元素
   * @param node
   * @param isStart
   * @returns {{level: number, id: *, label}}
   */
  createStationItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:1
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:2
      }
      return nodeItem
    }
  },
  /**
   * 将行政区划结点转换为存入datalist的对象元素
   * @param node
   * @param isStart
   */
  createRegionalismItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:1
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:2
      }
      return nodeItem
    }
  },
  /**
   * 将水库结点转换为存入datalist的对象元素
   * @param node
   * @param isStart
   * @returns {{level: number, id: *, label: *}}
   */
  createReservoirItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.reservoirName,
        level:1
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.reservoirName,
        level:2
      }
      return nodeItem
    }
  },
  /**
   * 将水闸结点转换为存入datalist的对象元素
   * @param node
   * @param isStart
   * @returns {{level: number, id: *, label}}
   */
  createWaterGateItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:1
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:2
      }
      return nodeItem
    }
  },
  /**
   * 将流域结点转换为存入datalist的对象元素
   * @param node
   * @param isStart
   */
  createWaterShedItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:1
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:2
      }
      return nodeItem
    }
  },
  /**
   * 将河流结点转换为存入datalist的对象元素
   * @param node
   * @param isStart
   */
  createRiverItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:1
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.name,
        level:2
      }
      return nodeItem
    }
  },
  /**
   * 将无类型的node存入dataList
   * @param node
   * @param isStart
   */
  switchNodeToItem(node,isStart){
    if (node.nodeType == '行政区划'){
      return this.createRegionalismItem(node,isStart)
    }else if (node.nodeType == '断面'){
      return this.createSectionItem(node,isStart)
    }else if (node.nodeType == '测站'){
      return this.createStationItem(node,isStart)
    }else if (node.nodeType == '河流'){
      return this.createRiverItem(node,isStart)
    }else if (node.nodeType == '流域'){
      return this.createWaterShedItem(node,isStart)
    }else if (node.nodeType == '水闸'){
      return this.createWaterGateItem(node,isStart)
    }else if (node.nodeType == '水库'){
      return this.createReservoirItem(node,isStart)
    }
  }


}
