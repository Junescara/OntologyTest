import request from '@/utils/request'
export default {

  getNodesByName(label, keyword, database) {
    return request({
      url: `/kg/analyze/contingencyPlan/getNodesByName`,
      method: 'get',
      params: {label: label, keyword: keyword, database: database}
    })
  },

  getSchedulePlanLink(name, type, element, value, database) {
    return request({
      url: `/kg/analyze/contingencyPlan/getSchedulePlanLink`,
      method: 'get',
      params: {name: name, type: type, element: element, value: value, database: database}
    })
  }

}
