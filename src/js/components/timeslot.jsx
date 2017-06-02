import React from 'react';
import PropTypes from 'prop-types';

import {
  DEFAULT,
  SELECTED,
  DISABLED,
 } from 'constants/timeslot.js';

export default class Timeslot extends React.Component {
  render() {
    const {
      startTime,
      endTime,
      status,
    } = this.props;

    const timeslotClassNames = classnames({
      'timeslot': true,
      'timeslot--selected': status == SELECTED,
      'timeslot--disabled': status == DISABLED,
    });

    return (
      <div className={timeslotClassNames}>
      {startTime} - {endTime}
      </div>
    );
  }
}

Timeslot.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    DEFAULT,
    SELECTED,
    DISABLED,
  ]),
}
