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
    } = this.props;

    return weekToRender.map((day, index) => {
      let formattedDate = helpers.getMomentFromCalendarJSDateElement(day);
      return (
        <Day
          key = { index }
          onTimeslotClick = { this._onTimeslotClick.bind(this, index) }
          momentTime = { formattedDate }
          />
      );
    });
  }

  _onTimeslotClick() {
    const {
      onTimeslotClick,
    } = this.props;

    return onTimeslotClick();
  }
}

/**
 * @type {Array} weekToRender: Week to render. Each day should also have the requested timeslots, unless default configuration is desired.
 * @type {Function} onTimeslotClick: Function to be excecuted when clicked.
 */
Week.propTypes = {
  weekToRender: PropTypes.array.isRequired,
  onTimeslotClick: PropTypes.func.isRequired,
};
