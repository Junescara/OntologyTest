import request from '@/utils/request'
export default {

  getNodesByName(label, keyword, database) {
    return request({
      url: `/kg/analyze/rescuePlan/getNodesByName`,
      method: 'get',
      params: {label: label, keyword: keyword, database: database}
    })
  },

  getRescuePlanLink(name, type, database) {
    return request({
      url: `/kg/analyze/rescuePlan/getRescuePlanLink`,
      method: 'get',
      params: {name: name, type: type, database: database}
    })
  },

  getRescuePlanNode(name, type, database) {
    return request({
      url: `/kg/analyze/rescuePlan/getRescuePlanNode`,
      method: 'get',
      params: {name: name, type: type, database: database}
    })
  },

}
