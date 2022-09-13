/**
 * @author Shivaji R Bodkhe<srbodkhe@gmail.com>
 * @see {https://developers.google.com/gmail/api/reference/rest/v1/users.settings/getVacation}
 * @see {https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority}
 * @see {https://developers.google.com/gmail/api/reference/rest/v1/users.settings/updateVacation}
 * 
 */

/** @function getVacation(userPrimaryEmail)
* this function will return users Vacation settings
*/
function getVacation(userPrimaryEmail) {
  try {
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
