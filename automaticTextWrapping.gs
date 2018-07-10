//goal: automatically wrap the text in a spreadsheet when a trigger occurs
//notes: great for displaying the results of form submissions
//notes: recommended trigger is "From spreadsheet - On form submit"
function textWrapping() {
  //insert correct sheet name below
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet Name');
  var range = sheet.getDataRange();

  //this is the one that matters
  range.setWrap(true);
  //this is an optional personal preference
  range.setHorizontalAlignment("left");
}
