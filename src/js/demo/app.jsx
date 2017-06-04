import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import '../../styles/main.scss';

import Day from './../components/day.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        Timeslot CSS Test (Updated App)
        <Day
          onTimeslotClick = { () => {} }
          momentTime = { moment() }
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-timeslot-calendar'));
