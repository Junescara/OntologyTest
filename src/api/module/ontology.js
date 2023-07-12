import request from "@/api/request";
const baseURL = "/dbtest";
/**
 * 添加本体
 * @param {*} propsClzs
 * @param {*} name
 * @returns
 */
export function createOnto(propsClzs, name) {
  return request({
    url: `${baseURL}/create-ontology`,
    type: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      propsClzs,
      name,
    },
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
    type: "get",
    params: {
      neoId,
    },
  });
}
