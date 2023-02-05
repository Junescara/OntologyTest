import request from "../../utils/request";
import qs from "qs";

export default {
  createBackup(params){
    return request({
      url: `/kg/relBackup`,
      method: 'post',
      data:qs.stringify(params)
    })
  }
}
