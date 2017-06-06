import React from 'react';
import PropTypes from 'prop-types';

import '../styles/main.scss';
import Calendar from './components/calendar.jsx';
import {
  DEFAULT_TIMESLOTS,
} from './constants/day.js';


export default class ReactTimeslotCalendar extends React.Component {

  render() {
    const {
      initialDate,
      timeslots,
      selectedTimeslot,
    } = this.props;

    return (
      <Calendar
        initialDate = { initialDate }
        timeslots = { timeslots }
        selectedTimeslot = { selectedTimeslot }
      />
    );
  }
}

ReactTimeslotCalendar.defaultProps = {
  timeslots: DEFAULT_TIMESLOTS,
};

/**
 * @type {String} initialDate The initial date in which to place the calendar. Must be MomentJS parseable.
 * @type {Array} timeslots An array of timeslots to be displayed in each day.
 * @type {string} Initial value for timeslot input.
 */
ReactTimeslotCalendar.propTypes = {
  initialDate: PropTypes.string.isRequired,
  timeslots: PropTypes.array.isRequired,
  selectedTimeslot: PropTypes.string,
};
