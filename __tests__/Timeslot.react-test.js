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

it('Renders Correctly with All props.', () => {
  const onClickSpy = sinon.spy();
  const tree = renderer.create(
    <Timeslot
      status = { DEFAULT }
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
    />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});

it('Assumes default status if not provided', () => {
  const onClickSpy = sinon.spy();
  const timeslot = mount(
    <Timeslot
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
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { SELECTED }
    />
  );

  expect(timeslot.hasClass('tsc-timeslot--selected')).toEqual(true);
});

it('Adds disabled class when Status prop is Disabled', () => {
  const onClickSpy = sinon.spy();
  const timeslot = shallow(
    <Timeslot
      onClick = { onClickSpy }
      description = "1:00 PM - 2:00 AM"
      status = { DISABLED }
    />
  );

  expect(timeslot.hasClass('tsc-timeslot--disabled')).toEqual(true);
});
