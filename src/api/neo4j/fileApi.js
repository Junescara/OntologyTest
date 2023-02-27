import request from "../../utils/request";
import qs from "qs";

/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/10 19:32
 * @description：文件处理api
 * @modified By：
 * @version:     1.0
 */

export default {
  importRelation(params,upload){
    const file = upload
    console.log("upload为======",file)
    let formData = new FormData()
    formData.append('file', file)
    formData.append('labelFrom',params.labelFrom)
    formData.append('labelTo',params.labelTo)
    formData.append('relationship',params.relationship)
    formData.append('coFrom',params.coFrom)
    formData.append('coTo',params.coTo)
    formData.append('skip',params.skip)
    console.log("formdata======",formData.get('file'))
    return request.post("/kg/instance/importRelation",
                        formData,
       {'Content-Type': 'multipart/form-data'})
  },
  importEntities(params,upload){
    const file = upload
    console.log("upload为======",file)
    let formData = new FormData()
    formData.append('file', file)
    formData.append('label',params.label)
    formData.append('co',params.co)
    console.log("formdata======",formData.get('file'))
    return request.post("/kg/instance/importEntities",
      formData,
      {'Content-Type': 'multipart/form-data'})
  },
  recoverFromUploadFile(upload){
    const file = upload
    console.log("upload为======",file)
    let formData = new FormData()
    formData.append('file', file)
    return request.post("/kg/recoverFromUploadFile",
      formData,
      {'Content-Type': 'multipart/form-data'})
  }
}
