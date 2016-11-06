import moment from 'moment';
import React, {Component, PropTypes} from 'react';
import {ShowType, MomentFormat} from './consts';

class PickerHeader extends Component {
  static propTypes = {
    showType: PropTypes.string.isRequired,
    pickerType: PropTypes.object.isRequired,
    activeDate: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleClick(date, showType) {
    this.props.onChange(date, showType);
  }

  render() {
    const {activeDate, showType, pickerType} = this.props;
    // 如果只选择时间，则不显示头部
    if (!pickerType.dateType) return null;

    const showMonth = pickerType.value !== ShowType.YEAR;

    let count = 1;
    let calcType = MomentFormat[ShowType.MONTH];
    if ([ShowType.MONTH, ShowType.YEAR].indexOf(showType) > -1) {
      calcType = MomentFormat[ShowType.YEAR];
      showType === ShowType.YEAR && (count = 8);
    }
    const prev = moment(activeDate).subtract(count, calcType);
    const next = moment(activeDate).add(count, calcType);

    return (
      <div className='dt-picker-header'>
        <div
          className='dt-picker-cell dt-picker-header-arrow'
          onClick={this.handleClick.bind(this, prev, showType)}
        >
          <i className='fa fa-chevron-left'></i>
        </div>

        <div
          className='dt-picker-cell dt-picker-cell-year'
          onClick={this.handleClick.bind(this, activeDate, ShowType.YEAR)}
        >
          {activeDate.year()}年
        </div>

        {showMonth && (
          <div
            className='dt-picker-cell dt-picker-cell-month'
            onClick={this.handleClick.bind(this, activeDate, ShowType.MONTH)}
          >
            {activeDate.month() + 1}月
          </div>
        )}

        <div
          className='dt-picker-cell dt-picker-header-arrow'
          onClick={this.handleClick.bind(this, next, showType)}
        >
          <i className='fa fa-chevron-right'></i>
        </div>
      </div>
    );
  }
}

export default PickerHeader;
