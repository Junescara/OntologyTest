/**
 * @author     ：Wangziyi
 * @date       ：Created in 2023/4/14 23:59
 * @description：为neo4j节点提供通用查询接口
 * @modified By：
 * @version:     1.0
 */
import request from "../../utils/request";

export default {

  /**
   * 根据id去查询节点
   * @param id
   */
  getNodeById(id){
    return request({
      url: `/kg/instance/neo4jEntity/`+id,
      method:`get`,
    })
  },
  /**
   * 查询节点集
   * @param data
   */
  listNodes(data){
    return request({
      url: `/kg/instance/neo4jEntity/list`,
      method:`get`,
      params:data
    })
  },
  /**
   * 查询某类型节点的数量
   * @param data
   */
  countNodes(data){
    return request({
      url: `/kg/instance/neo4jEntity/count`,
      method:`get`,
      params:data
    })
  },
  /**
   * 查询某类型节点的名称
   * @param data
   */
  listNames(data){
    return request({
      url: `/kg/instance/neo4jEntity/names`,
      method:`get`,
      params:data
    })
  },
  /**
   * 通过名称查询
   * @param data
   * @returns {*}
   */
  listNodeByName(data){
    return request({
      url: `/kg/instance/neo4jEntity/name`,
      method:`get`,
      params:data
    })
  }
}
