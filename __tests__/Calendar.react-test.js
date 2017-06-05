import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';

import Calendar from '../src/js/components/calendar';
import { DEFAULT_TIMESLOTS } from '../src/js/constants/day';

describe('Render tests', () => {
  test('Renders Correctly.', () => {
    const tree = renderer.create(
      <Calendar
        initialDate = { moment().format() }
        timeslots = { DEFAULT_TIMESLOTS }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
