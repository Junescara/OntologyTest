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
    console.log("此时的node为",node)
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
    }
  }
}
