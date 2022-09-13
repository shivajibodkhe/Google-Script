/**
 * @author Shivaji R Bodkhe<srbodkhe@gmail.com>
 * @see {https://developers.google.com/gmail/api/reference/rest/v1/users.settings/getVacation}
 * @see {https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority}
 * @see {https://developers.google.com/gmail/api/reference/rest/v1/users.settings/updateVacation}
 * 
 */

//Replace this id with your Google Sheet
const MSID = "1b0-NDRQ6q0zVlUbmAemFR3jGazmK49WAOfg1Z7CiQbI";
const masterSheet = SpreadsheetApp.openById(MSID).getSheetByName("Sheet1");
const CURRENTUSER = Session.getActiveUser().getEmail()
function MainData() {
  try {
    let sheetData = masterSheet.getDataRange().getValues();
    for (let i = 1; i < sheetData.length; i++) {
      var count = i + 1
      let row = sheetData[i];
      //status eq blank
      if (row[9] == "") {
        let startTime = row[7].getTime().toString();
        let endTime = row[8].getTime().toString();
        var status = updateVacationResponder_(row[0], row[1], row[2], row[3], row[4], row[5], row[6], startTime, endTime)
        masterSheet.getRange("J" + count + ":J" + count).setValue(status)
      }
    }
  } catch (ex) {
    Logger.log(ex);
  }
}
/***
 * 
 */

function updateVacationResponder_(primaryEmailAddress, enableAutoReply, responseSubject, responseBodyPlainText, responseBodyHtml, restrictToContacts, restrictToDomain, startTime, endTime) {
  try {
    var service = getService_(primaryEmailAddress);
    if (responseBodyPlainText != "") {
      var payload = {
        "enableAutoReply": enableAutoReply,
        "responseSubject": responseSubject,
        "responseBodyPlainText": responseBodyPlainText,
        "restrictToContacts": restrictToContacts,
        "restrictToDomain": restrictToDomain,
        "startTime": startTime,
        "endTime": endTime
      }
    } else {
      var payload = {
        "enableAutoReply": enableAutoReply,
        "responseSubject": responseSubject,
        "responseBodyHtml": responseBodyHtml,
        "restrictToContacts": restrictToContacts,
        "restrictToDomain": restrictToDomain,
        "startTime": startTime,
        "endTime": endTime,
      }
    }


    if (service.hasAccess()) {
      var urlPut = "https://gmail.googleapis.com/gmail/v1/users/" + primaryEmailAddress + "/settings/vacation";
      var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + service.getAccessToken()
        // "Basic "+ Utilities.base64Encode('Bearer'+service.getAccessToken())
      };
      var options = {
        "method": "put",
        "headers": headers,
        "payload": JSON.stringify(payload),
        "muteHttpExceptions": true
      };
      Logger.log(options)
      var resultPut = UrlFetchApp.fetch(urlPut, options);
      Logger.log(resultPut)
      return resultPut.getResponseCode()

    } else {
      Logger.log(service.getLastError());
    }
  } catch (ex) {
    Logger.log(ex);
    return 400
  }
}


/** @function getVacation(userPrimaryEmail)
* this function will return users Vacation settings
*/
function getVacation(userPrimaryEmail) {
  try {
    userPrimaryEmail=CURRENTUSER;
    var service = getService_(userPrimaryEmail);
    if (service.hasAccess()) {
      var url =
        "https://gmail.googleapis.com/gmail/v1/users/" + userPrimaryEmail + "/settings/vacation";
      var response = UrlFetchApp.fetch(url, {
        headers: {
          Authorization: "Bearer " + service.getAccessToken(),
        },
      });
      var result = JSON.parse(response.getContentText());
      Logger.log(JSON.stringify(result, null, 2));
    } else {
      Logger.log(service.getLastError());
    }
  } catch (ex) {
    console.error(ex);
  }
}
