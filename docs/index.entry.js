import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import './init';
import DatetimePicker, {Period} from '../lib';
import '../lib/style.css';


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
                limit={{max: this.state.period}}
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
                limit={{
                  min: moment().subtract(5, 'day'),
                  max: moment().add(5, 'day')
                }}
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
