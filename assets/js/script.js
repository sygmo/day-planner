var dayEl = $('#currentDay');
var containerEl = $('.container');

// display current day at top of calendar
dayEl.text(moment().format("dddd, MMMM Do"));

// show timeblocks for each hour (military time!)
// for loop to append timeblock divs 
for (var i = 9; i <= 17; i++) {
    // create timeblock div
    var timeblockEl = $('<div>');
    timeblockEl.attr('class', 'time-block row');

    // show time
    var hourEl = $('<div>');
    hourEl.attr('class', 'hour col-1');
    hourEl.text(i + ":00");
    timeblockEl.append(hourEl);

    // create clickable space to add events
    // determine if past, present, or future
    var eventEl = $('<div>');
    // get current time
    var currentHour = moment().hour();
    if (i < currentHour) {
        eventEl.attr('class', 'past col-10');
    } else if (i > currentHour) {
        eventEl.attr('class', 'future col-10');
    } else {
        eventEl.attr('class', 'present col-10');
    }
    timeblockEl.append(eventEl);

    // add save button
    // TODO: make button clickable
    var saveBtnEl = $('<div>');
    saveBtnEl.attr('class', 'saveBtn col-1');
    saveBtnEl.html('<img src="assets/images/floppy-disk.png" alt="save button">');
    timeblockEl.append(saveBtnEl);

    containerEl.append(timeblockEl);
}

// click timeblock to enter an event

// click save button to save to local storage