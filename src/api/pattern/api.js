/**
 * @author: Lin j
 * @date: 2022/10/25 16:05
 * @description： 封装axios
 */
import axios from 'axios'
import { Message } from 'element-ui';

// 域名地址
axios.defaults.baseURL = 'http://localhost:8088';
//请求列表
let reqList=[]
//阻止重复的请求
const stopRepeatRequest = function (reqList,url,cancel,errorMessage){
    const errorMsg = errorMessage || ''
    for (let i = 0; i < reqList.length; i++) {
        if (reqList[i]===url){
            cancel(errorMsg)
            return
        }
    }
    reqList.push(url)
}
/**
 *
 */
const allowRequest = function (reqList,url){
    for (let i = 0; i < reqList.length; i++) {
        if (reqList[i]===url){
            reqList.splice(i,1)
            break
        }
    }
}

//  RESPONSE 响应异常拦截
axios.interceptors.response.use(result => {
    // console.log(result.data)
    if (result.data.code != 1) {
      Message.error({ message: result.data.msg });
        // 非法进入时直接跳到登录页（暂时不需要）
        // window.location.href = '/';
        return;
    };
    reqList = []//请求成功后清空数据
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
    reqList = []//请求失败后清空数据
    Message.error({ message: err.message })
    return Promise.resolve(err);
})

axios.interceptors.request.use(config=>{
    let cancel
    config.cancelToken = new axios.CancelToken(function(c){
        cancel = c;
    })
    stopRepeatRequest(reqList,config.url,cancel,'${config.url} 请求终端')
    return config
}, err=>Promise.reject(err)
)

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
