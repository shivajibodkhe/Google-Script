
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  return template
    .evaluate() //Evaluates this template and returns an HtmlOutput object.
    .setTitle("DevFest22") //Sets the title of the output page.
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)// Sets the state of the page's X-Frame-Options header, which controls clickjacking prevention.
    .addMetaTag("viewport", "width=device-width, initial-scale=1") //Adds a meta tag to the page. Meta tags included directly in an Apps Script HTML file are ignored. Only the following meta tags are allowed:
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); //Sets the state of the page's X-Frame-Options header, which controls clickjacking prevention.

}


const MSID = "1WXQkGGL2XzAaEO87aBttypLM8WdDnNFqK7Rt24I5FAo";
const masterSheet = SpreadsheetApp.openById(MSID)
var CITY_WORKSHETT = masterSheet.getSheetByName("Cities");
var CURRENT_DATE = new Date()
var TIMEZONE = Session.getTimeZone();
function getCityList() {
  try {
    let cityData = CITY_WORKSHETT.getDataRange().getValues();
    return cityData;
  } catch (ex) {
    console.log(ex);
    throw "Error in city function"
  }
}



//save user values in google sheet
var FORM_WORKSHEET = masterSheet.getSheetByName("User Feedback");
function saveFormResponse(frmData) {
  console.info(frmData)
  let USERNAME = frmData['userName'];
  let USEREMAIL = frmData['userEmail'];
  let USERCITY = frmData['userCity'];
  let USERCOMMENTS = frmData['userComments']
  Logger.log([USERNAME, USEREMAIL, USERCITY, USERCOMMENTS])
  //generate UID for each response
  let responseId = getUID_()
  FORM_WORKSHEET.appendRow([responseId, USERNAME, USEREMAIL, USERCITY, USERCOMMENTS])

  return "Your response has been saved, your form ID is " + responseId

}


function getUID_() {
  let lastRow = FORM_WORKSHEET.getLastRow();
  let timeString = Utilities.formatDate(CURRENT_DATE, TIMEZONE, "yyyyMMddHHmm")
  return timeString + '_' + lastRow
}
