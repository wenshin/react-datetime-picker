import {PropTypes} from 'react';
import DateTimePicker from './index';

export default function Period(props) {
  const {
    style, className, key, value, onChange, clearable,
    connector, format, limit, startEndOf, inputIconClass
  } = props;
  return (
    <div key={key} className={`period ${className || ''}`} style={style}>
      <DateTimePicker
        inputIconClass={inputIconClass}
        format={format}
        value={value.start}
        clearable={clearable}
        startOf={startEndOf}
        limit={{max: value.end, min: limit.min}}
        onChange={(v) => {
          value.start = v;
          onChange(value);
        }}
      />
      <span className='period__to'>{connector}</span>
      <DateTimePicker
        inputIconClass={inputIconClass}
        format={format}
        value={value.end}
        clearable={clearable}
        endOf={startEndOf}
        limit={{min: value.start, max: limit.max}}
        onChange={(v) => {
          value.end = v;
          onChange(value);
        }}
      />
    </div>
  );
}

Period.propTypes = {
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

Period.defaultProps = {
  value: {},
  connector: '-',
  inputIconClass: '',
  limit: {}
};
