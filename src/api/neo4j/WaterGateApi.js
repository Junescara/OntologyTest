/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/3 15:33
 * @description：ToDo
 * @modified By：
 * @version:     1.0
 */

import request from "../../utils/request";

export default {
  //获取行政区划节点的名称
  getWaterGateNames() {
    return request({
      url: `/kg/instance/waterGate/waterGateName`,
      method: 'get'
    })
  },
  //根据名称查询行政区划节点
  getWaterGateByName(waterGateName) {
    return request({
      url: `/kg/instance/waterGate/waterGateByName`,
      method: 'get',
      params:{waterGateName}
    })
  },
}
