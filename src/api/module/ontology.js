import request from "@/api/request";
const baseURL = "/dbtest";
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
    data: propsClzs,
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