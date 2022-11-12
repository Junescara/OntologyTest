//行政区划接口
import request from '@/utils/request'
export default {
  //获取行政区划节点的名称
  getRegionalismNames() {
    return request({
      url: `/kg/instance/regionalism/regionalismName`,
      method: 'get'
    })
  },
  //根据名称查询行政区划节点
  getRegionalismByName(regionalismName) {
    return request({
      url: `/kg/instance/regionalism/regionalismByName/${regionalismName}`,
      method: 'get'
    })
  },
  getRegionalismContainsName(key){
    return request({
      url: `/kg/instance/regionalism/regionalismContansName/${key}`,
      method: 'get'
    })
  }
}
