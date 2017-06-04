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

describe('Render tests', () => {
  test('Renders Correctly wtesth min props.', () => {
    const onClickSpy = sinon.spy();
    const tree = renderer.create(
      <Day
      onTimeslotClick = { onClickSpy }
      momentTime = { moment() }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Renders Correctly if timeslots is an array of strings.', () => {
    const onClickSpy = sinon.spy();
    const timeslots = [
      'now',
      'then',
      'later',
    ];

    const tree = renderer.create(
      <Day
      onTimeslotClick = { onClickSpy }
      momentTime = { moment() }
      timeslots = { timeslots }
      />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Renders Correctly if timeslots is an array of array.', () => {
    const onClickSpy = sinon.spy();
    const timeslots = [
      ['now', 'then', 'later'],
      ['then', 'later'],
      'later',
    ];

    const tree = renderer.create(
      <Day
      onTimeslotClick = { onClickSpy }
      momentTime = { moment() }
      timeslots = { timeslots }
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
        onTimeslotClick = { onClickSpy }
        renderTitle = { renderTitleSpy }
        momentTime = { moment() }
      />
    );

    expect(renderTitleSpy).toHaveProperty('callCount', 1);
  });

  test('Timeslot click triggers onTimeslotClick', () => {
    const onClickSpy = sinon.spy();
    const component = mount(
      <Day
        onTimeslotClick = { onClickSpy }
        momentTime = { moment() }
      />
    );

    const timeslot = component.find(Timeslot).first();
    timeslot.simulate('click');

    expect(onClickSpy).toHaveProperty('callCount', 1);
  });

  test('Renders 24 timeslots by default', () => {
    const onClickSpy = sinon.spy();
    const component = shallow(
      <Day
        onTimeslotClick = { onClickSpy }
        momentTime = { moment() }
      />
    );

    const timeslot = component.find(Timeslot);

    expect(timeslot).toHaveLength(24);
  });

  test('Renders only the amount of timeslots provided', () => {
    const onClickSpy = sinon.spy();
    const timeslots = [
      ['Start', 'End'],
      ['Start 2', 'End 2'],
    ];
    const component = shallow(
      <Day
        onTimeslotClick = { onClickSpy }
        momentTime = { moment() }
        timeslots = { timeslots }
      />
    );

    const timeslot = component.find(Timeslot);

    expect(timeslot).toHaveLength(2);
  });

});
