import React from 'react';
import ReactDOM from 'react-dom';

import '../../styles/main.scss';

import Timeslot from './../components/timeslot.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        Timeslot CSS Test (Updated App)
        <Timeslot
          onClick = { null }
          description = { '1:00 AM - 2:00 AM' }
        />
        <Timeslot
          onClick = { null }
          status = { 'SELECTED' }
          description = { '1:00 AM - 2:00 AM' }
        />
        <Timeslot
          onClick = { null }
          status = { 'DISABLED' }
          description = { '1:00 AM - 2:00 AM' }
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-timeslot-calendar'));
