
var CITY_WORKSHETT = masterSheet.getSheetByName("Cities")
function getCityList(){
  try{
 let cityData=CITY_WORKSHETT.getDataRange().getValues();
 return cityData;
  }catch(ex){
    console.log(ex);
    throw "Error in city function"
  }
}



//save user values in google sheet
var FORM_WORKSHEET=masterSheet.getSheetByName("Form")
function saveFormResponse(frmData){
  console.info(frmData)
 let USERNAME=frmData['userName'];
 let USEREMAIL=frmData['userEmail'];
 let USERCITY=frmData['userCity'];
 let USERCOMMENTS=frmData['userComments']
 Logger.log([USERNAME,USEREMAIL,USERCITY,USERCOMMENTS])
 //generate UID for each response
 let responseId=getUID_()
 FORM_WORKSHEET.appendRow([responseId,USERNAME,USEREMAIL,USERCITY,USERCOMMENTS])

  return "Your response has been saved, your form ID is "+responseId
 
}


function getUID_(){
let lastRow=FORM_WORKSHEET.getLastRow();
let timeString=Utilities.formatDate(CURRENT_DATE,TIMEZONE,"yyyyMMddHHmm")
return timeString+'_'+lastRow
}