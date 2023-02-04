/**
 * @author: Lin j
 * @date: 2022/10/25 16:05
 * @description： 封装axios
 */
import axios from 'axios'
import { Message } from 'element-ui';

// 域名地址
axios.defaults.baseURL = 'http://localhost:8083';

//  RESPONSE 响应异常拦截
axios.interceptors.response.use(result => {
    // console.log(result.data)
    if (result.data.code != 1) {
      Message.error({ message: result.data.msg });
        // 非法进入时直接跳到登录页（暂时不需要）
        // window.location.href = '/';
        return;
    };
    return result;
}, err => {

    if (err && err.response) {
        switch (err.response.status) {
            case 401:
                err.message = '请求方式错误!';
                break;
            case 402:
                err.message = '请求参数错误!';
                break;
            default:
                err.message = `登录凭证过期,请重新登录!`;
        }
    } else {
        err.message = '连接服务器失败!'
    }
    Message.error({ message: err.message })
    return Promise.resolve(err);
})

// 接口域名
export const url = axios.defaults.baseURL;

// POST 采用query传参
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        params: params,

    });
}
// POST  采用JSON传参
export const postRequestJson = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data:params,
        contentType:"application/json;charset=utf-8",
        headers:{
            'Content-Type': "application/json",
        }
    });
}

//  GET 方法封装
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        params: params
    });
}

//  PUT 方法封装
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params
    });
}

//  DELETE 方法封装
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: url,
        data: params
    });
}
