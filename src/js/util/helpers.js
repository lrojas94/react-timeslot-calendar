import moment from 'moment';

let helpers = {};
export default helpers;

helpers.getMomentFromCalendarJSDateElement = (dayElement) => {
  return moment([
    dayElement.year,
    dayElement.month - 1,
    dayElement.date,
  ]);
};
