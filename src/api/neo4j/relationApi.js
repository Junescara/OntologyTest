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
      url: `/kg/instance/relation/list`,
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
      url: `/kg/instance/relation/getNodeById/`+id,
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
    return request.get(`/kg/instance/relation/getNodesByIds/`, {
      params:{
        ids
      },
      paramsSerializer: function (params) {
        return JSON.stringify(params, { arrayFormat: "repeat" });
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
      url: `/kg/instance/relation/getRelsByNodeId/`+id,
      method: 'get'
    })
  },
  getRelsByName(name){
    return request({
      url: `/kg/instance/relation/getRelsByName`,
      method: 'get',
      params: {name}
    })
  },

  //按id删除关系
  delRelById(id) {
    return request({
      url: `/kg/instance/relation/delRelById`,
      method: 'post',
      params: {id:id}
    })
  },

  //添加关系
  addRel(addForm) {
    return request.post(`/kg/instance/relation/addRel`, addForm,{headers:{'Content-Type': 'application/json'}})
  },

  getRelsRegionContainsNodeName(key){
    return request({
      url: `/kg/instance/relation/getRelsContainsNodeNameKey`,
      method: 'get',
      params:{key}
    })
  },
  /**
   * 查询生成可视化知识图谱所需的内容，一次性返回所有需要的数据
   * @param id
   * @returns {*}
   */
  getKGVisiblesOutData(id){
    return request({
      url: `/kg/instance/relation/getVisibleChartsByNodeId/`+id,
      method: 'get',
    })
  },
  getNodeDetails(id){
    return request({
      url: `/kg/onto/relation/getNodeDetail/`+id,
      method: 'get',
    })
  },
  getKGVisiblesData(ids){
    let url = `/kg/instance/relation/getWholeVisibleChartsByNodeIds/`
    let temp = '?ids=' + ids[0]
    for (let i = 1; i < ids.length; i++){
      temp = temp + ',' + ids[i]
    }
    return request(({
      url: url + temp,
      method: 'get',
    }))
  },
  /**
   * 查询生成可视化知识图谱所需的内容，一次性返回所有需要的数据
   * @param id
   * @returns {*}
   */
  getKGVisiblesDataForOntology(){
    return request({
      url: `/kg/onto/showOntology`,
      method: 'get',
    })
  },
  /**
   * 查询生成可视化知识图谱所需的内容，一次性返回所有需要的数据
   * @param id
   * @returns {*}
   */
  getVisiblesDataForOntologySep(id){
    return request({
      url: `/kg/onto/showOntologySep`+id,
      method: 'get',
    })
  },

}
