import React from 'react';
import PropTypes from 'prop-types';

import '../styles/main.scss';
import Calendar from './components/calendar.jsx';
import {
  DEFAULT_TIMESLOTS,
} from './constants/day.js';


export default class ReactTimeslotCalendar extends React.Component {

  render() {
    return (
      <Calendar
        { ...this.props }
      />
    );
  }
}

ReactTimeslotCalendar.defaultProps = {
  timeslots: DEFAULT_TIMESLOTS,
};

/**
 * @type {String} initialDate:  The initial date in which to place the calendar. Must be MomentJS parseable.
 * @type {Array} timeslots:  An array of timeslots to be displayed in each day.
 * @type {string} selectedTimeslot: Initial value for timeslot input.
 * @type {Integer} maxTimexlots: maximum ammount of timeslots to select.
 * @type {Object} startDateInputProps: properties for the startDate Inputs. Includes name, class, type (hidden, text...)
 * @type {Object} endDateInputProps: properties for the endDate Inputs. Includes name, class, type (hidden, text...)
 */
ReactTimeslotCalendar.propTypes = {
  initialDate: PropTypes.string.isRequired,
  timeslots: PropTypes.array.isRequired,
  selectedTimeslots: PropTypes.string,
  maxTimeslots: PropTypes.number,
  inputProps: PropTypes.object,
  startDateInputProps: PropTypes.object,
  endDateInputProps: PropTypes.object,
};
