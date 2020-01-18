export const fn_dateTimeToFormatted = (dt) => {
    let min = 60 * 1000;
    let c = new Date();
    let d = new Date(parse(dt));
    let minsAgo = Math.floor((c - d) / (min));

    let result = {
        'raw': d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' + (d.getDate() > 9 ? '' : '0') + d.getDate() + ' ' + (d.getHours() > 9 ? '' : '0') + d.getHours() + ':' + (d.getMinutes() > 9 ? '' : '0') + d.getMinutes() + ':' + (d.getSeconds() > 9 ? '' : '0') + d.getSeconds(),
        'formatted': '',
    };

    if (minsAgo < 60) { // 1시간 내
        result.formatted = minsAgo + '분 전';
    } else if (minsAgo < 60 * 24) { // 하루 내
        result.formatted = Math.floor(minsAgo / 60) + '시간 전';
    } else if (minsAgo < 60 * 24 * 30) { // 하루 이상
        result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
    } else if (minsAgo < 60 * 24 * 30 * 12) {
        result.formatted = '약 ' + Math.floor(minsAgo / 60 / 24 / 30) + '달 전';
    } else {
        result.formatted = '약 ' + Math.floor(minsAgo / 60 / 24 / 30 / 12) + '년 전';
    }

    return result.formatted;
};

const parse = (str) => {
    let year = str.substring(0, 4);
    let month = str.substring(4, 6);
    let day = str.substring(6, 8);
    let hour = str.substring(8, 10);
    let minute = str.substring(10, 12);
    let second = str.substring(12, 14);
    return new Date(year, month - 1, day, hour, minute, second);
};

export const getFormattedPoint = (point) => {
    return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};
