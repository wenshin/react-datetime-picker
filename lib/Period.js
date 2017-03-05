import {Component, PropTypes} from 'react';
import DateTimePicker from './DateTimePicker';

export default class Period extends Component {
  static propTypes = {
    key: PropTypes.string,
    value: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    format: PropTypes.string,
    connector: PropTypes.any,
    onChange: PropTypes.func,
    startEndOf: PropTypes.bool,
    limit: PropTypes.object,
    clearable: PropTypes.bool,
    inputIconClass: PropTypes.string
  };

  static defaultProps = {
    value: {},
    connector: '-',
    inputIconClass: '',
    limit: {}
  };

  render() {
    const {
      style, className, key, value, onChange, clearable,
      connector, format, limit, startEndOf, inputIconClass
    } = this.props;

    return (
      <div key={key} className={`period ${className || ''}`} style={style}>
        <DateTimePicker
          ref={picker => (this.startPicker = picker)}
          inputIconClass={inputIconClass}
          format={format}
          value={value.start}
          clearable={clearable}
          startOf={startEndOf}
          limit={limit}
          onChange={(v) => {
            value.start = v;
            value.end = v && value.end ? maxMoment(value.end, v) : value.end;
            if (startEndOf && value.end) {
              value.end.endOf(this.endPicker.pickerType.unit);
            }
            onChange(value);
          }}
        />
        <span className='period__to'>{connector}</span>
        <DateTimePicker
          ref={picker => (this.endPicker = picker)}
          inputIconClass={inputIconClass}
          format={format}
          value={value.end}
          clearable={clearable}
          endOf={startEndOf}
          limit={limit}
          onChange={(v) => {
            value.end = v;
            value.start = v && value.start ? minMoment(value.start, v) : value.start;
            if (startEndOf && value.start) {
              value.start.startOf(this.startPicker.pickerType.unit);
            }
            onChange(value);
          }}
        />
      </div>
    );
  }
}

function minMoment(moment1, momentToClone) {
  return moment1 < momentToClone ? moment1 : momentToClone.clone();
}

function maxMoment(moment1, momentToClone) {
  return moment1 > momentToClone ? moment1 : momentToClone.clone();
}
