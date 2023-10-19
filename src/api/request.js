import axios from "axios";
import { ElMessage } from "element-plus";
import errorCode from "../utils/errorCode.js";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
});
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // console.log(res);
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    )
      return res.data;

    if (code === 500) {
      ElMessage.error(msg);
      return Promise.reject(new Error(msg));
    } else {
      if (res.data.msg && res.data.msg.includes("成功") && res.data.msg != "更新成功") {

          ElMessage.success(msg);
      }
      return res.data;
    }
  },
  (err) => {
    console.log("err" + err);
    let { message } = err;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({
      message: message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(err);
  }
);
export default service;
