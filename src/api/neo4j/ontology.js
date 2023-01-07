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
  getOntoIDbyName(name) {
    return request({
      url: `/kg/onto/getOntoIDbyName/`+name,
      method: 'get',
    })
  },

  //添加本体
  addNode(addForm) {
    return request.post(`/kg/onto/addNode`, addForm,{headers:{'Content-Type': 'application/json'}})
  },

  getOntoTableList(){
    return request({
      url: `/kg/onto/showOntologyTable`,
      method: 'get',
    })
  },

  getOntoList(type){
    return request({
      url: `/kg/onto/getOntoList?type=`+type,
      method: 'get',
    })
  },

  getOntoRelList(type){
    return request({
      url: `/kg/onto/getOntoRelList?type=`+type,
      method: 'get',
    })
  },

}
