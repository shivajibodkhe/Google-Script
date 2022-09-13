/*
 * Configure the library for Google APIs, using
 * domain-wide delegation (Service Account flow).
 * @see https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
 * @see https://developers.google.com/gmail/api/reference/rest/v1/users.settings/getVacation
 * @see https://github.com/shivajibodkhe/apps-script-oauth2
 * Add a OAuth2 Library in your apps script project 
 * Library code: 1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF
 */

// Private key and client email of the service account.
var PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n";
var CLIENT_EMAIL = "...";
const SERVICENAME = "gmailVacationSetting";

// Email address of the user to impersonate.
// var USER_EMAIL = Session.getActiveUser().getEmail();

function getService_(USER_EMAIL) {
  return (
    OAuth2.createService(SERVICENAME + ":" + USER_EMAIL)
      // Set the endpoint URL.
      .setTokenUrl("https://oauth2.googleapis.com/token")
      // Set the private key and issuer.
      .setPrivateKey(PRIVATE_KEY)
      .setIssuer(CLIENT_EMAIL)
      // Set the name of the user to impersonate. This will only work for
      // Google Apps for Work/EDU accounts whose admin has setup domain-wide
      // delegation:https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
      .setSubject(USER_EMAIL)
      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getScriptProperties())
      // Set the scope. This must match one of the scopes configured during the
      // setup of domain-wide delegation:https://developers.google.com/admin-sdk/directory/v1/guides/delegation
      .setScope(
        "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.settings.basic"
      )
  );
}
// Reset OAuth2 scope for current project

function reset() {
  getService_().reset();
}
