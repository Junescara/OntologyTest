/**
 * @author: Lin j
 * @date: 2022/10/25 18:47
 * @description：时间格式化工具
 */

/**
 * 返回yyyy-MM-dd hh:mm:ss格式
 * @param data
 * @returns {string}
 * @constructor
 */
export const DateFormation = function (data) {
    let date = new Date(data);
    let year = date.getFullYear();
    let month = date.getMonth()<9?"0"+(date.getMonth()+1):""+(date.getMonth()+1);
    let day = date.getDay()<10?"0"+date.getDay():""+date.getDay();

    let hour = date.getHours()<10?"0"+date.getHours():""+date.getHours();

    return year+"-"+month+"-"+day+" "+hour+":00:00";
}
/**
 * 返回yyyy-MM-dd格式
 * @param data
 * @returns {string}
 * @constructor
 */
export const DateFormation2 = function (data) {

    let date2 = new Date(data);
    let year = date2.getFullYear();
    let month = date2.getMonth()<9?"0"+(date2.getMonth()+1):""+(date2.getMonth()+1);
    let day = date2.getDay()<10?"0"+date2.getDay():""+date2.getDay();

    return year+"-"+month+"-"+day;
}