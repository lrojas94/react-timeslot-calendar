import React from 'react';
import PropTypes from 'prop-types';
import helpers from './../util/helpers';
import Day from './day.jsx';

export default class Week extends React.Component {
  render() {

    return (
      <div className = 'tsc-week'>
        { this._renderWeekDays() }
      </div>
    );
  }

  _renderWeekDays() {
    const {
      weekToRender,
      initialDate,
      timeslots,
      timeslotProps,
      selectedTimeslots,
      disabledTimeslots,
      renderDays,
    } = this.props;

    return weekToRender.map((day, index) => {
      let formattedDate = helpers.getMomentFromCalendarJSDateElement(day);
      const weekDay = formattedDate.format('dddd').toLowerCase();
      if (renderDays[weekDay]){
        return (
          <Day
            key = { index }
            onTimeslotClick = { this._onTimeslotClick.bind(this) }
            initialDate = { initialDate }
            timeslots = { timeslots }
            timeslotProps = { timeslotProps }
            selectedTimeslots = { selectedTimeslots }
            disabledTimeslots = { disabledTimeslots }
            momentTime = { formattedDate }
            />
        );
      }
    });
  }

  _onTimeslotClick(timeslot) {
    const {
      onTimeslotClick,
    } = this.props;

    onTimeslotClick(timeslot);
  }
}

/**
 * @type {Array} weekToRender: Week to render. Each day should also have the requested timeslots, unless default configuration is desired.
 * @type {Function} onTimeslotClick: Function to be excecuted when clicked.
 * @type {Object} initialDate: Moment JS Date used to initialize the Calendar and which progresses further into the tree.
 * @type {Array} timeslots: Timeslots Set of Timeslot elements to render. Progresses further into the tree.
 * @type {Object} timeslotProps: An object with keys and values for timeslot props (format, viewFormat)
 * @type {Array} selectedTimeslots: Selected Timeslots Set used further into the tree to add the classes needed to when renderizing timeslots.
 * @type {Array} disabledTimeslots: Disabled Timeslots Set used further into the tree to add the classes needed to when renderizing timeslots.
 * @type {Object} renderDays: An array of days which states which days of the week to render. By default renders all days.
 */
Week.propTypes = {
  weekToRender: PropTypes.array.isRequired,
  onTimeslotClick: PropTypes.func.isRequired,
  initialDate: PropTypes.object.isRequired,
  timeslots : PropTypes.array.isRequired,
  timeslotProps: PropTypes.object,
  selectedTimeslots: PropTypes.array,
  disabledTimeslots: PropTypes.array,
  renderDays: PropTypes.object,
};
