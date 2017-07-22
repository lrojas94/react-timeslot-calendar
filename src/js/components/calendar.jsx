import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarJS from 'calendarjs';
import Month from './month.jsx';

export default class Calendar extends React.Component {
  constructor(props) {

    super(props);

    this._updateInputProps(this.props.startDateInputProps, this.props.endDateInputProps);
    this._updateTimeslotProps(this.props.timeslotProps);
    this._updateRenderDays(this.props.renderDays);

    this.state = {
      currentDate: moment(props.initialDate),
      selectedTimeslots: [],
    };
  }

  render() {
    return (
      <div className = "tsc-calendar">
        { this._renderActions() }
        { this._renderMonth() }
        { this._renderInputs() }
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
      selectedTimeslots,
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
        initialDate = { moment(initialDate) }
        weeks = { weeks }
        onWeekOutOfMonth = { this._onWeekOutOfMonth.bind(this) }
        onTimeslotClick = { this._onTimeslotClick.bind(this) }
        timeslots = { timeslots }
        timeslotProps = { this.timeslotProps }
        selectedTimeslots = { selectedTimeslots }
        disabledTimeslots = { this._formatDisabledTimeslots() }
        renderDays = { this.renderDays }
      />
    );
  }

  _renderInputs() {
    const {
      selectedTimeslots,
    } = this.state;

    const {
      startDate,
      endDate,
    } = this.inputProps;

    //Determines if multiple input or single one.
    const inputPrefix = selectedTimeslots.length > 1 ? '[]' : '';

    return selectedTimeslots.map((timeslot, index) => {
      return (
        <div key = { index } >
          <input
            name = { startDate.name + inputPrefix }
            className = { startDate.class }
            type = { startDate.type }
            value = { timeslot.startDate.format() }
          />
          <input
            name = { endDate.name + inputPrefix }
            className = { endDate.class }
            type = { endDate.type }
            value = { timeslot.endDate.format() }
          />
        </div>
      );
    });
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

    let nextDate = currentDate.clone()
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

    let nextDate = currentDate.clone()
      .startOf('month')
      .subtract(1, 'months')
      .startOf('month');

    this.setState({
      currentDate: nextDate,
    });
  }

  _formatDisabledTimeslots() {
    const {
      disabledTimeslots,
    } = this.props;

    return disabledTimeslots.map((timeslot) => {
      let timeslotMoment = Object.assign({}, timeslot);
      timeslotMoment.startDate = moment(timeslotMoment.startDate, timeslotMoment.format);
      timeslotMoment.endDate = moment(timeslotMoment.endDate, timeslotMoment.format);

      return timeslotMoment;
    });
  }

  _onTimeslotClick(newTimeslot) {
    const {
      selectedTimeslots,
    } = this.state;

    const {
      maxTimeslots,
      onSelectTimeslot,
    } = this.props;

    const newSelectedTimeslots = selectedTimeslots.slice();

    let existentTimeslotIndex = -1;
    const timeslotExists = newSelectedTimeslots.some((timeslot, index) => {
      existentTimeslotIndex = index;
      return newTimeslot.startDate.format() === timeslot.startDate.format();
    });

    if (timeslotExists) {
      newSelectedTimeslots.splice(existentTimeslotIndex, 1);
    }
    else {
      newSelectedTimeslots.push(newTimeslot);
    }

    if (newSelectedTimeslots.length > maxTimeslots) {
      newSelectedTimeslots.splice(0, 1);
    }

    this.setState({
      selectedTimeslots: newSelectedTimeslots,
      currentDate: moment(newTimeslot.startDate),
    }, () => {
      // State was set:
      onSelectTimeslot && onSelectTimeslot(newSelectedTimeslots, newTimeslot);
    });
  }

  _updateInputProps(startDateInputProps, endDateInputProps) {
    const defaultStartDateProps = {
      name: 'tsc-startDate',
      classes: 'tsc-hidden-input',
      type: 'hidden',
    };

    const defaultEndDateProps = {
      name: 'tsc-endDate',
      classes: 'tsc-hidden-input',
      type: 'hidden',
    };

    this.inputProps = {
      startDate: Object.assign({}, defaultStartDateProps, startDateInputProps),
      endDate: Object.assign({}, defaultEndDateProps, endDateInputProps),
    };
  }

  _updateTimeslotProps(timeslotProps) {
    const defaultProps = {
      format: 'h',
      showFormat: 'h:mm A',
    };

    this.timeslotProps = Object.assign({}, defaultProps, timeslotProps);
  }

  _updateRenderDays(renderDays) {
    const defaultRenderDays = {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    };

    this.renderDays = Object.assign({}, defaultRenderDays, renderDays);
  }

  componentWillReceiveProps(nextProps) {
    this._updateInputProps(nextProps.startDateInputProps, nextProps.endDateInputProps);
    this._updateTimeslotProps(nextProps.timeslotProps);
    this._updateRenderDays(nextProps.renderDays);
  }

}

Calendar.defaultProps = {
  disabledTimeslots: [],
  maxTimeslots: 1,
  inputProps: {
    names: {},
  },
  startDateInputProps: {},
  endDateInputProps: {},
};

/**
 * @type {String} initialDate:  The initial date in which to place the calendar. Must be MomentJS parseable.
 * @type {Array} timeslots:  An array of timeslots to be displayed in each day.
 * @type {Object} timeslotProps: An object with keys and values for timeslot props (format, viewFormat)
 * @type {Array} selectedTimeslots: Initial value for selected timeslot inputs. Expects Dates formatted as Strings.
 * @type {Array} disabledTimeslots: Initial value for selected timeslot inputs. Expects Dates formatted as Strings.
 * @type {Integer} maxTimexlots: maximum ammount of timeslots to select.
 * @type {Object} renderDays: An array of days which states which days of the week to render. By default renders all days.
 * @type {Object} startDateInputProps: properties for the startDate Inputs. Includes name, class, type (hidden, text...)
 * @type {Object} endDateInputProps: properties for the endDate Inputs. Includes name, class, type (hidden, text...)
 */
Calendar.propTypes = {
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
