/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/6 19:35
 * @description：关系查询api
 * @modified By：
 * @version:     1.0
 */
import request from "../../utils/request";
import qs from "qs"

export default {
  getTestRels(){
    return request({
      url: `/relation/list`,
      method: 'get'
    })
  },
  /**
   * 通过id查询结点信息
   * @param id
   * @returns {*}
   */
  getNodeById(id){
    return request({
      url: `/relation/getNodeById/`+id,
      method: 'get'
    })
  },
  /**
   * 根据ids批量查询结点信息
   * @param ids
   * @returns {*[]}
   */
  /*getNodesByIds(ids){
    let nodes = []
    for (let id of ids){
      request({
        url: `/relation/getNodeById/`+id,
        method: 'get'
      }).then(({data}) => {
        console.log("data====",data)
        nodes.push(data.data.regionalism)
      }).catch(error => {
        console.log(error)
      })
    }
    return nodes
  },*/
  getNodesByIds(ids){
    // return request({
    //   url: `/relation/getNodesByIds/`,
    //   method: 'post',
    //   params: {ids:ids}
    // })
    return request.get(`/relation/getNodesByIds/`, {
      params:{
        ids
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    })
  },
  /**
   * 通过id查询该结点的关系
   * @param id
   * @returns {*}
   */
  getRelsByNodeId(id){
    return request({
      url: `/relation/getRelsByNodeId/`+id,
      method: 'get'
    })
  }
}
