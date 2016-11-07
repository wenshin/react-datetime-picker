import moment from 'moment';
import React, {Component, PropTypes} from 'react';
import {ShowType, ShowText} from './consts';

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
      [ShowType.DAY]: ShowText.TODAY,
      [ShowType.MONTH]: ShowText.CUR_MONTH,
      [ShowType.YEAR]: ShowText.CUR_YEAR,
    };
    if (pickerType.timeType) {
      return ShowText.NOW;
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
          {ShowText.SURE}
        </button>
        {clearable ? (
          <button
            className='dt-picker-btn-clear'
            onClick={handleClear}
            type='button'
          >
            {ShowText.CLEAR}
          </button>
        ) : null}
        <button
          className='dt-picker-btn-cancel'
          onClick={handleCancel}
          type='button'
        >
          {ShowText.CANCEL}
        </button>
      </div>
    );
  }
}

export default PickerFooter;
