import request from "@/api/request";
const baseURL = "/db";
/**
 * 添加本体
 * @param {*} propsClzs
 * @param {*} name
 * @returns
 */
export function createOnto(propsClzs, name) {
  console.log("propsClzs;", propsClzs);
  return request({
    url: `${baseURL}/create-ontology`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: propsClzs,name
  });
}

/**
 * 加载本体
 * @param {*} neoId
 * @returns
 */
export function loadOntoInfo(neoId) {
  return request({
    url: `${baseURL}/load-ontology`,
    method: "get",
    params: {
      neoId,
    },
  });
}

/**
 * 查询属性类
 * @param {*} type
 * @returns
 */
export function listbasic(type) {
  return request({
    url: `${baseURL}/list-basic-clz`,
    method: "post",
    params: type,
  });
}

/**
 * 本体列表
 * @param {*} name
 * @returns
 */
export function Ontolist( name) {
  return request({
    url: `${baseURL}/list-onto-inst`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: name,
  });
}

/**
 * 创建属性
 * @param {*} name
 * @returns
 */
export function ontoprop(type,name,dimension,lowerBound,upperBound) {
  return request({
    url: `${baseURL}/insert-onto-prop`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: type,name,dimension,lowerBound,upperBound
  });
}

/**
 * 创建本体间关系
 * @param {*} name
 * @returns
 */
export function createRel(from,to,name) {
  return request({
    url: `${baseURL}/create-common-rel`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: from,to,name
  });
}

/**
 * 创建关系本体
 * @param {*} name
 * @returns
 */
export function Relonto(startList,endList,name,strategy,scope) {
  return request({
    url: `${baseURL}/insert-rel-onto`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: startList,endList,name,strategy,scope
  });
}

/**
 * 删除本体
 * @param {*} name
 * @returns
 */
export function DeleteOnto(neoId) {
  return request({
    url: `${baseURL}/logic-delete-onto`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: neoId
  });
}
/**
 * 删除属性
 * @param {*} name
 * @returns
 */
export function DeleteProp(neoId) {
  return request({
    url: `${baseURL}/logic-delete-prop`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: neoId
  });
}

/**
 * 删除属性
 * @param {*} name
 * @returns
 */
export function DeleteOntoProp(neoId) {
  return request({
    url: `${baseURL}/logic-delete-onto-prop`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: neoId
  });
}
/**
 * 新增属性
 * @param {*} name
 * @returns
 */
export function AddProp(ontoNeoId,codes) {
  return request({
    url: `${baseURL}/add-onto-prop`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: ontoNeoId,codes
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
    },
  });
}