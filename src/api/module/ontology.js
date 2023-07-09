import request from "@/api/request";
const baseURL = "/kg/instance/connect";

/**
 * 添加本体
 * @param {*} types 本体类型
 * @param {*} attributes 属性
 * @param {*} database 本体库id
 * @returns
 */
export function add(types, attributes, database) {
  return request({
    url: `${baseURL}/addNode`,
    type: "post",
    data: {
      types,
      attributes,
      database,
    },
  });
}

/**
 * 查询本体列表
 * @param {*} type 0对象1属性
 * @param {*} database
 * @returns
 */
export function queryOntolist(type, database) {
  return request({
    url: `${baseURL}/getOntoList`,
    type: "get",
    params: {
      type,
      database,
    },
  });
}
