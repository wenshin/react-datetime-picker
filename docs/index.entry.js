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
        style={{width: '300px'}}
        value={this.state.datetime}
        format='YYYY-MM-DD HH:mm:ss'
        limit={{min: '2016-10-10 12:00:00', max: '2017-01-01 20:30:30'}}
        onChange={datetime => this.setState({datetime})}
      />
    );
  }
}

ReactDOM.render(<App />, window.document.getElementById('app'));
