import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import moment from 'moment';
import Calendar from 'calendarjs';
import {
  shallow,
  mount,
} from 'enzyme';

import Week from '../src/js/components/week';
import Day from '../src/js/components/day';
import Timeslot from '../src/js/components/timeslot';

import { DEFAULT_TIMESLOTS } from '../src/js/constants/day';

const cal = new Calendar(2017, 4);

describe('Render tests', () => {
  test('Renders Correctly with min props.', () => {
    const onClickSpy = sinon.spy();
    const weeks = cal.generate();

    const tree = renderer.create(
      <Week
        timeslots = { DEFAULT_TIMESLOTS }
        weekToRender = { weeks[0] }
        onTimeslotClick = { onClickSpy }
        initialDate = { moment([2017, 3, 28]).format() }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Expect to Render 3 Days', () => {
    const onClickSpy = sinon.spy();
    const weeks = cal.generate();

    const component = mount(
      <Week
        timeslots = { DEFAULT_TIMESLOTS }
        weekToRender = { weeks[0].slice(0, 3) }
        onTimeslotClick = { onClickSpy }
        initialDate = { moment([2017, 3, 28]).format() }
      />
    );

    const day = component.find(Day);

    expect(day).toHaveLength(3);
  });

  test('Timeslot click triggers onTimeslotClick', () => {
    const onClickSpy = sinon.spy();
    const weeks = cal.generate();

    const component = mount(
      <Week
        timeslots = { DEFAULT_TIMESLOTS }
        weekToRender = { weeks[0] }
        onTimeslotClick = { onClickSpy }
        initialDate = { moment([2017, 1, 1]).format() }
      />
    );

    const timeslot = component.find(Timeslot).not('.tsc-timeslot--disabled').first();
    timeslot.simulate('click');

    expect(onClickSpy).toHaveProperty('callCount', 1);
  });
});
