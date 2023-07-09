import request from "@/api/request";
const baseURL = "/kg/onto";

/**
 * 添加实例
 * @param {*} params 参数对象
 * @returns
 */
export function add(params) {
  return request({
    url: `${baseURL}/addInstInfo`,
    type: "post",
    // 参数字面量
    params,
  });
}

/**
 * 查询属性列表
 * @param {*} name
 * @param {*} database
 * @returns
 */
export function queryAttrList(name, database) {
  return request({
    url: `${baseURL}/getAttNameListByObjName`,
    type: "get",
    params: {
      name,
      database,
    },
  });
}
