import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as moment from 'moment';
import Timeslot from 'timeslot';

import {
  DEFAULT_TIMESLOT_FORMAT,
  DEFAULT_TIMESLOT_SHOW_FORMAT,
  DEFAULT_TIMESLOTS,
} from 'constants/day.js';

export default class Day extends React.Component {

  render() {
    const dayClassNames = classnames({
      'tsc-day': true,
    });

    return (
      <div className={ dayClassNames }>
        { this._renderTimeSlots() }
      </div>
    );
  }

  _renderTimeSlots() {
    const {
      timeslotFormat,
      timeslotShowFormat,
      timeslots,
    } = this.props;

    return timeslots.map((slot, index) => {
      let description = '';
      for (let i = 0; i < slot.length; i ++){
        description += moment(slot[i], timeslotFormat).format(timeslotShowFormat);
        if (i < (slot.length - 1)){
          description += ' - ';
        }
      }
      <Timeslot
        key = { index }
        description = { description }
        onClick = { this._onTimeslotClick.bind(this, index) }
      />;
    });
  }

  _onTimeslotClick(index) {
    const {
      onClick,
    } = this.props;

    onClick(index);
  }
}

Day.defaultProps = {
  timeslotFormat: DEFAULT_TIMESLOT_FORMAT,
  timeslotShowFormat: DEFAULT_TIMESLOT_SHOW_FORMAT,
  timeslots: DEFAULT_TIMESLOTS,
};

/**
 * @type {String} timeslotFormat: format used by moment when identifying the timeslot
 * @type {String} timslotShowFormat: format to show used by moment when formating timeslot hours for final view.
 * @type {Array} timeslots: Array of timeslots.
 * @type {Function} onClick: Function to be excecuted when clicked.
 */
Day.propTypes = {
  timeslotFormat: PropTypes.string.isRequired,
  timeslotShowFormat: PropTypes.string.isRequired,
  timeslots: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
