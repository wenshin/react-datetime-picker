import moment from 'moment';

export const ISOFormat = {
  YEAR: 'YYYY',
  MONTH: 'YYYY-MM',
  DATE: 'YYYY-MM-DD',
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  DATE_HOUR: 'YYYY-MM-DD HH',
  DATE_MINUTE: 'YYYY-MM-DD HH:mm',
  TIME: 'HH:mm:ss',
  TIME_HOUR: 'HH',
  TIME_MINUTE: 'HH:mm',
};

export const CNFormat = {
  YEAR: 'YYYY年',
  MONTH: 'YYYY年MM月',
  DATE: 'YYYY年MM月DD日',
  DATE_TIME: 'YYYY年MM月DD日 HH时mm分ss秒',
  DATE_HOUR: 'YYYY年MM月DD日 HH时',
  DATE_MINUTE: 'YYYY年MM月DD日 HH时mm分',
  TIME: 'HH时mm分ss秒',
  TIME_HOUR: 'HH时',
  TIME_MINUTE: 'HH时mm分'
};

export const MomentFormat = {
  Y: 'year',
  M: 'month',
  D: 'day',
  H: 'hour',
  m: 'minute',
  s: 'second'
};

export const ShowType = {
  YEAR: 'Y',
  MONTH: 'M',
  DAY: 'D',
  TIME: 'Hms'
};

export const ShowTextCN = {
  SURE: '确定',
  CLEAR: '清空',
  CANCEL: '取消',
  YEAR: '年',
  MONTH: '月',
  DAY: '日',
  TODAY: '今天',
  TODAY_MIN: '今',
  NOW: '当前',
  CUR_MONTH: '本月',
  CUR_YEAR: '今年',
  DAY_REL: '天',
  WEEK: '周',
  HOUR: '时',
  MINUTE: '分',
  SECOND: '秒',
};

export const ShowTextEN = {
  SURE: 'Sure',
  CLEAR: 'Clear',
  CANCEL: 'Cancel',
  YEAR: 'Year',
  MONTH: 'Month',
  DAY: 'Day',
  TODAY: 'Today',
  TODAY_MIN: 'TD',
  NOW: 'Now',
  CUR_MONTH: 'Current Month',
  CUR_YEAR: 'Current Year',
  DAY_REL: 'Day',
  WEEK: 'WK',
  HOUR: 'Hour',
  MINUTE: 'Min',
  SECOND: 'Sec',
};

const isCN = moment.locale() === 'zh-cn';

export const ShowText = isCN ? ShowTextCN : ShowTextEN;
