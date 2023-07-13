import request from "@/api/request";
const baseURL = "/dbtest";

/**
 * 添加实例
 * @param neoId  节点id
 * @param name  实例名称
 * @returns
 */
export function createIns(neoId, name) {
  return request({
    url: `${baseURL}/instantiate-instance`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      neoId,
      name,
    },
  });
}

/**
 * 查询本体列表
 * @param {*} name
 * @param {*} database
 * @returns
 */
export function queryOntoList() {
  return request({
    url: `${baseURL}/list-basic-clz`,
    method: "post",
    params: {},
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
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      neoId,
      value,
    },
  });
}
