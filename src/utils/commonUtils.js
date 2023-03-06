/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/5 14:44
 * @description：通用工具类
 * @modified By：
 * @version:     1.0
 */

export default {
  /**
   * 深拷贝
   * @param obj
   * @returns {any}
   */
  deepClone(obj) {
    var _obj = JSON.stringify(obj) //  对象转成字符串
    var objClone = JSON.parse(_obj) //  字符串转成对象
    return objClone
  },
  /**
   * 从返回类中提取出实体对象，并且给实体类添加属性显式标注类型
   * @param node
   * @returns {boolean|*|string|{}}
   */
  getNodeByType(node){
    let nodeItem = {}
    console.log("DDD此时的node为",node)
    if (node.nodeType.indexOf('行政区划') >= 0){
      nodeItem = node.regionalism
      nodeItem['nodeType'] = '行政区划'
      return nodeItem
    }else if (node.nodeType.indexOf('断面') >= 0){
      nodeItem = node.section
      nodeItem['nodeType'] = '断面'
      return nodeItem
    }else if (node.nodeType.indexOf('测站') >= 0){
      nodeItem = node.station
      nodeItem['nodeType'] = '测站'
      return nodeItem
    }else if (node.nodeType.indexOf('水库') >= 0){
      nodeItem = node.reservoir
      nodeItem['nodeType'] = '水库'
      return nodeItem
    }else if (node.nodeType.indexOf('水闸') >= 0){
      nodeItem = node.waterGate
      nodeItem['nodeType'] = '水闸'
      return nodeItem
    }else if (node.nodeType.indexOf('河流') >= 0){
      nodeItem = node.river
      nodeItem['nodeType'] = '河流'
      return nodeItem
    }else if (node.nodeType.indexOf('流域') >= 0){
      nodeItem = node.watershed
      nodeItem['nodeType'] = '流域'
      return nodeItem
    }else if (node.nodeType.indexOf('对象本体') >= 0){
      nodeItem = node.ontologyObj
      nodeItem['nodeType'] = '对象本体'
      return nodeItem
    }else if (node.nodeType.indexOf('属性本体') >= 0){
      nodeItem = node.ontologyProp
      nodeItem['nodeType'] = '属性本体'
      return nodeItem
    }else if (node.nodeType.indexOf('流域雨量站') >= 0){
      nodeItem = node.rainfallStation
      nodeItem['nodeType'] = '流域雨量站'
      return nodeItem
    }else if (node.nodeType.indexOf('河段') >= 0){
      nodeItem = node.reach
      nodeItem['nodeType'] = '河段'
      return nodeItem
    }
  }
}
