import request from "../../utils/request";

/**
 * @author     ：Wangziyi
 * @date       ：Created in 1/3/2023 下午11:48
 * @description：河段api
 * @modified By：
 * @version:     1.0
 */


export default {

  //获取行政区划节点的名称
  getReachNames(db) {
    return request({
      url: `/kg/instance/reach/reachName`,
      method: 'get',
      params:{database:db}
    })
  },
  //根据名称查询行政区划节点
  getReachByName(reachName,db) {
    return request({
      url: `/kg/instance/reach/reachByName`,
      method: 'get',
      params:{reachName,database:db}
    })
  },
  getReachContainsName(key,db) {
    return request({
      url: `/kg/instance/reach/reachContansName`,
      method: 'get',
      params: {reachNameKey: key,database:db}
    })
  }
}
