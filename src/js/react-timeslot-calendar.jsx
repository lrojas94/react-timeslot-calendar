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
 * @type {Object} timeslotProps: An object with keys and values for timeslot props (format, viewFormat)
 * @type {Array} selectedTimeslots: Initial value for selected timeslot inputs. Expects Dates formatted as Strings.
 * @type {Array} disabledTimeslots: Initial value for selected timeslot inputs. Expects: StartDate, EndDate, Format.
 * @type {Integer} maxTimexlots: maximum ammount of timeslots to select.
 * @type {Object} renderDays: An array of days which states which days of the week to render. By default renders all days.
 * @type {Object} startDateInputProps: properties for the startDate Inputs. Includes name, class, type (hidden, text...)
 * @type {Object} endDateInputProps: properties for the endDate Inputs. Includes name, class, type (hidden, text...)
 * @type {Object} onSelectTimeslot: Function which takes as parameters 1) The array of selected timeslots and 2) The latest selected timeslot.
 */
ReactTimeslotCalendar.propTypes = {
  initialDate: PropTypes.string.isRequired,
  timeslots: PropTypes.array.isRequired,
  timeslotProps: PropTypes.object,
  selectedTimeslots: PropTypes.array,
  disabledTimeslots: PropTypes.array,
  maxTimeslots: PropTypes.number,
  renderDays: PropTypes.object,
  startDateInputProps: PropTypes.object,
  endDateInputProps: PropTypes.object,
  onSelectTimeslot: PropTypes.func,
};
