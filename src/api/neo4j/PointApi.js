import request from "../../utils/request";

/**
 * @author     ：Wangziyi
 * @date       ：Created in 13/3/2023 下午3:35
 * @description：汇流点api
 * @modified By：
 * @version:     1.0
 */

export default {
  //获取汇流点节点的名称
  getPointNames(db) {
    return request({
      url: `/kg/instance/point/pointName`,
      method: 'get',
      params:{database:db}
    })
  },
  //根据名称查询汇流点节点
  getPointByName(pointName,db) {
    return request({
      url: `/kg/instance/point/pointByName`,
      method: 'get',
      params:{pointName,database:db}
    })
  },
  getPointContainsName(key,db) {
    return request({
      url: `/kg/instance/point/pointContansName`,
      method: 'get',
      params: {pointNameKey: key,database:db}
    })
  }
}
