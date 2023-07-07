// java Date对象转换为年月日
export function format(oldDate) {
  let date = new Date(oldDate); //创建新的Date对象
  let year = date.getFullYear(); //把年月日时分秒分别取出来
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return [year, month, day].join("-"); //将取出的数据组合拼接成预期格式的日期
}

// 得到前n天年月日字符串
export function GetTime(days) {
  var date = new Date();
  var base = Date.parse(date); // 转换为时间戳
  var oneDay = 24 * 3600 * 1000;

  var daytimeArr = [];
  for (var i = 1; i <= days; i++) {
    //前七天的时间
    var now = new Date((base -= oneDay));
    var myear = now.getFullYear();
    var month = now.getMonth() + 1;
    var mday = now.getDate();
    daytimeArr.push(
      [
        myear,
        month >= 10 ? month : "0" + month,
        mday >= 10 ? mday : "0" + mday,
      ].join("-")
    );
  }
  daytimeArr.reverse();
  return daytimeArr;
}

// 下一次发货时间
export function nextDate(startTime, freq) {
  let baseNow = Date.parse(new Date());
  let oneDay = 24 * 3600 * 1000;

  let tem = Date.parse(startTime);
  // 如果开始时间比现在迟则不计算
  if (tem <= baseNow) {
    while (tem <= baseNow) tem += oneDay * freq;
    tem -= freq * oneDay;
  }

  let CurTime = new Date(tem);
  let nextTime = new Date(tem + freq * oneDay);
  return [
    [CurTime.getFullYear(), CurTime.getMonth() + 1, CurTime.getDate()].join(
      "-"
    ),
    [nextTime.getFullYear(), nextTime.getMonth() + 1, nextTime.getDate()].join(
      "-"
    ),
  ];
}
