import request from '@/utils/request'
//聚合信息接口提供
export default {
  //查询所有节点的数量、节点类型的数量
  getRegionalismRel() {
    return request({
      url: `/vis/regionalismRel`,
      method: 'get'
    })
  },
}
