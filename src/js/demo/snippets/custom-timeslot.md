```js
<ReactTimeslotCalendar
    initialDate = { moment([2017, 3, 24]).format() }
    timeslots = { [
        ['9', '10'],
        ['10', '11'],
        ['18'],
    ] }

    onSelectTimeslot={(timeslots, lastSelected) => {
        // Do stuff with timeslots.
        console.log(lastSelected.startDate);
    }}
/>
```
