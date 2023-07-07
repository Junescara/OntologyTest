import request from "@/api/request";
const baseURL = "/kg/instance/connect";

// 添加实例
export function add(params) {
  return request({
    url: `${baseURL}/addInstInfo`,
    type: "post",
    // 参数字面量
    params,
  });
}
