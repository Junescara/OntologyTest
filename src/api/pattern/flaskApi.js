/**
 * @author: Lin j
 * @date: 2023/9/14 19:09
 * @description：调用flask后端进行算法匹配的。
 */

import axios from 'axios'
import { Message } from 'element-ui';

// 域名地址
const flaskBaseURL = 'http://localhost:5000/pattern';

export function flaskGet(url, params){
  return axios({
    method: 'get',
    url: flaskBaseURL + url,
    params: params,
  });
}

export function flaskPost(url, params){
  return axios({
    method: 'post',
    url: flaskBaseURL + url,
    params: params,
    contentType:"application/json;charset=utf-8",
    headers:{
      'Content-Type': "application/json",
    }
  });
}
