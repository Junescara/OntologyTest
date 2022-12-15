/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/3 15:23
 * @description：水库api
 * @modified By：
 * @version:     1.0
 */
//行政区划接口
import request from '@/utils/request'
export default {
  //获取行政区划节点的名称
  getReservoirNames() {
    return request({
      url: `/kg/instance/reservoir/reservoirName`,
      method: 'get'
    })
  },
  //根据名称查询行政区划节点
  getReservoirByName(reservoirName) {
    return request({
      url: `/kg/instance/reservoir/reservoirByName`,
      method: 'get',
      params:{reservoirName}
    })
  },
  getReservoirContainsName(key) {
    return request({
      url: `/kg/instance/reservoir/reservoirByNameKey`,
      method: 'get',
      params: {reservoirNameKey: key}
    })
  }
}
