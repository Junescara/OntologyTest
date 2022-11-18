import request from '@/utils/request'
//拓扑生成相关接口
export default {
  //生成原始的对象关系拓扑
  getTopo(outlet,inRegion) {
    return request({
      url: `/topo/build/${outlet}/${inRegion}`,
      method: 'get'
    })
  },
}
