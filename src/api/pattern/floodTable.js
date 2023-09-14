/**
 * @author: Lin j
 * @date: 2023/9/11 19:03
 * @description：封装floodTable.Vue中的函数
 */
import { getRequest, getRequestNoParams } from './api'

export function getAllFloods(params){
  return getRequest('/flood',params)
}

//获得所有的流域列表
export function getAllBasins(){
  return getRequestNoParams('/basin')
}

//获得当前选项卡下，总的场次数
export function getFloodNum(params){
  return getRequest('/flood/num',params)
}
