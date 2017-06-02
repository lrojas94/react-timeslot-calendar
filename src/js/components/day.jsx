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

    const {
      timeslotFormat,
      timeslotShowFormat,
      timeslots,
      onClick,

    } = this.props;

    const slots = timeslots.map((slot, index) => {
      let description = '';
      for (let i = 0; i < slot.length; i ++){
        description += moment(slot[i], timeslotFormat).format(timeslotShowFormat);
        if (i < (slot.length - 1)){
          description += ' - ';
        }
      }
      <Timeslot
        description={description}
        onClick={() => onClick(index)}
      />;
    });

    return (
      <div className={dayClassNames}>
        {slots}
      </div>
    );
  }
}

Day.defaultProps = {
  timeslotFormat: DEFAULT_TIMESLOT_FORMAT,
  timeslotShowFormat: DEFAULT_TIMESLOT_SHOW_FORMAT,
  timeslots: DEFAULT_TIMESLOTS,
};

Day.propTypes = {
  timeslotFormat: PropTypes.string.isRequired,
  timeslotShowFormat: PropTypes.string.isRequired,
  timeslots: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
