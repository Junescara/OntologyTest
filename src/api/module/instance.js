import request from "@/api/request";
const baseURL = "/kg/onto";

// 添加本体
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
