/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/12 16:15
 * @description：ToDo
 * @modified By：
 * @version:     1.0
 */
import request from "../../utils/request";
import qs from "qs";

export default {
  /**
   * 分页加载连接信息
   * @param params
   * @returns {*}
   */
  getConnects(params){
    return request({
      url: `/kg/instance/connect/getInstInfo`,
      method: 'get',
      params: params
    })
  },
  getConnectionById(id){
    return request({
      url: `/kg/instance/connect/getInstInfoById?dbId=`+id,
      method: 'get',
    })
  },
  addConnection(params){
    return request({
      url: `/kg/instance/connect/addInstInfo`,
      method: 'post',
      data:qs.stringify(params)
    })
  },
  fetchDelete(params){
    return request({
      url: `/kg/instance/connect/deleteInstInfoById`,
      method: 'post',
      data:qs.stringify(params)
    })
  },
  fetchUpdate(params){
    /*return request({
      url: `/kg/instance/connect/updateInstInfo`,
      method: 'post',
      data:JSON.stringify(params)
    })*/

    return request.post(`/kg/instance/connect/updateInstInfo`,JSON.stringify(params),{headers:{"Content-Type":"application/json"}})
  }
}
