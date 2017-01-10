require('./lib/style.css');

const DatetimePicker = require('./lib').default;
const Period = require('./lib').Period;

DatetimePicker.Period = Period;

module.exports = DatetimePicker;

