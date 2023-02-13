import request from '@/utils/request'

export default {
  //查询所有节点label
  getLabels() {
    return request({
      url: `/aggregate/nodeLabels`,
      method: 'get'
    })
  },
  //查询所有关系label
  getRelations() {
    return request({
      url: `/aggregate/relLabels`,
      method: 'get'
    })
  },
  //根据对象本体属性查询结点ID
  getOntoIDbyName(name,db) {
    return request({
      url: `/kg/onto/getOntoIDbyName/`+name+`/`+db,
      method: 'get',
    })
  },

  //添加本体
  addNode(addForm) {
    return request.post(`/kg/onto/addNode`, addForm,{headers:{'Content-Type': 'application/json'}})
  },

  getOntoTableList(db){
    return request({
      url: `/kg/onto/showOntologyTable`,
      method: 'get',
      params:{database:db}
    })
  },

  getOntoList(type,db){
    return request({
      url: `/kg/onto/getOntoList`,
      method: 'get',
      params:{type,database:db}
    })
  },

  getOntoRelList(type,db){
    return request({
      url: `/kg/onto/getOntoRelList`,
      method: 'get',
      params:{type,database:db}
    })
  },

  getAttNameListByObjName(name,db){
    return request({
      url: `/kg/onto/getAttNameListByObjName`,
      method: 'get',
      params:{name,database:db}
    })
  },

  getAttInfoListByObjName(name,db){
    return request({
      url: `/kg/onto/getAttInfoListByObjName`,
      method: 'get',
      params:{name,database:db}
    })
  },

  isPrimaryKeyValue(primaryKeyValue) {
    return request.post(`/kg/onto/isPrimaryKeyValue`, primaryKeyValue,{headers:{'Content-Type': 'application/json'}})
  },

}
