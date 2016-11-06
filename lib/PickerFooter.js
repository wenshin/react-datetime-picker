import moment from 'moment';
import React, {Component, PropTypes} from 'react';
import {ShowType} from './consts';

class PickerFooter extends Component {
  static propTypes = {
    showType: PropTypes.string,
    pickerType: PropTypes.object,
    activeDate: PropTypes.object,
    clearable: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    handleClear: PropTypes.func,
    handleSure: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
  }

  handleChooseNow = () => {
    const {onChange, showType} = this.props;
    onChange(moment(), showType);
  }

  handleClick = () => {
    this.props.handleSure();
  }

  getCurrentText() {
    const {showType, pickerType} = this.props;
    const currentTextObj = {
      [ShowType.DAY]: '今天',
      [ShowType.MONTH]: '本月',
      [ShowType.YEAR]: '今年',
    };
    if (pickerType.timeType) {
      return '当前';
    }
    return currentTextObj[showType];
  }

  render() {
    const {clearable, handleSure, handleClear, handleCancel} = this.props;
    return (
      <div className='dt-picker-footer'>
        <button
          className='dt-picker-btn-clear'
          onClick={this.handleChooseNow}
          type='button'
        >
          {this.getCurrentText()}
        </button>
        <button
          className='dt-picker-btn-sure'
          onClick={handleSure}
          type='button'
        >
          确定
        </button>
        {clearable ? (
          <button
            className='dt-picker-btn-clear'
            onClick={handleClear}
            type='button'
          >
            清空
          </button>
        ) : null}
        <button
          className='dt-picker-btn-cancel'
          onClick={handleCancel}
          type='button'
        >
          取消
        </button>
      </div>
    );
  }
}

export default PickerFooter;
