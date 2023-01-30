import request from '@/utils/request'
//聚合信息接口提供
export default {
  //查询所有节点的数量、节点类型的数量
  getNodeCounts(database) {
    return request({
      url: `/kg/instance/aggregate/nodeCounts`,
      method: 'get',
      params: {database:database}
    })
  },
  //查询所有节点的标签
  getNodeLabels(database) {
    return request({
      url: `/kg/instance/aggregate/nodeLabels`,
      method: 'get',
      params: {database:database}
    })
  },
  //查询所有关系的标签
  getRelLabels(database) {
    return request({
      url: `/kg/instance/aggregate/relLabels`,
      method: 'get',
      params: {database:database}
    })
  },
  //按id删除节点
  delNodeById(id,database) {
    return request({
      url: `/kg/instance/aggregate/delNodeById/`,
      method: 'post',
      params: {id:id,database:database}
    })
  },
  //按id删除实体及关联关系
  delNodeAndRelsById(id,database) {
    return request({
      url: `/kg/instance/aggregate/delNodeAndRelsById/`,
      method: 'post',
      params: {id:id,database:database}
    })
  },
  //添加实体
  addNode(addForm) {
    return request.post(`/kg/instance/aggregate/addNode`, addForm,{headers:{'Content-Type': 'application/json'}})
  },

  //修改实体
  editNode(addForm) {
    return request.post(`/kg/instance/aggregate/editNode`, addForm,{headers:{'Content-Type': 'application/json'}})
  }
}
