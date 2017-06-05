import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import Timeslot from '../src/js/components/timeslot';
import {
  shallow,
  mount,
} from 'enzyme';

import {
  DEFAULT,
  SELECTED,
  DISABLED,
} from '../src/js/constants/timeslot';

import { DEFAULT_TIMESLOTS } from '../src/js/constants/day';


it('Renders Correctly with All props.', () => {
  const onClickSpy = sinon.spy();
  const tree = renderer.create(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      status = { DEFAULT }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      customClassNames = "custom-class"
    />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});


it('Renders when customClassNames prop is not provided', () => {
  const onClickSpy = sinon.spy();
  const tree = renderer.create(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      status = { DEFAULT }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
    />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});

it('Renders when customClassNames is null', () => {
  const onClickSpy = sinon.spy();
  const tree = renderer.create(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      status = { DEFAULT }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      customClassNames = { null }
    />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});

it('Assumes default status if not provided', () => {
  const onClickSpy = sinon.spy();
  const timeslot = mount(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
    />
  );

  expect(timeslot.props().status).toEqual(DEFAULT);
});

it('Does not call parent onClick prop if status is Disabled', () => {
  const onClickSpy = sinon.spy();
  const timeslot = mount(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { DISABLED }
    />
  );

  timeslot.simulate('click');
  expect(onClickSpy).toHaveProperty('callCount', 0);
});

it('Does call parent onClick prop if status is Default', () => {
  const onClickSpy = sinon.spy();
  const timeslot = mount(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { DEFAULT }
    />
  );

  timeslot.simulate('click');
  expect(onClickSpy).toHaveProperty('callCount', 1);
});

it('Does call parent onClick prop if status is Selected', () => {
  const onClickSpy = sinon.spy();
  const timeslot = mount(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { SELECTED }
    />
  );

  timeslot.simulate('click');
  expect(onClickSpy).toHaveProperty('callCount', 1);
});

it('Has default tsc-timeslot class.', () => {
  const onClickSpy = sinon.spy();
  const timeslot = shallow(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { SELECTED }
    />
  );

  expect(timeslot.hasClass('tsc-timeslot')).toEqual(true);
});

it('Adds selected class when Status prop is Selected', () => {
  const onClickSpy = sinon.spy();
  const timeslot = shallow(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { SELECTED }
    />
  );

  expect(timeslot.hasClass('tsc-timeslot--selected')).toEqual(true);
});

it('Adds all classes in customClassNames when customClassNames is an object', () => {
  const onClickSpy = sinon.spy();
  const customClasses = {
    'added-class': true,
    'added-class-two': true,
  };

  const timeslot = shallow(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { SELECTED }
      customClassNames = { customClasses }
    />
  );

  expect(timeslot.is('.added-class.added-class-two')).toEqual(true);
});

it('Does not adds classes with value = false in customClassNames', () => {
  const onClickSpy = sinon.spy();
  const customClasses = {
    'not-added-class': false,
  };

  const timeslot = shallow(
    <Timeslot
      timeslots = { DEFAULT_TIMESLOTS }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { SELECTED }
      customClassNames = { customClasses }
    />
  );

  expect(timeslot.is('.not-added-class')).toEqual(false);
});
