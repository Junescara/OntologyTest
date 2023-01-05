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
   * 创建格式化边数据集(本体对象专用)
   * @param rels
   */
  createRelsEdgesForOntoObj(rels) {
    let linkList = []
    for (let item of rels) {
      //这里用结点的name属性来指定关系边的头尾
      let linkItem = {
        from: item.start.toString(),
        to: item.end.toString(),
        label: item.relList[0]
      }

      linkList.push(linkItem)
    }
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
    let k = 0
    for (let item of nodes) {

      let node = CommonUtils.getNodeByType(item)

      if (node._id !=startId){
        let isStart = false;
        let nodeItem = this.switchNodeToItem(node,isStart)
        if(!nodeList.includes(nodeItem)){
          nodeList.push(nodeItem)
        }
      } else {
        let isStart = true;
        let nodeItem = this.switchNodeToItem(node,isStart)
        if(k===0){
          nodeList.push(nodeItem)
          k = 1;
        }
        console.log("result",!nodeList.includes(nodeItem))
      }
    }

    console.log("nodeList",nodeList)
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
   * 将河对象本体转换为存入datalist的对象元素
   * @param node
   * @param isStart
   */
  createOntologyObjItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.objName,
        level:1,
        titel:'我是头结点！'
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.objName,
        level:2,
        titel:'我是尾结点！'
      }
      return nodeItem
    }
  },
  /**
   * 将属性本体转换为存入datalist的对象元素
   * @param node
   * @param isStart
   */
  createOntologyPropItem(node,isStart){
    if (isStart){
      let nodeItem = {
        id:node._id,
        label:node.propName,
        level:1
      }
      return nodeItem
    }else {
      let nodeItem = {
        id:node._id,
        label:node.propName,
        level:2
      }
      return nodeItem
    }
  },
  /**
   * 为本体总览创建格式化点数据集
   * @param nodes
   * @returns {*[]}
   */
  createNodesForOntology(nodes) {
    let nodeList = []
    for (let node of nodes) {
      let nodeItem = {
        id:node._id,
        label:node.objName,
        level:1
      }
      nodeList.push(nodeItem)
    }
    return new Vis.DataSet(nodeList)
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
    }else if (node.nodeType == '对象本体'){
      return this.createOntologyObjItem(node,isStart)
    }else if (node.nodeType == '属性本体'){
      return this.createOntologyPropItem(node,isStart)
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
   * 处理生成包括入边完整图像的数据
   * @param data
   * @returns {{nodes: (*[]|[]|*), edges: ([]|*)}}
   */
  handleInVisibles(data){
    let rels = []
    let nodes = []

    //老版本的生成机制，仅仅只有起点的情况下
    rels = data.data.relationShips.relationList
    nodes = data.data.startNodes.nodeList
    let endNode = data.data.endNode
    nodes.push(endNode)
    // console.log("此时的startNode",startNode)

    const datas = {
      nodes:this.createNodes(nodes,CommonUtils.getNodeByType(endNode)._id),
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
  setVisibleOption(type){
    if (type != 4){
      //非流域概化图的显示设置
      const option = {
        autoResize: true, // 默认true,自动调整容器的大小
        height: '100%', // 默认值
        width: '100%',  // 默认值
        locale: 'cn',   // 选择语言，默认英文en，cn为汉语
        locales: {      // 语言格式化对象
          cn: {
            edit: '编辑',
            del: '删除',
            back: '返回',
            addNode: '添加节点',
            addEdge: '添加连线',
            editNode: '编辑节点',
            editEdge: '编辑连线',
            addDescription: '点击空白区域添加节点',
            edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
            editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
            createEdgeError: 'Cannot link edges to a cluster.',
            deleteClusterError: 'Clusters cannot be deleted.',
            editClusterError: 'Clusters cannot be edited.',
          },
        },
        // 配置模块
        configure: {
          enabled: false, // false时不会在界面上出现各种配置项
        },
        // 节点模块
        nodes: {
          chosen: true, // 对选择节点做出反应
          shape: "circle",
          color: {
            border: '#2B7CE9',
            background: '#97C2FD',
            highlight: {
              border: '#2B7CE9',
              background: '#FFEC8B'
            },
            hover: {
              border: '#2B7CE9',
              background: '#FFC125'
            }
          },
          font: {
            align: 'left',
            color: '#171615',
            size: 12
            // vadjust: 10, // 标签文本的垂直位置，值越大离节点越远
          },
          labelHighlightBold: false,
          // hidden: true, // 为true不会显示节点。但仍是物理模拟的一部分
          // shape: 'image',
          // image: {    // 路径问题要注意，一定要存储在静态文件夹中
          //   unselected: '/static/images/icon_normal.svg',
          //   selected: '/static/images/icon_selected.svg',
          // },
          size: 40, // 节点大小
          // physics: false, // 关闭物理引擎
          title: '实体', // 用户悬停在节点上时显示的标题,可以是HTML元素或包含纯文本或HTML的字符串
          widthConstraint: { // 节点的最小宽度与最大宽度
            // maximum: 100,
          }
        },
        // 边模块
        edges: {
          // label: '哈哈哈',
          width: 2,
          length: 260,
          // physics: false,
          font: {
            //字体配置
            size: 25
          },
          shadow: true,
          smooth: {
            enabled: true,
            type: 'dynamic', // 平滑曲线的类型
            forceDirection: 'horizontal' // 用于分层布局的配置项,可选值有: ['horizontal', 'vertical', 'none']
          },
          arrows: {to: true} //箭头指向to
          // arrows: {  // 这里可以用来自定义箭头，type为image类型即可
          // middle: { enabled: true, type: 'image', imageHeight: 12, imageWidth: 12, src: getOpticalRed() }
          // },
        },
        // 交互模块
        interaction: {
          hover: true, // 启用鼠标悬停
          hoverConnectedEdges: false, // 鼠标悬停在节点上时，与其连接的边不高亮显示
          hideEdgesOnDrag: false, // true时拖动视图时不会绘制边。这会加快拖动时的响应速度
          hideNodesOnDrag: false, // true时拖动视图时不会绘制节点
          navigationButtons: true,
          selectConnectedEdges: false, // 选中节点时，与其连接的边不高亮
          multiselect: false, // true时长时间单击（或触摸）以及控件单击将添加到选择中
          tooltipDelay: 100,
        },
        // 可视化操作: 没起作用，不知道是不是版本的问题
        manipulation: {
          enabled: false,
          initiallyActive: true,
          addNode: true,
          addEdge: true,
          // editNode: undefined,
          editEdge: true,
          deleteNode: true,
          deleteEdge: true,
          controlNodeStyle:{
            // all node options are valid.
          }
        },
        // 物理引擎
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -5000, //斥力
            centralGravity: 0.3,
            springLength: 220, //弹簧长度
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0
          },
          maxVelocity: 50,
          minVelocity: 1,
          stabilization: {
            iterations: 500, // 最大迭代次数
            enabled: true,
            // fit: true,
            fit: false,   // 值为false时，点击刷新后可回到刷新前的页面
          },
        },
        // 布局
        layout: {
          randomSeed: 2000,
          // hierarchical: {
          //   enabled: true,
          //   levelSeparation: 100, // 层级之间的距离,太小的话箭头会盖住标签字
          //   nodeSpacing: 100,     // 节点之间的距离
          //   treeSpacing: 100,     // 树之间的距离
          //   sortMethod: 'directed',
          // },
        },
      }
      return option
    }else {
      const option = {
        autoResize: true, // 默认true,自动调整容器的大小
        height: '100%', // 默认值
        width: '100%',  // 默认值
        locale: 'cn',   // 选择语言，默认英文en，cn为汉语
        locales: {      // 语言格式化对象
          cn: {
            edit: '编辑',
            del: '删除',
            back: '返回',
            addNode: '添加节点',
            addEdge: '添加连线',
            editNode: '编辑节点',
            editEdge: '编辑连线',
            addDescription: '点击空白区域添加节点',
            edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
            editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
            createEdgeError: 'Cannot link edges to a cluster.',
            deleteClusterError: 'Clusters cannot be deleted.',
            editClusterError: 'Clusters cannot be edited.',
          },
        },
        // 配置模块
        configure: {
          enabled: false, // false时不会在界面上出现各种配置项
        },
        // 节点模块
        nodes: {
          chosen: true, // 对选择节点做出反应
          shape: "circle",
          color: {
            border: '#2B7CE9',
            background: '#97C2FD',
            highlight: {
              border: '#2B7CE9',
              background: '#FFEC8B'
            },
            hover: {
              border: '#2B7CE9',
              background: '#FFC125'
            }
          },
          font: {
            align: 'left',
            color: '#171615',
            size: 12
            // vadjust: 10, // 标签文本的垂直位置，值越大离节点越远
          },
          labelHighlightBold: false,
          // hidden: true, // 为true不会显示节点。但仍是物理模拟的一部分
          // shape: 'image',
          // image: {    // 路径问题要注意，一定要存储在静态文件夹中
          //   unselected: '/static/images/icon_normal.svg',
          //   selected: '/static/images/icon_selected.svg',
          // },
          size: 40, // 节点大小
          physics: false, // 关闭物理引擎
          title: `
                  实时水位：1000m
                  警戒水位：1050m
                  保证水位：1080m
                  `, // 用户悬停在节点上时显示的标题,可以是HTML元素或包含纯文本或HTML的字符串
          widthConstraint: { // 节点的最小宽度与最大宽度
            // maximum: 100,
          }
        },
        // 边模块
        edges: {
          // label: '哈哈哈',
          width: 2,
          length: 150,
          physics: false,
          font: {
            //字体配置
            size: 25
          },
          shadow: true,
          smooth: {
            enabled: true,
            type: 'dynamic', // 平滑曲线的类型
            forceDirection: 'none' // 用于分层布局的配置项,可选值有: ['horizontal', 'vertical', 'none']
          },
          arrows: {to: true} //箭头指向to
          // arrows: {  // 这里可以用来自定义箭头，type为image类型即可
          // middle: { enabled: true, type: 'image', imageHeight: 12, imageWidth: 12, src: getOpticalRed() }
          // },
        },
        // 交互模块
        interaction: {
          hover: true, // 启用鼠标悬停
          hoverConnectedEdges: false, // 鼠标悬停在节点上时，与其连接的边不高亮显示
          hideEdgesOnDrag: false, // true时拖动视图时不会绘制边。这会加快拖动时的响应速度
          hideNodesOnDrag: false, // true时拖动视图时不会绘制节点
          navigationButtons: true,
          selectConnectedEdges: false, // 选中节点时，与其连接的边不高亮
          multiselect: false, // true时长时间单击（或触摸）以及控件单击将添加到选择中
          tooltipDelay: 100,
        },
        // 可视化操作: 没起作用，不知道是不是版本的问题
        manipulation: {
          enabled: false,
          initiallyActive: true,
          addNode: true,
          addEdge: true,
          // editNode: undefined,
          editEdge: true,
          deleteNode: true,
          deleteEdge: true,
          controlNodeStyle:{
            // all node options are valid.
          }
        },
        // 物理引擎
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -5000, //斥力
            centralGravity: 0.3,
            springLength: 220, //弹簧长度
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0
          },
          maxVelocity: 50,
          minVelocity: 1,
          stabilization: {
            iterations: 500, // 最大迭代次数
            enabled: true,
            // fit: true,
            fit: false,   // 值为false时，点击刷新后可回到刷新前的页面
          },
        },
        // 布局
        layout: {
          randomSeed: 0,
          // hierarchical: {
          //   enabled: true,
          //   levelSeparation: 100, // 层级之间的距离,太小的话箭头会盖住标签字
          //   nodeSpacing: 100,     // 节点之间的距离
          //   treeSpacing: 100,     // 树之间的距离
          //   sortMethod: 'directed',
          // },
        },
      }
      return option
    }
  }

}
