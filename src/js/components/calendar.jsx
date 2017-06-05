import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarJS from 'calendarjs';
import Month from './month.jsx';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment(props.initialDate),
      selectedTimeslot: null,
    };
  }

  render() {
    return (
      <div className = "tsc-calendar">
        { this._renderActions() }
        { this._renderMonth() }
      </div>
    );
  }

  _renderActions() {
    const {
      currentDate,
    } = this.state;

    const actionTitle = `${currentDate.format('MMMM - YYYY')}`;

    return (
      <div className = "tsc-calendar__actions">
        <div className = "tsc-calendar__action tsc-calendar__action-element tsc-calendar__action-element--left" onClick = { this._onGoToPrevMonth.bind(this) }>
          &#8249;
        </div>
        <div className = "tsc-calendar__action tsc-calendar__action-title">
          { actionTitle }
        </div>
        <div className = "tsc-calendar__action tsc-calendar__action-element tsc-calendar__action-element--right" onClick = { this._onGoToNextMonth.bind(this) }>
          &#8250;
        </div>
      </div>
    );
  }

  _renderMonth() {
    const {
      currentDate,
    } = this.state;

    const {
      timeslots,
      initialDate,
    } = this.props;

    const cal = new CalendarJS(currentDate.year(), currentDate.month() + 1);
    const weeks = cal.generate();

    return (
      <Month
        currentDate = { currentDate }
        initialDate = { initialDate }
        weeks = { weeks }
        onWeekOutOfMonth = { this._onWeekOutOfMonth.bind(this) }
        onTimeslotSelected = { this._onTimeslotSelected.bind(this) }
        timeslots = { timeslots }
      />
    );
  }

  _onWeekOutOfMonth(updateDate) {
    this.setState({
      currentDate: updateDate,
    });

    return;
  }

  _onGoToNextMonth() {
    const {
      currentDate,
    } = this.state;

    let nextDate = currentDate
      .startOf('month')
      .add(1, 'months')
      .startOf('month');

    this.setState({
      currentDate: nextDate,
    });
  }

  _onGoToPrevMonth() {
    const {
      currentDate,
    } = this.state;

    let nextDate = currentDate
      .startOf('month')
      .subtract(1, 'months')
      .startOf('month');

    this.setState({
      currentDate: nextDate,
    });
  }

  _onTimeslotSelected(timeslot) {
    this.setState({
      selectedTimeslot: timeslot.utc(),
    });
  }

}

/**
 * @type {String} initialDate The initial date in which to place the calendar. Must be MomentJS parseable.
 * @type {Array} timeslots An array of timeslots to be displayed in each day.
 * @type {string} Initial value for timeslot input.
 */
Calendar.propTypes = {
  initialDate: PropTypes.string.isRequired,
  timeslots: PropTypes.array.isRequired,
  selectedTimeslot: PropTypes.string,
};
