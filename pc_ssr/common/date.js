// 处理日期时间
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }

    return fmt
}

// 填充时间零
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// 当前时间差
export function diffTime(time) {
    //将-转化为/
    let dateBegin = new Date(time.replace(/-/g, "/"));
    //获取当前时间
    let dateEnd = new Date();

    // 获取时间差毫秒数
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();


    // 计算相差天数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));

    // 计算天数后剩余的毫秒数
    let leave1 = dateDiff % (24 * 3600 * 1000);
    // 计算相差小时数
    let hoursDiff = Math.floor(leave1 / (3600 * 1000));

    //计算小时数后剩余的毫秒数
    let leave2 = leave1 % (3600 * 1000);
    // 计算相差分钟数
    let minutesDiff = Math.floor(leave2 / (60 * 1000));

    // 计算分钟数后剩余的毫秒数
    let leave3 = leave2 % (60 * 1000);
    let secondsDiff = Math.round(leave3 / 1000);

    // 计算相差月数
    let monthDiff = Math.floor(dayDiff / 31);

    // 获取相差的年份
    let yearDiff = Math.floor(monthDiff / 12);

    // 年月日时分秒
    return {
        yearDiff: yearDiff,
        monthDiff: monthDiff,
        dayDiff: dayDiff,
        hoursDiff: hoursDiff,
        minutesDiff: minutesDiff,
        secondsDiff: secondsDiff
    }
}
