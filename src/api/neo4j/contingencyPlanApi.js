import request from '@/utils/request'
export default {

  getNodesByName(label, keyword, database) {
    return request({
      url: `/kg/analyze/contingencyPlan/getNodesByName`,
      method: 'get',
      params: {label: label, keyword: keyword, database: database}
    })
  },

  getContingencyPlanLink(name, type, value, database, plan) {
    return request({
      url: `/kg/analyze/contingencyPlan/getContingencyPlanLink`,
      method: 'get',
      params: {name: name, type: type, value: value, database: database, plan: plan}
    })
  },

  getContingencyPlanNode(name, type, value, database, plan) {
    return request({
      url: `/kg/analyze/contingencyPlan/getContingencyPlanNode`,
      method: 'get',
      params: {name: name, type: type, value: value, database: database, plan: plan}
    })
  },

  getContingencyPlanText(name, type, value, database, plan) {
    return request({
      url: `/kg/analyze/contingencyPlan/getContingencyPlanText`,
      method: 'get',
      params: {name: name, type: type, value: value, database: database, plan: plan}
    })
  }

}
