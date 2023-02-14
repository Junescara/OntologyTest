import request from "../../utils/request";
import qs from "qs";

export default {
  downloadFile(fileName){
    return request({
      url: `/file/download/` + fileName,
      method: 'get',

      responseType: 'arraybuffer',
    })
  }
}
