/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/3 15:33
 * @description：ToDo
 * @modified By：
 * @version:     1.0
 */

import request from "../../utils/request";

export default {
  //获取水闸节点的名称
  getWaterGateNames(db) {
    return request({
      url: `/kg/instance/waterGate/waterGateName?database=`+db,
      method: 'get',
    })
  },
  //根据名称查询水闸节点
  getWaterGateByName(waterGateName,db) {
    return request({
      url: `/kg/instance/waterGate/waterGateByName`,
      method: 'get',
      params:{waterGateName,database:db}
    })
  },
  getWaterGateContainsName(key,db) {
    return request({
      url: `/kg/instance/waterGate/waterGateContainsName`,
      method: 'get',
      params: {waterGateNameKey: key,database:db}
    })
  }
}
