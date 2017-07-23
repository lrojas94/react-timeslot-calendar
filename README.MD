# React Timeslot Calendar
[![Build Status](https://travis-ci.org/lrojas94/react-timeslot-calendar.svg?branch=master)](https://travis-ci.org/lrojas94/react-timeslot-calendar)

A calendar component which allows users to select and reserve avaiblable timeslots so that they can setup a meeting and/or event.

## Dependencies
* React 15.4.4 and up
* MomentJS
* CalendarJS

## Installation
```
npm install --save react-timeslot-calendar
```

## Usage:
```js
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';

...
render() {
  return (
    <ReactTimeslotCalendar
      initialDate={moment().format()}
    />
  );
}
...
```

## Props
### Required Props:
*Note*: All format strings are read with `moment`, so any format supported by `moment` is available here.


* **initialDate** (`String`): An ISO formatted date compatible with `momentJS`. A `moment` instance is also a valid input.

### Optional
* **timeslots** (`Object`): An array of available timeslots in the format:
```js
let timeslots = [
    ['1', '2'], // 1:00 AM - 2:00 AM
    ['2', '3'], // 2:00 AM - 3:00 AM
    ['4', '6'], // 4:00 AM - 6:00 AM
    '5', // 5:00 AM
    ['4', '6', '7', '8'], // 4:00 AM - 6:00 AM - 7:00AM - 8:00AM
];
```
By default, one hour timeslots from 12:00AM to 11:00PM are provided.

* **timeslotFormat** (`Object`): How the timeslots will be interpreted by the calendar. By default, the format goes as follows:
```js
let timslotFormat = {
    format: 'h', // Each element in the timeslot array is an Hour
    showFormat: 'h:mm A', // They will be displayed as Hour:Minutes AM/PM
}
```

* **disabledTimeslots** (`Object`): Timeslots disabled by default.  a `startDate` and `format` should be provided. The resulting date **must** match with one of the timeslots.
```js
// sample:
let disabledTimeslots = {[
    {
        startDate: 'April 30th 2017, 12:00:00 AM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },
    {
        startDate: 'May 1st 2017, 3:00:00 PM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },
    {
        startDate: 'May 5th 2017, 6:00:00 PM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },
]}
```
* **maxTimeslots** (`Number`): The maximum number of timeslots a user can select. Default value is **1**.

* **renderDays** (`Object`): Days of the week to be rendered in the calendar. As an example, if we wanted to remove weekends, all we have to do is pass:
```js
let ignoreWeekends = {
  'saturdays': false,
  'sundays': false,
};
```
By default, all week days are displayed.

* **startDateInputProps** (`Object`): Few props to modify how the input for `startDate` will behave. Only allows `name` and `class`.
```js
//sample
let startDateInputProps = {
    class: 'some-random-class',
    name: 'my-start-date-input-name',
};
```
* **endDateInputProps** (`Object`): Same idea as **startDateInputProps** but instead takes effect in the `endDate` input.

* **onSelectTimeslot** (`Function`): A callback which takes as parameters `selectedTimeslots (array)` and `lastSelectedTimeslot (object)`. Every timeslot object contains `startDate` and `endDate`, both of which are MomentJS objects.
```js
let onSelectTimeslot = (allTimeslots, lastSelectedTimeslot) => {
  /**
   * All timeslot objects include `startDate` and `endDate`.

   * It is important to note that if timelots provided contain a single
   * value (e.g: timeslots = [['8'], ['9', '10']) then only `startDate` is filled up with
   * the desired information.
   */
  console.log(lastSelectedTimeslot.startDate); // MomentJS object.

}
```
### Development
We're open to any help and support, so feel free to open up a PR if you happen to have a great idea! Also, feel free to take up any issues (if available).

Feel free to download the project and make up some changes! Dev. environment is run with `npm run dev`.
