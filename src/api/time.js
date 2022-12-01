Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,               //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

export function DateFormatter(date, spite) {
    let parseDate = new Date(Date.parse(date));
    return parseDate.format("yyyy" + spite + "MM" + spite + "dd");
}

export function TimeBetween(date1, date2) {//di作为一个变量传进来
    if (date1 == null || date2 == null) {
        return "";
    }
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    let dateBegin = new Date(date1.replace(/-/g, "/"));//将-转化为/，使用new Date
    let dateEnd = new Date(date2.replace(/-/g, "/"))
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    let leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    //计算相差秒数
    return dayDiff + "天" + hours + "小时" + minutes + "分钟"
}

/**
 *获取未来时间
 *num number
 */
export function getFeature(num) {
    var t = new Date();
    var iToDay = t.getDate();
    var iToMon = t.getMonth();
    var iToYear = t.getFullYear();
    var newDay = new Date(iToYear, iToMon, iToDay + num);
    return newDay;
}