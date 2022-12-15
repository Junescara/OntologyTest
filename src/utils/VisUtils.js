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

  createRelsEdgesV2(rels) {
    let linkList = []
    console.log("此时的rels为=============",rels)
    for (let item of rels) {
      //这里用结点的name属性来指定关系边的头尾
      let linkItem = {
        from: item.start.toString(),
        to: item.end.toString(),
        label: item.relName
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
  },
  /**
   * 处理生成包括出边和入边完整图像的数据
   * @param data
   * @returns {{nodes: *, edges: ([]|*)}}
   */
  handleWholeVisibles(data){
    let rels = []
    let nodes = []

    //首先获取出边数据
    for (let rel of data.data.kgVisibleOutVoList[0].relationShips.relationList){
      rels.push(rel)
    }
    //获取入边数据
    for (let rel of data.data.kgVisibleInVoList[0].relationShips.relationList){
      rels.push(rel)
    }
    //获取结点集
    //首先要维护一个集合，用于结点id去重
    let idSet = new Set()

    for (let item of data.data.kgVisibleOutVoList[0].endNodes.nodeList){
      let id = CommonUtils.getNodeByType(item)._id
      if (idSet.has(id)){
        //如果idset中包含这个元素,则无需再结点集中添加这个元素
        continue;
      }else{
        //idset中不包含这个元素，添加进结点集
        idSet.add(id)
        nodes.push(CommonUtils.getNodeByType(item))  //直接存入提取过的node
      }
    }

    for (let item of data.data.kgVisibleInVoList[0].startNodes.nodeList){
      let id = CommonUtils.getNodeByType(item)._id
      if (idSet.has(id)){
        //如果idset中包含这个元素,则无需再结点集中添加这个元素
        continue;
      }else{
        //idset中不包含这个元素，添加进结点集
        idSet.add(id)
        nodes.push(CommonUtils.getNodeByType(item))  //直接存入提取过的node
      }
    }

    //最后加入起点（终点）
    nodes.push(CommonUtils.getNodeByType(data.data.kgVisibleOutVoList[0].startNode))
    idSet.add(CommonUtils.getNodeByType(data.data.kgVisibleOutVoList[0].startNode)._id)

    //封装最终生成数据的数据集
    const datas = {
      nodes:this.createNodesV2(nodes),
      edges:this.createRelsEdges(rels)
    }

    return datas
  },

  /**
   * 处理生成包括出边完整图像的数据
   * @param data
   * @returns {{nodes: *, edges: ([]|*)}}
   */
  handleOutVisibles(data){
    let rels = []
    let nodes = []

    //老版本的生成机制，仅仅只有起点的情况下
    rels = data.data.relationShips.relationList
    nodes = data.data.endNodes.nodeList
    let startNode = data.data.startNode
    nodes.push(startNode)
    // console.log("此时的startNode",startNode)

    const datas = {
      nodes:this.createNodes(nodes,CommonUtils.getNodeByType(startNode)._id),
      edges:this.createRelsEdges(rels)
    }

    return datas
  },

  /**
   * 处理生成包括出边完整图像的数据
   * @param data
   * @returns {{nodes: *, edges: ([]|*)}}
   */
  handleRelLinkVisibles(data){
    let rels = []
    let nodes = []

    //首先获取出边数据
    for (let rel of data.data.relationItems){
      rels.push(rel)
    }

    //获取结点集
    //首先要维护一个集合，用于结点id去重
    let idSet = new Set()

    for (let item of data.data.finalNodeVos){
      let id = CommonUtils.getNodeByType(item)._id
      if (idSet.has(id)){
        //如果idset中包含这个元素,则无需再结点集中添加这个元素
        continue;
      }else{
        //idset中不包含这个元素，添加进结点集
        idSet.add(id)
        nodes.push(CommonUtils.getNodeByType(item))  //直接存入提取过的node
      }
    }

    //封装最终生成数据的数据集
    const datas = {
      nodes:this.createNodesV2(nodes),
      edges:this.createRelsEdgesV2(rels)
    }

    return datas
  },

}
