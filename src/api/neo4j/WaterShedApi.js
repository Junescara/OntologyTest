import request from "../../utils/request";

/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/3 16:18
 * @description：
 * @modified By：
 * @version:     1.0
 */

export default {
  //获取行政区划节点的名称
  getWaterShedNames() {
    return request({
      url: `/kg/instance/watershed/watershedName`,
      method: 'get'
    })
  },
  //根据名称查询行政区划节点
  getWaterShedByName(watershedName) {
    return request({
      url: `/kg/instance/watershed/watershedByName`,
      method: 'get',
      params:{watershedName}
    })
  },
  getWaterShedContainsName(key) {
    return request({
      url: `/kg/instance/watershed/watershedContansName`,
      method: 'get',
      params: {watershedNameKey: key}
    })
  }
}
