import {Component, PropTypes} from 'react';

class Inputer extends Component {
  static propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onActive: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: '',
    disabled: false
  };

  handleClick = () => {
    const {disabled} = this.props;
    !disabled && this.props.onActive();
  }

  render() {
    const {value, disabled} = this.props;

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
          <i className='fa fa-calendar'></i>
        </div>
      </div>
    );
  }
}

export default Inputer;
