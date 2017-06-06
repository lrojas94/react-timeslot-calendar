import React from 'react';
import renderer from 'react-test-renderer';
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
});
