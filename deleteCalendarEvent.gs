//goal: select a cell in a row, press a picture that acts as a button
//goal: then any events are matching the info highlighted are deleted on a calendar
//notes: two of the cells will be date and time
//notes: in this example, one cell dictates which calendar it goes on
//notes: another cell is the name of the event, which also dictates the duration of the event
function deleteCalEvent() {
  //insert correct sheet name below
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet Name');
  var selected = sheet.getActiveRange();
  var row = selected.getRow();

  //to find a calendar ID, go to your google calendar settings
  //click on the calendar on the left under 'settings for my calendars'
  //scroll down to 'integrate calendar' and find 'calendar ID'
  function calendar(cal) {
    switch(cal) {
      case 'Calendar 1 Name': //whatever you put in the spreadsheet
        return CalendarApp.getCalendarById('insert-calendar-id-here@group.calendar.google.com');
        break;
      case 'Calendar 2 Name': //whatever you put in the spreadsheet
        return CalendarApp.getCalendarById('insert-calendar-id-here@group.calendar.google.com');
        break; //add as many cases as you have calendar options
      default: //default case if you have a calendar for TBD events
        return CalendarApp.getCalendarById('insert-calendar-id-here@group.calendar.google.com');
        break;
    }
  }

  function getDuration(event) {
    var duration = {
      'Event 1 Name': 30, //these durations are in minutes
      'Event 2 Name': 60,
      'Event 3 Name': 90,
      //add more as needed
      //default if you have an event that is not listed
      'default': 30
    };
    return (duration[event] || duration['default']);
  }

  //change these as necessary
  var dateColumn = 1;
  var timeColumn = 2;
  var calendarColumn = 3;
  var eventColumn = 4;

  //this checks that you aren't selecting multiple rows
  if (selected.getNumRows() == 1) {
    var cal = calendar(sheet.getRange(row, calendarColumn).getValue()); //for this, the calendar is in column 3
    var date = new Date(sheet.getRange(row, dateColumn).getValue()); //for this, the date is in column 1
    var hourAdj = new Date(sheet.getRange(row, timeColumn).getValue()).getHours(); //for this, the time is in column 2
    var minAdj = new Date(sheet.getRange(row, timeColumn).getValue()).getMinutes();
    var startTime = date.setHours(hourAdj, minAdj);
	var duration = getDuration(sheet.getRange(row, eventColumn).getValue());
	var eventName = sheet.getRange(row, eventColumn).getValue();
    //this grabs all events (should be one) on the calendar specified that match the date, time, and name
    var events = cal.getEvents(new Date(startTime), new Date(startTime + (duration * 60 * 1000)), {search: eventName});
    if (events.length > 0) { //if it finds any events
      for each (var event in events) { //loop, in case multiple have been created
        event.deleteEvent();
      }
      //this grabs the calendar name or TBD is no name specified
      var calText = sheet.getRange(row, calendarColumn).getValue() == '' ? 'TBD' : sheet.getRange(row, calendarColumn).getValue();
      //this erases the calendar cell after the event has been deleted (optional)
      sheet.getRange(row, calendarColumn).setValue('');
      //and gives us a text box message telling us the name of the event and where it was posted (and that we were successful)
      Browser.msgBox('Successfully deleted ' + sheet.getRange(row, eventColumn).getValue() + ' on ' + calText);
  }

}

//for the image button, just import an image into the sheet
//right click the image and 'assign script'
//give the name of the script (nameOfScript.gs) but without the .gs
//only those who can edit the sheet can click on the image and execute the script
//only those who own or subscribe to the calendars can actually delete events to the calendars
