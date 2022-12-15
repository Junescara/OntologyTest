//断面接口
import request from '@/utils/request'
export default {
  getSectionNames() {
    return request({
      url: `/kg/instance/section/sectionName`,
      method: 'get'
    })
  },
  //根据名称查询断面节点
  getSectionByName(sectionName) {
    return request({
      url: `/kg/instance/section/sectionByName`,
      method: 'get',
      params:{sectionName}
    })
  },
  getSectionContainsName(key) {
    return request({
      url: `/kg/instance/section/sectionContansName`,
      method: 'get',
      params: {sectionNameKey: key}
    })
  }
}
