import request from '@/utils/request'

export default {
  //查询所有节点label
  getLabels() {
    return request({
      url: `/aggregate/nodeLabels`,
      method: 'get'
    })
  },
  //查询所有关系label
  getRelations() {
    return request({
      url: `/aggregate/relLabels`,
      method: 'get'
    })
  },
}