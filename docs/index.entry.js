import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import './init';
import DatetimePicker, {Period, Util} from '../lib';
import '../lib/style.css';


class App extends Component {
  state = {
    datetime: moment(),
    period: {},
    periodFormat: 'YYYY-MM-DD HH:mm:ss'
  };

  changePeriodFormat = (e) => {
    const {period} = this.state;
    const format = e.target.value;
    const typeObj = Util.parseFormat(format);
    period.start && period.start.startOf(typeObj.unit);
    period.end && period.end.endOf(typeObj.unit);
    this.setState({periodFormat: format, period});
  }

  render() {
    const {period, periodFormat} = this.state;
    console.log(period.start, period.end);
    const limit = {
      min: moment().subtract(5, 'day'),
      max: moment().add(5, 'day')
    };
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
                limit={limit}
                onChange={datetime => this.setState({datetime})}
              />
            </div>
          </section>
        </article>
        <article>
          <section>
            <h1>Period</h1>
            <select onChange={this.changePeriodFormat}>
              <option value='YYYY-MM-DD HH:mm:ss'>Datetime</option>
              <option value='YYYY-MM-DD'>Date</option>
              <option value='YYYY-MM'>Month</option>
              <option value='YYYY'>Year</option>
              <option value='HH:mm:ss'>Time</option>
              <option value='HH'>Hour</option>
              <option value='HH:mm'>Minute</option>
              <option value='HH:mm:ss'>Second</option>
            </select>
            <div>
              <Period
                startEndOf
                style={{width: '300px'}}
                value={period}
                format={periodFormat}
                limit={limit}
                onChange={p => this.setState({period: p})}
              />
            </div>
          </section>
        </article>
      </div>
    );
  }
}

ReactDOM.render(<App />, window.document.getElementById('app'));
