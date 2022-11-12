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
    // return request({
    //   url: `/kg/instance/connect/getExistInstInfoById`,
    //   method: 'post',
    //   data: JSON.stringify(id)
    // })
    return request.post(`/kg/instance/connect/getExistInstInfoById`,JSON.stringify(id),{headers:{'content-type':'application/x-www-form-urlencoded'}})
  }
}
