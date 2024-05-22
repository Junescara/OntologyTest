/**
 * @author: Lin j
 * @date: 2022/10/28 19:50
 * @description：请求数据转换
 */

export const str2listForTimeStamp = function (str){
    str = str.split('[')[1]
    str = str.split(']')[0]
    str = str.split(',')
    let tempArr =[]
    for (let i = 0; i < str.length; i++) {
        let s = str[i].split("'")[1]
        tempArr.push(s)
    }
    return tempArr;
}

export const str2listForRain = function (str){
    str = str.split('[')[1]
    str = str.split(']')[0]
    str = str.split(',')
    let tempArr =[]
    for (let i = 0; i < str.length; i++) {
        let s = parseInt(str[i])
        tempArr.push(s)
    }
    return tempArr;
}
