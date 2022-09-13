/**
 *
 * Responsive web application using Google Apps Script & Bootstrap framewotk
 * Serves HTML of the application for HTTP GET requests.
 * @author Shivaji R Bodkhe <srbodkhe@gmail.com>
 * @param {Object} e event parameter that can contain information
 * @see APPURL?pageName=""
 */
//To get you Script Url
const APPURL = ScriptApp.getService().getUrl();
const CURRENT_USER = Session.getActiveUser().getEmail();
const LOCAL_USER = Session.getActiveUserLocale();
const URRENT_USER = Session.getScriptTimeZone();
const TEMP_ACTIVE_USER_KEY = Session.getTemporaryActiveUserKey();
const CURRENT_DATE = new Date();
const USER_AGENT = HtmlService.getUserAgent();
const APP_TITLE = "Web App Responsive..";
//It will wotk on Google workspace
const EFFECTIVE_USER = Session.getEffectiveUser().getEmail();
const OAUTH_TOKEN = ScriptApp.getOAuthToken();
const TIMEZONE = Session.getTimeZone();
var errorString = "";

//Rrplace this MSID with your Google Sheet
const MSID = "1WMD04KmYetYJ1aMjNqU46FccMM5CtElxxvg92iV4fP8";
const masterSheet = SpreadsheetApp.openById(MSID)


//Generate HTML page using doGet() function
function doGet(e) {
  try {
    console.info(e)
    var pageName = e.parameter.pageName;
    if (pageName) {
      pageName = pageName
    } else {
      pageName = "Index"
    }
    return htmlRender_(pageName)
  } catch (ex) {
    Logger.log(ex);
    errorString = ex;
    return htmlRender_("ErrorPage");
  }
}

// Build and return HTML in IFRAME sandbox mode.
function htmlRender_(pageName) {
  try {
    var template = HtmlService.createTemplateFromFile(pageName);
    return template
      .evaluate()
      .setTitle(pageName)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (e) {
    errorString = e;
    console.error(e);
    return htmlRender_("ErrorPage");
  }

}
