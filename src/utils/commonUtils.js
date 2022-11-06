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
  }
}
