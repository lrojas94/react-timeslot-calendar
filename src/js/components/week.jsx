import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Day from './Day.jsx';

export default class Week extends React.Component {
  render() {
    const weekClassNames = classnames({
      'tsc-week': true,
    });

    return (
      <div className = { weekClassNames }>
        { this._renderWeekDays() }
      </div>
    );
  }

  _renderWeekDays() {
    const {
      weekDays,
    } = this.props;

    return weekDays.map((day, index) => {
      if (day !== null && typeof day === 'object'){
        return (
          <Day
            key = { 'day_' + index }
            description = { day.description }
            timeslots = { day.timeslots }
            onClick = { this._onTimeslotClick.bind(this, index) }
          />
        );
      }
    });
  }
}

/**
 * @type {Array} weekDays: Days to render. Each day should also have the requested timeslots, unless default configuration is desired.
 */
Week.propTypes = {
  weekDays: PropTypes.array.isRequired,
};
