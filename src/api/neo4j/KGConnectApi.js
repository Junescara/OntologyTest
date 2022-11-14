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
  getConnects(){
    return request({
      url: `/kg/instance/connect/getExistInstInfo`,
      method: 'get'
    })
  },
  getConnectionById(id){
    return request({
      url: `/kg/instance/connect/getExistInstInfoById?id=`+id,
      method: 'get',
    })
  },
  addConnection(params){
    return request({
      url: `/kg/instance/connect/addInst`,
      method: 'post',
      data:qs.stringify(params)
    })
  },
  fetchDelete(params){
    return request({
      url: `/kg/instance/connect/deleteInstById`,
      method: 'post',
      data:qs.stringify(params)
    })
  }
}
