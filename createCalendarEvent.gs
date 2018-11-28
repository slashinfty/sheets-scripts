//goal: highlight a number of cells in a row, press a picture that acts as a button
//goal: then an event is created on a calendar based on the info highlighted
//notes: two of the cells will be date and time
//notes: in this example, one cell dictates which calendar it goes on
//notes: another cell is the name of the event, which also dictates the duration of the event
function createCalEvent() {
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

  //change these as necessary, but ensure they are sequential in a single row
  var dateColumn = 1;
  var timeColumn = 2;
  var calendarColumn = 3;
  var eventColumn = 4;

  //this checks that you aren't selecting multiple rows
  if (selected.getNumRows() == 1) {
    var cal = calendar(sheet.getRange(row, calendarColumn).getValue());
    var date = new Date(sheet.getRange(row, dateColumn).getValue());
    var hourAdj = new Date(sheet.getRange(row, timeColumn).getValue()).getHours();
    var minAdj = new Date(sheet.getRange(row, timeColumn).getValue()).getMinutes();
    var startTime = date.setHours(hourAdj, minAdj);
	var duration = getDuration(sheet.getRange(row, eventColumn).getValue();
	var eventName = sheet.getRange(row, eventColumn).getValue();
    //this creates an event on the calendar with the date, time, and name selected
    cal.createEvent(eventName, new Date(startTime), new Date(startTime + (duration * 60 * 1000)));
    //this grabs the calendar name or TBD is no name specified
    var calText = sheet.getRange(row, calendarColumn).getValue() == '' ? 'TBD' : sheet.getRange(row, calendarColumn).getValue();
    //and gives us a text box message telling us the name of the event and where it was posted (and that we were successful)
    Browser.msgBox('Successfully posted ' + eventName + ' on ' + calText);
  }

}

//for the image button, just import an image into the sheet
//right click the image and 'assign script'
//give the name of the script (nameOfScript.gs) but without the .gs
//only those who can edit the sheet can click on the image and execute the script
//only those who own or subscribe to the calendars can actually post events to the calendars
