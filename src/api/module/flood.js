import request from '@/api/request'
//聚合信息接口提供
const headers = {
    "Content-Type": "application/json",
  };
  //查询所有节点的数量、节点类型的数量
  export function getNodesByName(label, name, database) {
    return request({
      url: `/flood/getNodesByName`,
      method: 'get',
      params: {label: label, name: name, database: database}
    })
  }

  export function getNodeByName(label, name, database) {
    return request({
      url: `/flood/getNodeByName`,
      method: 'get',
      params: {label: label, name: name, database: database}
    })
  }

  export function getSchedulePlan(name, element, value, database) {
    return request({
      url: `/flood/getSchedulePlan`,
      method: 'get',
      params: {name: name, element: element, value: value, database: database}
    })
  }

  export function getSchedulePlanLink(name, element, value, database) {
    return request({
      url: `/flood/getSchedulePlanLink`,
      method: 'get',
      params: {name: name, element: element, value: value, database: database}
    })
  }

  export function  getHaihePlanLink(name, element, value, database) {
    return request({
      url: `/flood/getHaihePlanLink`,
      method: 'get',
      params: {name: name, element: element, value: value, database: database}
    })
  }

  export function getDefaultRelLinks(db){
    return request({
        url: `/flood/getDefaultRelLinks?database=`+db,
        method: 'get',
      }
    )
  }
  