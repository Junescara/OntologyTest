import request from "@/api/request";
const baseURL = "/db";

const headers = {
  "Content-Type": "application/json",
};
/**
 * 添加对象实例
 * @param neoId  节点id
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
 * 查询本体列表
 * @param {*} name
 * @returns
 */
export function queryOntoList() {
  return request({
    url: `${baseURL}/list-onto-inst`,
    method: "post",
    headers,
    data: { name },
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
      value,
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
 * 查询关系本体列表
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
export function inslist(labels,name) {
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

