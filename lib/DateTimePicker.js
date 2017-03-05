import moment from 'moment';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {pickerSingleton, PickerSingleton} from './Picker';
import Inputer from './Inputer';
import {ISOFormat, ShowType} from './consts';
import Util from './util';

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
    clearable: PropTypes.bool,
    // 输入框右侧图标样式，例如 'fa fa-calendar'
    inputIconClass: PropTypes.string
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
    pickerContainer.querySelector('input').addEventListener('click', e => e.stopPropagation());
    window.document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('click', this.handleBodyClick);
  }

  get value() {
    const {value, format} = this.props;
    let ret = value || null;
    if (value && typeof value === 'string') {
      ret = moment(value, format);
    }
    return ret;
  }

  get limit() {
    const {limit, format} = this.props;
    const newLimit = {};
    if (limit) {
      newLimit.min = limit.min;
      newLimit.max = limit.max;
      if (typeof limit.min === 'string') {
        newLimit.min = limit.min ? moment(limit.min, format) : null;
      }
      if (typeof limit.max === 'string') {
        newLimit.max = limit.max ? moment(limit.max, format) : null;
      }
    }
    return newLimit;
  }

  get pickerType() {
    const {format} = this.props;
    const formatObj = Util.parseFormat(format);
    formatObj.defaultShowType = formatObj.dateType
      ? formatObj.dateType.slice(-1)
      : ShowType.TIME;
    return formatObj;
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
    if (!this.refs.pickerContainer.contains(e.target)
      && !PickerSingleton.container.contains(e.target)
    ) {
      this.hidePanel();
    }
  }

  handleDateChange = (date) => {
    this.hidePanel();
    this.triggerChange(date);
  }

  handleClear = () => {
    this.hidePanel();
    this.triggerChange(typeof this.props.value === 'string' ? '' : null);
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
    const {clearable, position, startOf, endOf} = this.props;
    pickerSingleton.show({
      endOf, startOf,
      position, clearable,
      type: this.pickerType,
      value: this.value,
      limit: this.limit,
      target: this.refs.pickerContainer,
      onChange: this.handleDateChange,
      handleClear: this.handleClear
    });
  }

  render() {
    const {disabled, format, style, className, inputIconClass} = this.props;
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
          iconClass={inputIconClass}
        />
      </div>
    );
  }
}

export default DatetimePicker;
