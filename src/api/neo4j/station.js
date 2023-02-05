//测站接口
import request from '@/utils/request'
export default {
  getStationNames(db) {
    return request({
      url: `/kg/instance/station/stationName`,
      method: 'get',
      params:{database:db}
    })
  },
  //根据名称查询测站节点
  getStationByName(stationName,db) {
    return request({
      url: `/kg/instance/station/stationByName`,
      method: 'get',
      params:{stationName,database:db}
    })
  },
  getStationContainsName(key,db) {
    return request({
      url: `/kg/instance/station/stationContansName`,
      method: 'get',
      params: {stationNameKey: key,database:db}
    })
  }
}
