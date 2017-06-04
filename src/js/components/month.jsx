import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import helpers from './../util/helpers';

export default class Month extends React.Component {
  constructor(props) {
    super(props);

    const {
      date,
      weeks,
    } = this.props;

    // find out staring week:
    const dateWithoutTime = date.startOf('day');
    let startingWeek  = 0;
    weeks.some((week, index) => {
      let weekContainsDate = week.some((day) => {
        const momentDay = helpers.getMomentFromCalendarJSDateElement(day);
        return momentDay.format() === dateWithoutTime.format();
      });

      if (weekContainsDate) {
        startingWeek = index;
        return weekContainsDate;
      }

    });

    this.state = {
      currentWeekIndex: startingWeek,
    };
  }

  render() {
    return (
      <div className = "tsc-month">
        { this._renderTitle() }
        { this._renderActions() }
      </div>
    );
  }

  _renderTitle() {
    const {
      date,
    } = this.props;

    return (
      <div className = "tsc-month__title">
        <span>{ date.format('MMMM') }</span>
      </div>
    );
  }

  _renderActions() {
    const {
      weeks,
    } = this.props;

    const {
      currentWeekIndex,
    } = this.state;

    const currentWeek = weeks[currentWeekIndex];
    const startDate = helpers.getMomentFromCalendarJSDateElement(currentWeek[0]);
    const endDate = helpers.getMomentFromCalendarJSDateElement(currentWeek[currentWeek.length - 1]);
    const actionTitle = `${startDate.format('Do')} - ${endDate.format('Do')}`;

    return (
      <div className = "tsc-month__actions">
        <div className = "tsc-month__action-element--left" onClick = { this._onPrevWeekClicked.bind(this) }>
        </div>
        <div className = "tsc-month__action-title">
          { actionTitle }
        </div>
        <div className = "tsc-month__action-element--right" onClick = { this._onNextWeekClicked.bind(this) }>
        </div>
      </div>
    );
  }

  /**
   * Handles prev week button click.
   */
  _onPrevWeekClicked() {
    const {
      currentWeek,
    } = this.state;

    const {
      onGoToPrevMonth,
    } = this.props;

    if (currentWeek - 1 >= 0) {
      this.setState({
        currentWeek: currentWeek - 1,
      });
    }
    else {
      onGoToPrevMonth();
    }
  }

  /**
   * Handles next week button click.
   */
  _onNextWeekClicked() {
    const {
      currentWeek,
    } = this.state;

    const {
      weeks,
      onGoToNextMonth,
    } = this.props;

    if (currentWeek + 1 < weeks.length()) {
      this.setState({
        currentWeek: currentWeek + 1,
      });
    }
    else {
      onGoToNextMonth();
    }
  }
}

/**
* @type {Object} date: Base date to get the month from - Usually first day of the month
* @type {Array} weeks: A list of weeks based on calendarJS
* @type {Function} onGoToNextMonth: A callback to call when user goes out of the month to next month
* @type {Function} onGoToPrevMonth: A callback to call when user goes out of the month to prev month
 */
Month.propTypes = {
  date: PropTypes.object.isRequired,
  weeks: PropTypes.array.isRequired,
  onGoToNextMonth: PropTypes.func,
  onGoToPrevMonth: PropTypes.func,
};
