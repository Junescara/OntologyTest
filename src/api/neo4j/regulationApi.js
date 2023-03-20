import request from '@/utils/request'
export default {
  getAllRegulationElements(relType, database) {
    return request({
      url: `/kg/analyze/regulation/getAllRegulationElements`,
      method: 'get',
      params: {relType: relType, database: database}
    })
  },

  getNodesByName(label, name, database) {
    return request({
      url: `/kg/analyze/regulation/getNodesByName`,
      method: 'get',
      params: {label: label, name: name, database: database}
    })
  },

  getSchedulePlan(name, element, value, database) {
    return request({
      url: `/kg/analyze/regulation/getSchedulePlan`,
      method: 'get',
      params: {name: name, element: element, value: value, database: database}
    })
  },

  getSchedulePlanLink(name, element, value, database) {
    return request({
      url: `/kg/analyze/regulation/getSchedulePlanLink`,
      method: 'get',
      params: {name: name, element: element, value: value, database: database}
    })
  }

}
