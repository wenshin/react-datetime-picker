import cx from 'classnames';
import {PropTypes} from 'react';

export default function PickerCell(props) {
  const className = cx({
    'dt-picker-cell': true,
    'dt-picker-cell-disable': props.disable,
    'dt-picker-cell-current': props.current,
    'dt-picker-cell-selected': props.selected
  });

  return (
    <div
      className={`${className} ${props.className}`}
      onClick={!props.disable ? props.onClick : undefined}
    >
      {props.children}
    </div>
  );
}

PickerCell.propTypes = {
  className: PropTypes.string,
  disable: PropTypes.bool,
  current: PropTypes.bool,
  selected: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func
};

PickerCell.defaultProps = {
  className: '',
  disable: false,
  current: false,
  selected: false,
  children: null
};
