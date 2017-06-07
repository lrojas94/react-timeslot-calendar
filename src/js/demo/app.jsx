import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import '../../styles/main.scss';

import ReactTimeslotCalendar from './../react-timeslot-calendar.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        React Timeslot Calendar!
        <ReactTimeslotCalendar
          initialDate = { moment().format() }
          renderDays = { {
            sunday: false,
            saturday: false,
          } }
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-timeslot-calendar'));
