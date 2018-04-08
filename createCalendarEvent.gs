//goal: highlight a number of cells in a row, press a picture that acts as a button
//goal: then an event is created on a calendar based on the info highlighted
//notes: two of the cells will be date and time
//notes: in this example, one cell dictates which calendar it goes on
//notes: another cell is the name of the event, which also dictates the duration of the event
function eventToCal() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  //insert correct sheet name below
  var s = ss.getSheetByName('Sheet Name');
  var a = s.getActiveRange();
  var r = a.getRow();

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

  //this checks that you have selected the first column and fourth column, exactly 4 columns, and only 1 row - change as necessary
  if (a.getColumn() == 1 && a.getLastColumn() == 4 && a.getNumColumns() == 4 && a.getNumRows() == 1) {
    var cal = calendar(s.getRange(r, 3).getValue()); //for this, the calendar is in column 3
    var date = new Date(s.getRange(r, 1).getValue()); //for this, the date is in column 1
    var hourAdj = new Date(s.getRange(r, 2).getValue()).getHours(); //for this, the time is in column 2
    var minAdj = new Date(s.getRange(r, 2).getValue()).getMinutes();
    var startTime = date.setHours(hourAdj, minAdj);
    //this creates an event on the calendar specified in column 3
    //with the name given on column 4, on the date and time from columns 1 and 2
    cal.createEvent(s.getRange(r, 4).getValue(), new Date(startTime), new Date(startTime + (getDuration(s.getRange(r, 4).getValue()) * 60 * 1000)));
    //this grabs the calendar name from column 3 or TBD is no name specified
    var calText = s.getRange(r, 3).getValue() == '' ? 'TBD' : s.getRange(r, 3).getValue();
    //and gives us a text box message telling us the name of the event and where it was posted (and that we were successful)
    Browser.msgBox('Successfully posted ' + s.getRange(r, 4).getValue() + ' on ' + calText);
  }

  }

  //for the image button, just import an image into the sheet
  //right click the image and 'assign script'
  //give the name of the script (nameOfScript.gs) but without the .gs
  //only those who can edit the sheet can click on the image and execute the script
