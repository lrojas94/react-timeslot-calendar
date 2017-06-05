import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import '../../styles/main.scss';

import ReactTimeslotCalendar from './../react-timeslot-calendar.jsx';
import { DEFAULT_TIMESLOTS } from './../constants/day';

export default class App extends React.Component {
  render() {
    return (
      <div>
        React Timeslot Calendar!
        <ReactTimeslotCalendar
          initialDate = { moment().format() }
          timeslots = { DEFAULT_TIMESLOTS }
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-timeslot-calendar'));
