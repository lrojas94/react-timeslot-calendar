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

const cal = new Calendar();

describe('Render tests', () => {
  test('Renders Correctly with min props.', () => {
    const onClickSpy = sinon.spy();
    const weeks = cal.generate();

    const tree = renderer.create(
      <Week
      weekToRender = { weeks[0] }
      onTimeslotClick = { onClickSpy }
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
      weekToRender = { weeks[0].slice(0, 3) }
      onTimeslotClick = { onClickSpy }
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
        weekToRender = { weeks[0] }
        onTimeslotClick = { onClickSpy }
      />
    );

    const timeslot = component.find(Timeslot).first();
    timeslot.simulate('click');

    expect(onClickSpy).toHaveProperty('callCount', 1);
  });
});
