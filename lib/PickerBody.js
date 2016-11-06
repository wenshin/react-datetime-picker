import cx from 'classnames';
import moment from 'moment';
import React, {Component, PropTypes} from 'react';
import PickerCell from './PickerCell';
import {ISOFormat, ShowType} from './consts';

// 用 moment.locale('zh-cn') 设置为中文后，
// moment.startOf('week') 从星期一开始
// 而不是英文下的星期日，所以 5 为周六，6 为周日
const Weekends = {
  5: true, // 周六
  6: true // 周日
};

function renderDayOfMonth(activeDate, renderDay, renderWeek) {
  const weeks = [];
  const startOfMonth = moment(activeDate).startOf('month');
  const endOfMonth = moment(startOfMonth).endOf('month');
  const start = startOfMonth.startOf('week');
  const end = endOfMonth.endOf('week');

  let row = 0;
  while (start <= end) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = moment(start);
      days.push(renderDay(date, i, date.month() !== activeDate.month()));
      start.add(1, 'day');
    }
    weeks.push(renderWeek(days, row));
    row++;
  }
  return weeks;
}

function notIn(date, limit, format = ISOFormat.DATE) {
  let ret = false;
  if (limit.min) {
    ret = ret || date.format(format) < moment(limit.min).format(format);
  }
  if (limit.max) {
    ret = ret || date.format(format) > moment(limit.max).format(format);
  }
  return ret;
}

class PickerBody extends Component {
  static propTypes = {
    showType: PropTypes.string.isRequired,
    pickerType: PropTypes.object.isRequired,
    activeDate: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    limit: PropTypes.object
  };

  handleClick(date) {
    const {pickerType, showType} = this.props;
    const nextShowType = pickerType.value !== ShowType.YEAR && showType === ShowType.YEAR
      ? ShowType.MONTH : pickerType.defaultShowType;
    this.props.onChange(date, nextShowType);
  }

  renderDay() {
    const {activeDate, limit} = this.props;
    const dayPanel = [];
    const weekdays = moment.weekdaysMin();
    // 星期日从第一个移动到最后一个
    weekdays.push(weekdays.shift());
    dayPanel.push(
      <div className='dt-picker-week' key='week'>{
        weekdays.map((day, index) => {
          const className = cx({
            'dt-picker-cell': true,
            'dt-picker-cell-weekend': index in Weekends
          });
          return <div className={className} key={index} >{day}</div>;
        })
      }</div>
    );

    const weeks = renderDayOfMonth(activeDate, (date, weekday, isCrossMonth) => {
      const formatted = date.format(ISOFormat.DATE);
      const isToday = formatted === moment().format(ISOFormat.DATE);
      const isSelected = formatted === moment(activeDate).format(ISOFormat.DATE);
      const isDisable = notIn(date, limit);
      const className = cx({
        'dt-picker-cell-day': true,
        'dt-picker-cell-cross-month': isCrossMonth,
        'dt-picker-cell-weekend': weekday in Weekends,
      });
      return (
        <PickerCell
          key={weekday}
          className={className}
          disable={isDisable}
          current={isToday}
          selected={isSelected}
          onClick={() => this.handleClick(date)}
        >
          {isToday ? '今' : date.date()}
        </PickerCell>
      );
    }, (days, key) => <div key={key}>{days}</div>);

    return dayPanel.concat(weeks);
  }

  renderMonth() {
    const {activeDate, limit} = this.props;
    const monthPanel = [];

    for (let i = 0; i < 12; i ++) {
      const newActiveDate = moment(activeDate).month(i);
      const isDisable = notIn(newActiveDate, limit, ISOFormat.MONTH);
      let className = cx({'dt-picker-cell-month': true});
      monthPanel.push(
        <PickerCell
          key={i}
          className={className}
          current={moment().month() === i}
          disable={isDisable}
          selected={activeDate.month() === i}
          onClick={() => this.handleClick(newActiveDate)}
        >
          {i + 1}月
        </PickerCell>
      );
    }
    return monthPanel;
  }

  renderYear() {
    const {activeDate, limit} = this.props;
    const year = activeDate.year();
    const yearPanel = [];

    for (let i = year - 4; i < year + 4; i ++) {
      const newActiveDate = moment(activeDate).year(i);
      const isDisable = notIn(newActiveDate, limit, ISOFormat.YEAR);
      let className = cx({'dt-picker-cell-year': true});
      yearPanel.push(
        <PickerCell
          key={i}
          className={className}
          current={moment().year() === i}
          disable={isDisable}
          selected={year === i}
          onClick={() => this.handleClick(newActiveDate)}
        >
          {i}年
        </PickerCell>
      );
    }
    return yearPanel;
  }

  renderDateTime() {
    return (
      <div>
        {this.renderDay()}
        {this.renderTime()}
      </div>
    );
  }

  renderTime() {
    const {activeDate, limit, pickerType} = this.props;
    const hourOptions = [];
    const minuteOptions = [];
    const secondOptions = [];

    const handleChange = (type, e) => {
      this.handleClick(moment(activeDate)[type](e.target.value));
    };

    function getOption(value, type) {
      const disabled = notIn(activeDate, limit, ISOFormat['DATE_' + type.toUpperCase()]);
      return (
        <option key={value} value={value} disabled={disabled}>
          {value < 10 ? '0' + value : value}
        </option>
      );
    }

    for (let i = 0; i < 60; i++) {
      if (i <= 23) {
        hourOptions.push(getOption(i, 'hour'));
      }

      minuteOptions.push(getOption(i, 'minute'));
      secondOptions.push(getOption(i, 'second'));
    }

    return (
      <div className='dt-picker-time'>
        <select
          value={activeDate.hour()}
          disabled={pickerType.value.indexOf('H') === -1}
          onChange={e => handleChange('hour', e)}
        >{hourOptions}</select>&nbsp;时&nbsp;
        <select
          value={activeDate.minute()}
          disabled={pickerType.value.indexOf('m') === -1}
          onChange={e => handleChange('minute', e)}
        >{minuteOptions}</select>&nbsp;分&nbsp;
        <select
          value={activeDate.second()}
          disabled={pickerType.value.indexOf('s') === -1}
          onChange={e => handleChange('second', e)}
        >{secondOptions}</select>&nbsp;秒&nbsp;
      </div>
    );
  }

  renderContent() {
    const {showType, pickerType} = this.props;

    if (showType === ShowType.YEAR) {
      return this.renderYear();
    } else if (showType === ShowType.MONTH) {
      return this.renderMonth();
    } else if (showType === ShowType.DAY) {
      if (pickerType.timeType) {
        return this.renderDateTime();
      }
      return this.renderDay();
    } else if (showType === ShowType.TIME) {
      return this.renderTime();
    }
    return null;
  }

  render() {
    return (
      <div className='dt-picker-body'>
        {this.renderContent()}
      </div>
    );
  }
}

export default PickerBody;
