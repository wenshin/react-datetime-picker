import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import './init';
import '../lib/style.css';
import DatetimePicker from '../lib';


class App extends Component {
  state = {
    datetime: moment()
  }

  render() {
    return (
      <DatetimePicker
        value={this.state.datetime}
        onChange={datetime => this.setState({datetime})}
      />
    );
  }
}

ReactDOM.render(<App />, window.document.getElementById('app'));
