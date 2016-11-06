import moment from 'moment';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {pickerSingleton, PickerSingleton} from './picker';
import Inputer from './Inputer';
import {ISOFormat, MomentFormat, ShowType} from './consts';

class DatetimePicker extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    // 符合 moment 的时间格式化字符串，可以是 'YYYY年M月DD日'等比较特殊的格式
    // 支持一下几种选择器
    // YYYY，YYYY-MM， YYYY-MM-DD， YYYY-MM-DD HH，YYYY-MM-DD HH:mm，YYYY-MM-DD HH:mm:ss
    format: PropTypes.string,
    // 选择器和输入框对齐的位置
    // 值为['top-right', 'top-left','bottom-right', 'bottom-left']
    position: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    // 用来在触发日期变更前进行修改日期
    // startOf 和 endOf 只能二选其一，两个都提供，则只使用 endOf
    startOf: PropTypes.bool,
    endOf: PropTypes.bool,
    limit: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    clearable: PropTypes.bool
  };

  static defaultProps = {
    value: null,
    format: ISOFormat.DATE,
    disabled: false,
    clearable: true,
    limit: {min: null, max: null},
    className: ''
  };

  state = {visible: false}

  componentDidMount() {
    const {pickerContainer} = this.refs;
    this.container = pickerContainer;
    window.document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('click', this.handleBodyClick);
  }

  get value() {
    const {value, format} = this.props;
    let ret = value;
    if (typeof value === 'string') {
      ret = moment(value, format);
    }
    return ret;
  }

  get pickerType() {
    const {format} = this.props;
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
    const pickerType = dateType + timeType;
    return {
      dateType, timeType,
      unit: MomentFormat[pickerType.slice(-1)],
      value: pickerType,
      defaultShowType: dateType ? dateType.slice(-1) : ShowType.TIME
    };
  }

  getValueChanged(date) {
    if (!date) return null;

    const {value, format} = this.props;
    let ret = date;
    if (typeof value === 'string') {
      ret = date.format(format);
    } else {
      ret = date;
    }
    return ret;
  }

  handleBodyClick = (e) => {
    // React 事件冒泡在原生事件的冒泡之后进行，DOM -> body -> ReactNode -> ReactLastNode
    // 不能直接使用原生事件阻止 PickerSingleton.container 冒泡，
    // 这样将无法触发 React onClick 绑定的事件
    if (!this.container.contains(e.target) && !PickerSingleton.container.contains(e.target)) {
      this.hidePanel();
    }
  }

  handleDateChange = (date) => {
    this.hidePanel();
    this.triggerChange(date);
  }

  handleClear = () => {
    this.hidePanel();
    this.triggerChange(null);
  }

  hidePanel = () => {
    pickerSingleton.hide();
  }

  triggerChange(date) {
    const value = this.value;
    const {onChange, format} = this.props;
    if (date === value) return;
    if (value && date && typeof value === 'object' && typeof date === 'object') {
      if (value.format(format) === date.format(format)) {
        return;
      }
    }
    onChange(this.getValueChanged(date));
  }

  showPanel = () => {
    const {clearable, position, limit, startOf, endOf} = this.props;
    pickerSingleton.show({
      endOf, startOf,
      limit, position, clearable,
      type: this.pickerType,
      value: this.value,
      target: this.container,
      onChange: this.handleDateChange,
      handleClear: this.handleClear
    });
  }

  render() {
    const {disabled, format, style, className} = this.props;
    return (
      <div
        className={`dt-picker ${className}`}
        ref='pickerContainer'
        style={style}
      >
        <Inputer
          value={this.value ? this.value.format(format) : ''}
          disabled={disabled}
          onActive={this.showPanel}
        />
      </div>
    );
  }
}

export default DatetimePicker;
