import request from "../../utils/request";

/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/12/3 15:40
 * @description：河流断面api
 * @modified By：
 * @version:     1.0
 */

export default {
  //获取河流节点的名称
  getRiverNames(db) {
    return request({
      url: `/kg/instance/river/riverName`,
      method: 'get',
      params:{database:db}
    })
  },
  //根据名称查询河流节点
  getRiverByName(riverName,db) {
    return request({
      url: `/kg/instance/river/riverByName`,
      method: 'get',
      params:{riverName,database:db}
    })
  },
  getRiverContainsName(key,db) {
    return request({
      url: `/kg/instance/river/riverContansName`,
      method: 'get',
      params: {riverNameKey: key,database:db}
    })
  }
}
