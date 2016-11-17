import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import './init';
import DatetimePicker, {Period} from '../webpack';


class App extends Component {
  state = {
    datetime: moment(),
    period: {}
  }

  render() {
    return (
      <div>
        <article>
          <section>
            <h1>DateTimePicker</h1>
            <div>
              <DatetimePicker
                style={{width: '300px'}}
                value={this.state.datetime}
                format='YYYY-MM-DD HH:mm:ss'
                limit={{min: '2016-10-10 12:00:00', max: '2017-01-01 20:30:30'}}
                onChange={datetime => this.setState({datetime})}
              />
            </div>
          </section>
        </article>
        <article>
          <section>
            <h1>Period</h1>
            <div>
              <Period
                style={{width: '300px'}}
                value={this.state.period}
                format='YYYY-MM-DD HH:mm:ss'
                limit={{min: '2016-10-10 12:00:00', max: '2017-01-01 20:30:30'}}
                onChange={period => this.setState({period})}
              />
            </div>
          </section>
        </article>
      </div>
    );
  }
}

ReactDOM.render(<App />, window.document.getElementById('app'));
