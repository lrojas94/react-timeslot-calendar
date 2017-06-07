import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import moment from 'moment';
import Calendar from 'calendarjs';
import {
  mount,
} from 'enzyme';
import Month from '../src/js/components/month';
import helpers from '../src/js/util/helpers';

import { RENDER_DAYS } from '../src/js/constants/week';
import {
  DEFAULT_TIMESLOTS,
  DEFAULT_TIMESLOT_FORMAT,
  DEFAULT_TIMESLOT_SHOW_FORMAT,
 } from '../src/js/constants/day';

const cal = new Calendar(2017, 4);

describe('Render tests', () => {
  test('Renders Correctly with min props.', () => {
    const weeks = cal.generate();
    const tree = renderer.create(
      <Month
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        weeks = { weeks }
        currentDate = { moment([2017, 3, 1]) }
        initialDate = { moment([2017, 3, 28]) }
        selectedTimeslots = { [] }
        renderDays = { RENDER_DAYS }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Renders Correctly with all props.', () => {
    const weeks = cal.generate();
    const onWeekOutOfMonth = sinon.spy();
    const tree = renderer.create(
      <Month
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        weeks = { weeks }
        currentDate = { moment([2017, 3, 1]) }
        initialDate = { moment([2017, 3, 28]) }
        onWeekOutOfMonth = { onWeekOutOfMonth }
        selectedTimeslots = { [] }
        renderDays = { RENDER_DAYS }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Functionality tests', () => {
  test('Current week contains currentDate', () => {
    const weeks = cal.generate();
    const currentDate = moment([2017, 3, 1]);
    const component = mount(
      <Month
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        weeks = { weeks }
        currentDate = { currentDate }
        initialDate = { moment([2017, 3, 28]) }
        selectedTimeslots = { [] }
        renderDays = { RENDER_DAYS }
      />
    );

    let weekIndex = null;
    weeks.some((week, index) => {
      let currentDateFound = week.some((day) => {
        return helpers.getMomentFromCalendarJSDateElement(day).format() === currentDate.format();
      });

      if (currentDateFound) {
        weekIndex = index;
        return true;
      }
    });


    expect(component.state().currentWeekIndex).toEqual(weekIndex);
  });

  test('onWeekOutOfMonth callback called if currentDate is start of the month and user tries to go back', () => {
    const weeks = cal.generate();
    const currentDate = moment([2017, 3, 1]).startOf('month');
    const onWeekOutOfMonth = sinon.spy();
    const component = mount(
      <Month
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        weeks = { weeks }
        currentDate = { currentDate }
        initialDate = { moment([2017, 3, 28]) }
        onWeekOutOfMonth = { onWeekOutOfMonth }
        selectedTimeslots = { [] }
        renderDays = { RENDER_DAYS }
      />
    );

    component.find('.tsc-month__action-element--left').simulate('click');
    expect(onWeekOutOfMonth).toHaveProperty('callCount', 1);
  });

  test('onWeekOutOfMonth callback called if currentDate is end of the month and user tries to go next', () => {
    const weeks = cal.generate();
    const currentDate = moment([2017, 3, 1]).endOf('month');
    const onWeekOutOfMonth = sinon.spy();
    const component = mount(
      <Month
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        weeks = { weeks }
        currentDate = { currentDate }
        initialDate = { moment([2017, 3, 28]) }
        onWeekOutOfMonth = { onWeekOutOfMonth }
        selectedTimeslots = { [] }
        renderDays = { RENDER_DAYS }
      />
    );

    component.find('.tsc-month__action-element--right').simulate('click');
    expect(onWeekOutOfMonth).toHaveProperty('callCount', 1);
  });

  test('Users can go to next week if available', () => {
    const weeks = cal.generate();
    const currentDate = moment([2017, 3, 1]).startOf('month');
    const component = mount(
      <Month
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        weeks = { weeks }
        currentDate = { currentDate }
        initialDate = { moment([2017, 3, 28]) }
        selectedTimeslots = { [] }
        renderDays = { RENDER_DAYS }
      />
    );
    const weekIndexBeforeClick = component.state().currentWeekIndex;
    component.find('.tsc-month__action-element--right').simulate('click');
    const weekIndexAfterClick = component.state().currentWeekIndex;
    expect(weekIndexAfterClick).toEqual(weekIndexBeforeClick + 1);
  });

  test('Users can go to prev week if available', () => {
    const weeks = cal.generate();
    const currentDate = moment([2017, 3, 1]).endOf('month');
    const component = mount(
      <Month
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        weeks = { weeks }
        currentDate = { currentDate }
        initialDate = { moment([2017, 3, 28]) }
        selectedTimeslots = { [] }
        renderDays = { RENDER_DAYS }
      />
    );

    const weekIndexBeforeClick = component.state().currentWeekIndex;
    component.find('.tsc-month__action-element--left').simulate('click');
    const weekIndexAfterClick = component.state().currentWeekIndex;
    expect(weekIndexAfterClick).toEqual(weekIndexBeforeClick - 1);
  });

});
