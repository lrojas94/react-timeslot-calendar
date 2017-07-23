import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import moment from 'moment';
import {
  mount,
  shallow,
} from 'enzyme';
import Calendar from '../src/js/components/calendar';
import Timeslot from '../src/js/components/timeslot';
import { DEFAULT_TIMESLOTS } from '../src/js/constants/day';

describe('Render tests', () => {
  test('Renders Correctly.', () => {
    const tree = renderer.create(
      <Calendar
        initialDate = { moment([2017, 3, 28]).format() }
        timeslots = { DEFAULT_TIMESLOTS }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Expect timeslot selection to function with min props', () => {
    const component = mount(
      <Calendar
        initialDate = { moment().format() }
        timeslots = { DEFAULT_TIMESLOTS }
      />
    );

    const timeslot = component.find('.tsc-timeslot').not('.tsc-timeslot--disabled').first();
    timeslot.simulate('click');

    expect(component.state().selectedTimeslots).toHaveLength(1);
  });

  test('Expects a maximum of 2 selected timeslots', () => {
    const component = mount(
      <Calendar
        initialDate = { moment().format() }
        timeslots = { DEFAULT_TIMESLOTS }
        maxTimeslots = { 2 }
      />
    );

    const timeslots = component.find('.tsc-timeslot').not('.tsc-timeslot--disabled').slice(0,5);
    timeslots.forEach((timeslot) => {
      timeslot.simulate('click');
    });

    expect(component.state().selectedTimeslots).toHaveLength(2);
  });

  test('Expects onSelectTimeslot to be called as many times as timeslots are clicked', () => {
    const onSelectTimeslot = sinon.spy();
    const component = mount(
      <Calendar
        initialDate = { moment().format() }
        timeslots = { DEFAULT_TIMESLOTS }
        onSelectTimeslot = { onSelectTimeslot }
      />
    );

    const timeslots = component.find('.tsc-timeslot').not('.tsc-timeslot--disabled').slice(0,5);
    let clickCount = 0;
    timeslots.forEach((timeslot) => {
      timeslot.simulate('click');
      clickCount++;
    });

    expect(onSelectTimeslot).toHaveProperty('callCount', clickCount);
  });

  test('Expects 2 input elements after clicking a timeslot with min props.', () => {
    const component = mount(
      <Calendar
        initialDate = { moment().format() }
        timeslots = { DEFAULT_TIMESLOTS }
      />
    );

    const timeslot = component.find('.tsc-timeslot').not('.tsc-timeslot--disabled').first();
    timeslot.simulate('click');

    const inputs = component.findWhere(n => n.prop('name') == 'tsc-startDate' || n.prop('name') == 'tsc-endDate');

    expect(inputs).toHaveLength(2);
  });

  test('Expects 2 input elements with 1 custom name after clicking a timeslot', () => {
    const component = mount(
      <Calendar
        initialDate = { moment().format() }
        timeslots = { DEFAULT_TIMESLOTS }
        startDateInputProps = { {
          name: 'custom-startDate',
        } }
      />
    );

    const timeslot = component.find('.tsc-timeslot').not('.tsc-timeslot--disabled').first();
    timeslot.simulate('click');

    const inputs = component.findWhere(n => n.prop('name') == 'custom-startDate' || n.prop('name') == 'tsc-endDate');

    expect(inputs).toHaveLength(2);
  });

  test('Expects 4 input elements after clicking multiple timeslots', () => {
    const component = mount(
      <Calendar
        initialDate = { moment().format() }
        timeslots = { DEFAULT_TIMESLOTS }
        maxTimeslots = { 2 }
      />
    );

    const timeslots = component.find('.tsc-timeslot').not('.tsc-timeslot--disabled').slice(0,5);
    timeslots.forEach((timeslot) => {
      timeslot.simulate('click');
    });

    const inputs = component.findWhere(n => n.prop('name') == 'tsc-startDate[]' || n.prop('name') == 'tsc-endDate[]');

    expect(inputs).toHaveLength(4);
  });

  test('Expects 3 disabled timeslots based on props sent.', () => {
    const component = mount(
      <Calendar
        initialDate = { moment([2017, 3, 30]).format() }
        timeslots = { DEFAULT_TIMESLOTS }
        disabledTimeslots = { [
          {
            startDate: 'April 30th 2017, 12:00:00 AM',
            endDate: 'April 30th 2017, 1:00:00 AM',
            format: 'MMMM Do YYYY, h:mm:ss A',
          },
          {
            startDate: 'May 1st 2017, 3:00:00 PM',
            endDate: 'May 1st 2017, 4:00:00 PM',
            format: 'MMMM Do YYYY, h:mm:ss A',
          },
          {
            startDate: 'May 5th 2017, 6:00:00 PM',
            endDate: 'May 5th 2017, 7:00:00 PM',
            format: 'MMMM Do YYYY, h:mm:ss A',
          },
        ] }
      />
    );

    const disabledTimeslots = component.findWhere(timeslot => timeslot.prop('status') == 'DISABLED');

    expect(disabledTimeslots).toHaveLength(3);
  });
});
