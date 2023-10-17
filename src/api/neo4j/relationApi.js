/**
 * @author     ：Wangziyi
 * @date       ：Created in 2022/11/6 19:35
 * @description：关系查询api
 * @modified By：
 * @version:     1.0
 */
import request from "../request";
const baseURL = ""
export default {

    /**
     * 获取所有本体图谱所包含的结点
     */
  getOntologyKGLinks(){
    return request({
        url: `/kg/onto-kg`,
        method: 'post',
        data:{}
      }
    )
  },
    /**
     * 获取所有实例图谱所包含的结点
     */
    getInstanceKGLinks(){
        return request({
                url: `/kg/inst-kg`,
                method: 'post',
                data:{}
            }
        )
    },

}
