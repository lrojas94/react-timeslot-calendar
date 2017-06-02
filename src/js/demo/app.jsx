import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  render() {
    return (
      <div> Hello from react o/! </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-timeslot-calendar'));
