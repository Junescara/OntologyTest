import request from '@/utils/request'

export default {
  pageRiver(page, size) {
    return request({
      url: `/river/getPageRiverNode/${page}/${size}`,
      method: 'get'
    })
  },
  getRiverRelation() {
    return request({
      url: `/river/getRiverRelationNode`,
      method: 'get'
    })
  }
}