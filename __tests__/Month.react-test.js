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

const cal = new Calendar();

describe('Render tests', () => {
  test('Renders Correctly with min props.', () => {
    const weeks = cal.generate();
    const tree = renderer.create(
      <Month
        weeks = { weeks }
        date = { moment() }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Renders Correctly with all props.', () => {
    const weeks = cal.generate();
    const onGoToNextMonth = sinon.spy();
    const onGoToPrevMonth = sinon.spy();
    const tree = renderer.create(
      <Month
        weeks = { weeks }
        date = { moment() }
        onGoToPrevMonth = { onGoToPrevMonth }
        onGoToNextMonth = { onGoToNextMonth }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Functionality tests', () => {
  test('Current week contains date', () => {
    const weeks = cal.generate();
    const date = moment();
    const component = mount(
      <Month
        weeks = { weeks }
        date = { date }
      />
    );

    let weekIndex = null;
    weeks.some((week, index) => {
      let dateFound = week.some((day) => {
        return helpers.getMomentFromCalendarJSDateElement(day).format() === date.format();
      });

      if (dateFound) {
        weekIndex = index;
        return true;
      }
    });


    expect(component.state().currentWeekIndex).toEqual(weekIndex);
  });

  test('onGoToPrevMonth callback called if date is start of the month and user tries to go back', () => {
    const weeks = cal.generate();
    const date = moment().startOf('month');
    const onGoToPrevMonth = sinon.spy();
    const component = mount(
      <Month
        weeks = { weeks }
        date = { date }
        onGoToPrevMonth = { onGoToPrevMonth }
      />
    );

    component.find('.tsc-month__action-element--left').simulate('click');
    expect(onGoToPrevMonth).toHaveProperty('callCount', 1);
  });

  test('onGoToNextMonth callback called if date is end of the month and user tries to go next', () => {
    const weeks = cal.generate();
    const date = moment().endOf('month');
    const onGoToNextMonth = sinon.spy();
    const component = mount(
      <Month
        weeks = { weeks }
        date = { date }
        onGoToNextMonth = { onGoToNextMonth }
      />
    );

    component.find('.tsc-month__action-element--right').simulate('click');
    expect(onGoToNextMonth).toHaveProperty('callCount', 1);
  });

  test('Users can go to next week if available', () => {
    const weeks = cal.generate();
    const date = moment().startOf('month');
    const component = mount(
      <Month
        weeks = { weeks }
        date = { date }
      />
    );
    const weekIndexBeforeClick = component.state().currentWeekIndex;
    component.find('.tsc-month__action-element--right').simulate('click');
    const weekIndexAfterClick = component.state().currentWeekIndex;
    expect(weekIndexAfterClick).toEqual(weekIndexBeforeClick + 1);
  });

  test('Users can go to prev week if available', () => {
    const weeks = cal.generate();
    const date = moment().endOf('month');
    const component = mount(
      <Month
        weeks = { weeks }
        date = { date }
      />
    );

    const weekIndexBeforeClick = component.state().currentWeekIndex;
    component.find('.tsc-month__action-element--left').simulate('click');
    const weekIndexAfterClick = component.state().currentWeekIndex;
    expect(weekIndexAfterClick).toEqual(weekIndexBeforeClick - 1);
  });

});
