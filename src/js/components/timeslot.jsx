import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  DEFAULT,
  SELECTED,
  DISABLED,
 } from 'constants/timeslot.js';

export default class Timeslot extends React.Component {
  render() {
    const {
      description,
      status,
      onClick,
    } = this.props;

    const timeslotClassNames = classnames({
      'tsc-timeslot': true,
      'tsc-timeslot--selected': status == SELECTED,
      'tsc-timeslot--disabled': status == DISABLED,
    });

    return (
      <div className= { timeslotClassNames } onClick = {onClick}>
        {description}
      </div>
    );
  }
}

Timeslot.propTypes = {
  description: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    DEFAULT,
    SELECTED,
    DISABLED,
  ]),
  onClick: PropTypes.func,
};
