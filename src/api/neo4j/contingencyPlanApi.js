import request from '@/utils/request'
export default {
  getAllRegulationElements(relType, database) {
    return request({
      url: `/kg/analyze/regulation/getAllRegulationElements`,
      method: 'get',
      params: {relType: relType, database: database}
    })
  },

  getNodesByName(label, keyword, database) {
    return request({
      url: `/kg/analyze/contingencyPlan/getNodesByName`,
      method: 'get',
      params: {label: label, keyword: keyword, database: database}
    })
  },

  getSchedulePlan(name, element, value, database) {
    return request({
      url: `/kg/analyze/regulation/getSchedulePlan`,
      method: 'get',
      params: {name: name, element: element, value: value, database: database}
    })
  }

}
