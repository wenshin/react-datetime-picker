require('./dist/style.css');

const DatetimePicker = require('./dist').default;
const Period = require('./dist').Period;

DatetimePicker.Period = Period;

module.exports = DatetimePicker;

