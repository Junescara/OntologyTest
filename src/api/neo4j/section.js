//断面接口
import request from '@/utils/request'
export default {
  getSectionNames(db) {
    return request({
      url: `/kg/instance/section/sectionName`,
      method: 'get',
      params:{database:db}
    })
  },
  //根据名称查询断面节点
  getSectionByName(sectionName,db) {
    return request({
      url: `/kg/instance/section/sectionByName`,
      method: 'get',
      params:{sectionName,database:db}
    })
  },
  getSectionContainsName(key,db) {
    return request({
      url: `/kg/instance/section/sectionContansName`,
      method: 'get',
      params: {sectionNameKey: key,database:db}
    })
  }
}
