import request from "../../utils/request";

/**
 * @author     ：Wangziyi
 * @date       ：Created in 1/3/2023 下午4:19
 * @description：流域雨量站api
 * @modified By：
 * @version:     1.0
 */


export default {

  //获取行政区划节点的名称
  getRainfallStationNames(db) {
    return request({
      url: `/kg/instance/rainfallStation/rainfallStationName`,
      method: 'get',
      params:{database:db}
    })
  },
  //根据名称查询行政区划节点
  getRainfallStationByName(rainfallStationName,db) {
    return request({
      url: `/kg/instance/rainfallStation/rainfallStationByName`,
      method: 'get',
      params:{rainfallStationName,database:db}
    })
  },
  getRainfallStationContainsName(key,db) {
    return request({
      url: `/kg/instance/rainfallStation/rainfallStationContansName`,
      method: 'get',
      params: {rainfallStationNameKey: key,database:db}
    })
  }
}
