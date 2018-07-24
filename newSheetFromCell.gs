//goal: when two cells in a row are filled in, a new sheet is created
//goal: the names of the filled in cells combine to make the name of the new sheet
//goal: the new sheet will follow a template from another sheet
function createNewSheet() {
  //insert correct sheet name below
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Sheet Name');
  var cell = sheet.getActiveCell();
  var row = cell.getRow();

  //gets left and right cells - change column numbers as necessary
  var leftColumn = 1;
  var rightColumn = 2;
  var leftCell = sheet.getDataRange().getCell(row, leftColumn);
  var leftCellText = leftCell.getValue();
  var rightCell = sheet.getDataRange().getCell(row, rightColumn);
  var rightCellText = rightCell.getValue();

  //
  var templateSheet = spreadsheet.getSheetByName('Template Sheet Name');

  //checks to make sure both cells have text in them
  if (leftCellText != '' && rightCellText != '') {
    var textFromCells = leftCellText + ' ' + rightCellText;
    //checks to see if the sheet already exists
    if (spreadsheet.getSheetByName(textFromCells) != null) {
      Browser.msgBox('Sheet already exists named ' + textFromCells);
      //erases the text in the cells
      leftCell.setValue('');
      rightCell.setValue('');
    } else {
      //creates a new sheet with the name from the cells following the template
      spreadsheet.insertSheet(textFromCells, {template: templateSheet});
    }
  }
}

//to set the text of a cell equal to the name of the sheet, create another script
//enter this simple function:
//function SHEETNAME() {
//  return SpreadsheetApp.getActiveSpreadsheet().getActiveRange().getSheet().getName();
//}
//then put =SHEETNAME() in the cell where you want the name of the sheet