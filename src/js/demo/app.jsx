import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Calendar from 'calendarjs';

import '../../styles/main.scss';

import Month from './../components/month.jsx';

export default class App extends React.Component {
  render() {
    let cal = new Calendar();
    return (
      <div>
        Timeslot CSS Test (Updated App)
        <Month
          date = { moment() }
          weeks = { cal.generate() }
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-timeslot-calendar'));
