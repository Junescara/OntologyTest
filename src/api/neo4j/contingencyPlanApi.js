import request from '@/utils/request'
export default {

  getNodesByName(label, keyword, database) {
    return request({
      url: `/kg/analyze/contingencyPlan/getNodesByName`,
      method: 'get',
      params: {label: label, keyword: keyword, database: database}
    })
  },


}
