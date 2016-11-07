import {Component, PropTypes} from 'react';

class Inputer extends Component {
  static propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onActive: PropTypes.func.isRequired,
    iconClass: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    disabled: false,
    iconClass: ''
  };

  handleClick = () => {
    const {disabled} = this.props;
    !disabled && this.props.onActive();
  }

  render() {
    const {value, disabled, iconClass} = this.props;

    return (
      <div className='dt-picker-input'>
        <input
          type='text'
          onFocus={this.handleClick}
          value={value}
          onChange={() => {}}
          disabled={disabled}
        />
        <div className='dt-picker-input-addon' onClick={this.handleClick}>
          <i className={`dt-picker-input-icon ${iconClass}`}></i>
        </div>
      </div>
    );
  }
}

export default Inputer;
