var dayEl = $('#currentDay');
var containerEl = $('.container');

var savedEvents = [];

// display current day at top of calendar
dayEl.text(moment().format("dddd, MMMM Do"));

// show timeblocks for each hour (military time!)
// for loop to append timeblock divs 
for (var i = 9; i <= 17; i++) {
    // create timeblock div
    var timeblockEl = $('<div>');
    timeblockEl.attr('class', 'time-block-'+i+' row');

    // show time
    var hourEl = $('<div>');
    hourEl.attr('class', 'hour col-1');
    hourEl.text(i + ":00");
    timeblockEl.append(hourEl);

    // create clickable space to add events
    var eventEl = $('<div>');
    var textareaEl = $('<textarea>');
    eventEl.append(textareaEl);
    // determine if past, present, or future
    // get current time
    var currentHour = moment().hour();
    if (i < currentHour) {
        eventEl.attr('class', 'past col-10');
    } else if (i > currentHour) {
        eventEl.attr('class', 'future col-10');
    } else {
        eventEl.attr('class', 'present col-10');
    }
    // TODO: populate events with data from localstorage
    timeblockEl.append(eventEl);

    // add save button
    // TODO: make button clickable
    var saveBtnEl = $('<button>');
    saveBtnEl.attr('class', 'saveBtn col-1 button');
    timeblockEl.append(saveBtnEl);

    containerEl.append(timeblockEl);
}

// populate calendar with values from localstorage
savedEvents = JSON.parse(localStorage.getItem("savedEvents"));
if (savedEvents) {
    for (var i = 0; i < savedEvents.length; i++) {
        var item = savedEvents[i];
        var timeblockEl = $('.'+item.className);
        timeblockEl[0].firstChild.nextSibling.firstChild.value = item.text;
    }
} else {
    savedEvents = [];
}

function handleSave(event) {
    // get time block class name and text value
    var savedItem = {
        className: event.target.parentElement.className.slice(0, -4),
        text: event.target.previousSibling.firstChild.value.trim()
    };

    savedEvents.push(savedItem);

    // save object to localstorage
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}

// click save button to save to local storage
document.querySelectorAll('.saveBtn').forEach(item => {
    item.addEventListener('click', handleSave)
})