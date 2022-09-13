// const MSID = "1WMD04KmYetYJ1aMjNqU46FccMM5CtElxxvg92iV4fP8";
// const masterSheet = SpreadsheetApp.openById(MSID)
var TABLE_WORKSHETT = masterSheet.getSheetByName("Tables")
/**
 * this function will display Google Sheet table data 
 * 
 */
function getTableData() {
  try {
    let tableData = TABLE_WORKSHETT.getDataRange().getDisplayValues();
    //return Google Sheet Data
    Logger.log(tableData)
    return tableData;
  } catch (ex) {
    console.log(ex);
    throw new Error( "More meaningful error." );
    // return false;
  }
}
