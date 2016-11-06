import moment from 'moment';
import {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import PickerHeader from './PickerHeader';
import PickerBody from './PickerBody';
import PickerFooter from './PickerFooter';
import {ShowType} from './consts';

const TOP_VALUE_TO_HIDE = -2000;

class Picker extends Component {
  static propTypes = {
    position: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.object,
    target: PropTypes.object,
    type: PropTypes.object,
    startOf: PropTypes.bool,
    endOf: PropTypes.bool,
    visible: PropTypes.bool,
    handleClear: PropTypes.func,
    handleCancel: PropTypes.func,
    limit: PropTypes.object
  };

  static defaultProps = {
    position: '',
    type: {
      value: 'YMDHms', dateType: 'YMD',
      timeType: 'Hms', defaultShowType: ShowType.DAY,
      unit: 'second'
    },
    limit: {},
    visible: false
  }

  state = {
    showType: this.getShowType(),
    activeDate: this.getActiveDate()
  }

  componentDidMount() {
    // react 15 remove the React properties on this.refs
    this.pickerContent = this.refs.pickerContent.props
      ? ReactDOM.findDOMNode(this.refs.pickerContent)
      : this.refs.pickerContent;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showType: this.getShowType(nextProps), activeDate: this.getActiveDate(nextProps)});
  }

  /**
   * 实现自动调整到最合适的位置，避免选择器被隐藏而不可用
   */
  componentDidUpdate() {
    let {position, target, visible} = this.props;
    if (!visible) {
      this.pickerContent.style.top = `${TOP_VALUE_TO_HIDE}px`;
      return;
    }
    const {body} = window.document;
    const targetRect = target.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    const pickerRect = this.pickerContent.getBoundingClientRect();
    if (!position) {
      if (body.scrollHeight + bodyRect.top - targetRect.bottom >= pickerRect.height) {
        position = 'bottom';
      } else {
        position = 'top';
      }
      if (body.scrollWidth + bodyRect.left - targetRect.left >= pickerRect.width) {
        position += '-left';
      } else {
        position += '-right';
      }
    }

    if (position.indexOf('bottom') === 0) {
      this.pickerContent.style.top = targetRect.top - bodyRect.top + targetRect.height + 'px';
    } else {
      this.pickerContent.style.top = targetRect.top - bodyRect.top - pickerRect.height + 'px';
    }
    if (position.indexOf('left') >= 0) {
      this.pickerContent.style.left = targetRect.left - bodyRect.left + 'px';
    } else {
      this.pickerContent.style.left = targetRect.right - bodyRect.left - pickerRect.width + 'px';
    }
  }

  getActiveDate(props) {
    props = props || this.props;
    // props.value 为 null 的情况
    return props.value || this.getDateLimitted(moment());
  }

  getShowType(props) {
    props = props || this.props;
    return props.type.defaultShowType;
  }

  getDateLimitted(date) {
    const {startOf, endOf, type} = this.props;
    if (type.unit) {
      if (endOf) date.endOf(type.unit);
      else if (startOf) date.startOf(type.unit);
    }
    return date;
  }

  handleSure = () => {
    const {activeDate} = this.state;
    this.triggerChange(activeDate);
  }

  changeState = (date, showType) => {
    this.setState({showType, activeDate: this.getDateLimitted(date)});
  }

  handleBodyChange = (date, showType) => {
    const {showType: currentShowType} = this.state;
    if (currentShowType === this.getShowType()) {
      this.triggerChange(this.getDateLimitted(date));
    } else {
      this.changeState(date, showType);
    }
  }

  triggerChange(date) {
    this.props.onChange(moment(date));
  }

  render() {
    const {showType, activeDate} = this.state;
    const {
      handleClear, visible, type, handleCancel, limit
    } = this.props;

    const newStyle = {
      opacity: visible ? 1 : 0,
      top: TOP_VALUE_TO_HIDE,
    };

    return (
      <div
        ref='pickerContent'
        className={'dt-picker-content'}
        style={newStyle}
      >
        <PickerHeader
          showType={showType}
          pickerType={type}
          activeDate={activeDate}
          onChange={this.changeState}
        />
        <PickerBody
          limit={limit}
          showType={showType}
          pickerType={type}
          activeDate={activeDate}
          onChange={this.handleBodyChange}
        />
        <PickerFooter
          showType={showType}
          pickerType={type}
          activeDate={activeDate}
          onChange={this.changeState}
          handleClear={handleClear}
          handleSure={this.handleSure}
          handleCancel={handleCancel}
        />
      </div>
    );
  }
}


class PickerSingleton extends Component {
  static container = window.document.createElement('div');

  _config = {}

  state = {visible: false}

  constructor(props) {
    super(props);
    window.document.body.appendChild(PickerSingleton.container);
  }

  /**
   * 显示时间选择器
   * @param  {Object} config                 显示所需参数
   * @param  {Object} config.value           moment 对象
   * @param  {Object} config.position        显示的位置
   * @param  {Object} config.target          [Required]显示时依附的目标节点对象
   * @param  {Object} config.onChange        [Required]当日期选择改变时触发
   * @param  {Object} config.handleClear     [Required]当清除日期时触发
   * @param  {Object} config.limit           日期选择的可选择范围，{max, min}
   * @return {ReactElement}
   */
  show(config) {
    this._config = config;
    this.setState({visible: true});
    return this;
  }

  hide() {
    this.setState({visible: false});
  }

  handleCancel = () => {
    this.setState({visible: false});
  }

  render() {
    return (
      <Picker
        {...this._config}
        handleCancel={this.handleCancel}
        visible={this.state.visible}
      />
    );
  }
}

export default Picker;

export {PickerSingleton};
export const pickerSingleton = ReactDOM.render(<PickerSingleton />, PickerSingleton.container);
