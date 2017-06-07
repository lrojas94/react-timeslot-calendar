import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import moment from 'moment';
import {
  shallow,
  mount,
} from 'enzyme';
import Day from '../src/js/components/day';
import Timeslot from '../src/js/components/timeslot';
import {
  DEFAULT_TIMESLOTS,
  DEFAULT_TIMESLOT_FORMAT,
  DEFAULT_TIMESLOT_SHOW_FORMAT,
} from '../src/js/constants/day';

describe('Render tests', () => {
  test('Renders Correctly with min props.', () => {
    const onClickSpy = sinon.spy();
    const tree = renderer.create(
      <Day
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        onTimeslotClick = { onClickSpy }
        momentTime = { moment([2017, 3, 28]) }
        initialDate = { moment([2017, 3, 28]) }
        selectedTimeslots = { [] }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Renders Correctly if timeslots is an array of strings.', () => {
    const onClickSpy = sinon.spy();
    const timeslots = [
      '0',
      '1',
      '2',
    ];

    const tree = renderer.create(
      <Day
        timeslots = { timeslots }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        onTimeslotClick = { onClickSpy }
        momentTime = { moment([2017, 3, 28]) }
        initialDate = { moment([2017, 3, 28]) }
        selectedTimeslots = { [] }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Renders Correctly if timeslots is an array of array.', () => {
    const onClickSpy = sinon.spy();
    const timeslots = [
      ['0', '1'],
      ['1', '2'],
      '3',
    ];

    const tree = renderer.create(
      <Day
      timeslots = { timeslots }
      timeslotProps = { {
        format: DEFAULT_TIMESLOT_FORMAT,
        showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
      } }
      disabledTimeslots = { [] }
      onTimeslotClick = { onClickSpy }
      momentTime = { moment([2017, 3, 28]) }
      initialDate = { moment([2017, 3, 28]) }
      selectedTimeslots = { [] }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Functionality tests', () => {
  test('Uses renderTitle function when provided', () => {
    const onClickSpy = sinon.spy();
    const renderTitleSpy = sinon.spy();
    const component = mount(
      <Day
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        onTimeslotClick = { onClickSpy }
        renderTitle = { renderTitleSpy }
        momentTime = { moment([2017, 3, 28]) }
        initialDate = { moment([2017, 3, 28]) }
        selectedTimeslots = { [] }
      />
    );

    expect(renderTitleSpy).toHaveProperty('callCount', 1);
  });

  test('Timeslot click triggers onTimeslotClick', () => {
    const onClickSpy = sinon.spy();
    const component = mount(
      <Day
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        onTimeslotClick = { onClickSpy }
        momentTime = { moment([2017, 3, 28]) }
        initialDate = { moment([2017, 3, 27]) }
        selectedTimeslots = { [] }
      />
    );

    const timeslot = component.find('.tsc-timeslot').not('.tsc-timeslot--disabled').first();
    timeslot.simulate('click');

    expect(onClickSpy).toHaveProperty('callCount', 1);
  });

  test('Renders 24 timeslots by default', () => {
    const onClickSpy = sinon.spy();
    const component = shallow(
      <Day
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        onTimeslotClick = { onClickSpy }
        momentTime = { moment([2017, 3, 28]) }
        initialDate = { moment([2017, 1, 1]) }
        selectedTimeslots = { [] }
      />
    );

    const timeslot = component.find(Timeslot);

    expect(timeslot).toHaveLength(24);
  });

  test('Renders only the amount of timeslots provided', () => {
    const onClickSpy = sinon.spy();
    const timeslots = [
      ['0', '1'],
      ['1', '2'],
    ];
    const component = shallow(
      <Day
        timeslots = { timeslots }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        onTimeslotClick = { onClickSpy }
        momentTime = { moment([2017, 3, 28]) }
        initialDate = { moment([2017, 3, 28]) }
        selectedTimeslots = { [] }
      />
    );

    const timeslot = component.find(Timeslot);

    expect(timeslot).toHaveLength(2);
  });

  test('Expect 12 disabled timeslots', () => {
    const onClickSpy = sinon.spy();
    const component = mount(
      <Day
        timeslots = { DEFAULT_TIMESLOTS }
        timeslotProps = { {
          format: DEFAULT_TIMESLOT_FORMAT,
          showFormat:DEFAULT_TIMESLOT_SHOW_FORMAT,
        } }
        disabledTimeslots = { [] }
        onTimeslotClick = { onClickSpy }
        momentTime = { moment([2017, 3, 28]) }
        initialDate = { moment([2017, 3, 28, 11]) }
        selectedTimeslots = { [] }
      />
    );

    const timeslot = component.find('.tsc-timeslot--disabled');

    expect(timeslot).toHaveLength(12);
  });

});
