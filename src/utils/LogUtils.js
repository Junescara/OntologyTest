/**
 * @author: Lin j
 * @date: 2023/3/13 20:37
 * @description：规范Log内容，显得好看一点
 */
let isBuild = false

export function MyLog(fileName,methodName,describe,params){
  if (!isBuild){
    console.log("D::",fileName+"::"+methodName+"::"+describe,"===",params);
  }
};
