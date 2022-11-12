import request from '@/utils/request'
//聚合信息接口提供
export default {
  //查询所有节点的数量、节点类型的数量
  getNodeCounts() {
    return request({
      url: `/kg/instance/aggregate/nodeCounts`,
      method: 'get'
    })
  },
  //查询所有节点的标签
  getNodeLabels() {
    return request({
      url: `/kg/instance/aggregate/nodeLabels`,
      method: 'get'
    })
  },
  //查询所有关系的标签
  getRelLabels() {
    return request({
      url: `/kg/instance/aggregate/relLabels`,
      method: 'get'
    })
  },
  //按id删除节点
  delNodeById(id) {
    return request({
      url: `/kg/instance/aggregate/delNodeById/`,
      method: 'post',
      params: {id:id}
    })
  },
  //按id删除实体及关联关系
  delNodeAndRelsById(id) {
    return request({
      url: `/kg/instance/aggregate/delNodeAndRelsById/`,
      method: 'post',
      params: {id:id}
    })
  }
}
