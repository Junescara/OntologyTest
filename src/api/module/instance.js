import request from "@/api/request";
const baseURL = "/dbtest";
const headers = {
  "Content-Type": "application/json",
};
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
<<<<<<< HEAD
    headers: {
      "Content-Type": "application/json",
    },
=======
    headers,
>>>>>>> 8865ff0ff4054fe4347899e7cb61142551ce4def
    data: {
      neoId,
      name,
    },
  });
}

/**
 * 查询本体列表
 * @param {*} name
 * @returns
 */
export function queryOntoList(name) {
  return request({
<<<<<<< HEAD
    url: `${baseURL}/list-basic-clz`,
    method: "post",
    params: {},
=======
    url: `${baseURL}/list-onto-inst`,
    method: "post",
    headers,
    data: { name },
>>>>>>> 8865ff0ff4054fe4347899e7cb61142551ce4def
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
<<<<<<< HEAD
    headers: {
      "Content-Type": "application/json",
    },
=======
    headers,
>>>>>>> 8865ff0ff4054fe4347899e7cb61142551ce4def
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
export function queryInsList(labels, name) {
  return request({
    url: `${baseURL}//list-main-inst`,
    method: "post",
    headers,
    data: {
      labels,
      name,
    },
  });
}
