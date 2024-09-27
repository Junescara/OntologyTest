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
  getOntologyKGLinks(neoId){
    return request({
        url: `/db/query-sub-onto`,
        method: 'post',
        data: {neoId: neoId}
      }
    )
  },
    /**
     * 获取所有实例图谱所包含的结点
     */
    getInstanceKGLinks(neoId){
        return request({
            url: `/db/query-inst-by-onto`,
            method: 'post',
            data: {neoId: neoId,isSub:0}
            }
        )
    },
    getOntologyNodeById(neoId){
        return request({
                url: `/db/query-inst-by-onto`,
                method: 'post',
                data: {neoId: neoId,isSub:0}
            }
        )
    },
    getInstanceNodeById(NodeId){
        return request({
                url: `/db/load-instance`,
                method: 'post',
            params: {neoId: NodeId}
            }
        )
    }

}
