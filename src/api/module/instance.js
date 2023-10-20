import request from "@/api/request";
const baseURL = "/db";

const headers = {
  "Content-Type": "application/json",
};
/**
 * 添加对象实例
 * @param neoId  实例id
 * @param name  实例名称
 * @returns
 */
export function createIns(neoId,name) {
  return request({
    url: `${baseURL}/instantiate-instance`,
    method: "post",
    headers,
    data: {
      neoId,
      name,
    },
  });
}

/**
 * 添加关系实例
 * @param neoId  节点id
 * @param name  实例名称
 * @returns
 */
// export function createRelIns(from,to,name) {
//   return request({
//     url: `${baseURL}/insert-inst-rel`,
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: from,to,name
//   });
// }
export function createRelIns(from,to,name)  {
  return request({
    url: `${baseURL}/insert-inst-rel`,
    method: "post",
    headers,
    data: {
      from,to,name
    },
  });
}


/**
 * 查询基类本体的子本体
 * @param {*} name
 * @returns
 */
export function queryOntoList(neoId) {
  return request({
    url: `${baseURL}/query-sub-onto`,
    method: "post",
    headers,
    data: { neoId },
  });
}
/**
 * 更新实例对象属性值
 * @param {*} neoId 属性节点id
 * @param {*} value 属性值
 * @returns
 */
export function udpateInst(neoId, value) {
  return request({
    url: `${baseURL}/update-subinstance`,
    method: "post",
    headers,
    data: {
      neoId,
      value
    },
  });
}

/**
 * 查询实例列表
 * @param {*} name
 * @returns
 */
export function queryInsList(labels) {
  return request({
    url: `${baseURL}/list-main-inst`,
    method: "post",
    headers,
    data: {
      labels,
      name,
    },
  });
}

/**
 * 查询所有关系本体列表
 * @param
 * @returns 关系本体的名称
 */
export function queryRelList(){
  return request({
    url: `${baseURL}/query-rel-onto`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name,
    },
  });
}

export function queryRelListByName(name){
  return request({
    url: `${baseURL}/list-rel-inst`,
    method: "post",
    headers,
    data: {
      name,
    },
  });
}

export function queryRelListByNameAndLabels(name,labels){
}


/*
* 根据实例名查询实例
* */
export function inslist(labels,name){
  return request({
    url: `${baseURL}/list-main-inst`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      labels ,name
    }
  });
}

/**
 *  删除实例
 * @param neoId
 * @returns {*}
 */
export function deleteIns(neoId){
  return request({
    url: `${baseURL}/logic-delete-inst`,
    method: "post",
    headers,
    data: {
      neoId
    },
  });
}

// export function deleteIns(neoId) {
//   return request({
//     url: `${baseURL}/logic-delete-inst`,
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: {
//       neoId
//     }
//   });
// }

/**
 * 获得该本体的所有属性
 * @param 本体id  neoId
 * @returns {*}
 */
export function getontoProp(neoId){
  console.log("getontoProp中的"+neoId);
  return request({
    url: `${baseURL}/load-ontology`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      neoId
    }
  });
}

/**
 * 加载实例，可获取该实例的属性列表
 * @param neoId
 * @returns {*}
 */
export function getInsProp(neoId){
  console.log("getInsProp中的实例id是"+neoId);
  return request({
    url: `${baseURL}/load-instance`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      neoId
    }
  });
}

/**
 * 查询本体对应的实例。
 * 参数isSub为0的时候，会查询该本体的子本体对应的实例集合，并分类返回
 * 参数isSub为1的时候，只会查询指定本体对应的实例
 */
export function instanceByFatherId(neoId,isSub){
  console.log("instanceByFatherId中的neoId是"+neoId);
  return request({
    url: `${baseURL}/query-inst-by-onto`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      neoId:neoId,
      isSub:isSub
    }
  })
}



