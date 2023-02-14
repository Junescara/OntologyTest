import request from "../../utils/request";
import qs from "qs";

export default {
  createBackup(params){
    return request({
      url: `/kg/relBackup`,
      method: 'post',
      data:qs.stringify(params)
    })
  },
  recoverNeo4(params) {
    return request({
      url: `/kg/readBackup`,
      method: 'post',
      data:qs.stringify(params)
    })
  }
}
