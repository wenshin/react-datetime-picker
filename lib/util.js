import {MomentFormat, ShowType} from './consts';

const Util = {
  parseFormat(format) {
    let dateType = '';
    let timeType = '';
    for (const typeKey of 'YMD') {
      if (format.indexOf(typeKey) > -1) {
        dateType += typeKey;
      }
    }
    for (const typeKey of 'Hms') {
      if (format.indexOf(typeKey) > -1) {
        timeType += typeKey;
      }
    }
    const type = dateType + timeType;
    return {
      dateType,
      timeType,
      unit: MomentFormat[type.slice(-1)],
      value: type,
      defaultShowType: dateType ? dateType.slice(-1) : ShowType.TIME
    };
  }
};

export default Util;
