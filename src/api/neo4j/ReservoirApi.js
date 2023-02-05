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
  getReservoirNames(db) {
    return request({
      url: `/kg/instance/reservoir/reservoirName`,
      method: 'get',
      params:{database:db}
    })
  },
  //根据名称查询行政区划节点
  getReservoirByName(reservoirName,db) {
    return request({
      url: `/kg/instance/reservoir/reservoirByName`,
      method: 'get',
      params:{reservoirName,database:db}
    })
  },
  getReservoirContainsName(key,db) {
    return request({
      url: `/kg/instance/reservoir/reservoirByNameKey`,
      method: 'get',
      params: {reservoirNameKey: key,database:db}
    })
  }
}
