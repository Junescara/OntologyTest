//测站接口
import request from '@/utils/request'
export default {
  getStationNames() {
    return request({
      url: `/kg/instance/station/stationName`,
      method: 'get'
    })
  },
  //根据名称查询测站节点
  getStationByName(stationName) {
    return request({
      url: `/kg/instance/station/stationByName`,
      method: 'get',
      params:{stationName}
    })
  },
  getStationContainsName(key) {
    return request({
      url: `/kg/instance/station/stationContansName`,
      method: 'get',
      params: {stationNameKey: key}
    })
  }
}
