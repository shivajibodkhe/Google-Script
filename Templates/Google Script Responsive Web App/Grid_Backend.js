var GRID_WORKSHETT = masterSheet.getSheetByName("Grid")
/**
 * this function will return all data from Grid worksheet
 * 
 */
function getGridData() {
  try {
    let gridData = GRID_WORKSHETT.getDataRange().getValues();
    //return Google Sheet Data
    return gridData;
  } catch (ex) {
    console.log(ex);
    return false;
  }
}
