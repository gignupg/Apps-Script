var token = "hidden";
var telegramUrl = "hidden" + token;
var webAppUrl = "hidden";
var ssId = "1nDvjny0p5myS2EHfUH6VX4p_LqinsQ1KR9m5LdQE7X0";
var enId = "1fYvQNbyti16gsUKW2SrDJTk2HC3c6ct6I--1UbAAytM";
var esId = "15t-VnYEwqqGtFurJdgQ89qGEgqCjAhIR6STZkBPDnOI";
var ankiIdEn = "1-daqfXLUKNyqC1IPjBbc8HTtGDQl1UMEJV-1awIYIWM";
var ankiIdEs = "1FhGPeU4lC92BEWCtOjsGB5jK4yFIms_GrjIpMWfXFes";

var ankiEn = SpreadsheetApp.openById(ankiIdEn);
var ankiSheetEn = ankiEn.getSheetByName("Anki");
var lastRowEn = ankiSheetEn.getLastRow();

var ankiEs = SpreadsheetApp.openById(ankiIdEs);
var ankiSheetEs = ankiEs.getSheetByName("Anki");
var lastRowEs = ankiSheetEs.getLastRow();

function test() {
  Logger.log(lastRowEs);
}

function getMe() {
  var url = telegramUrl + "/getMe"
  var response = UrlFetchApp.fetch(url);
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
}

function sendText(id, text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hey there!");
}

function doPost(e) {
  //This is where telegram comes into play.
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var name = data.message.chat.first_name;
  var answerEn = "Your question has been added!";
  var answerEs = "Una duda nueva ha sido añadida!";

  var docEn = DocumentApp.openById(enId)
  var bodyEn = docEn.getBody();
  var paragraphEn = bodyEn.insertParagraph(1, "");
  
  var docEs = DocumentApp.openById(esId)
  var bodyEs = docEs.getBody();
  var paragraphEs = bodyEs.insertParagraph(1, "");
  
//  var inputVar = "";
  
  if (/^nq/.test(text) || /^Nq/.test(text)) {
    sendText(id, answerEn);
    paragraphEn.appendText(text.replace(/^nq /, "").replace(/^Nq /, ""));
    bodyEn.insertParagraph(1, "");
  }
  
  if (/^dn/.test(text) || /^Dn/.test(text)) {
    sendText(id, answerEs);
    paragraphEs.appendText(text.replace(/^dn /, "").replace(/^Dn /, ""));
    bodyEs.insertParagraph(1, "");
  }
  
  if (/^al/.test(text) || /^Al/.test(text)) {
    var inputVar = text.split(" ");    
    var matcher1 = new RegExp(inputVar[1], "i");
    var matcher2 = new RegExp(inputVar[2], "i");
    var matcher3 = new RegExp(inputVar[3], "i");
        
    for (var i = 1; i <= lastRowEs; i++) {
      var getValuesEs = ankiSheetEs.getRange("A" + i + ":B" + i).getValues().toString();
      var valLeftEs = ankiSheetEs.getRange("A" + i).getValues().toString();
      var valRightEs = ankiSheetEs.getRange("B" + i).getValues().toString();
      
      var getValuesEn = ankiSheetEn.getRange("A" + i + ":B" + i).getValues().toString();
      var valLeftEn = ankiSheetEn.getRange("A" + i).getValues().toString();
      var valRightEn = ankiSheetEn.getRange("B" + i).getValues().toString();
      
      if (getValuesEn.match(matcher1) && inputVar[1] !== "") { 
        if (inputVar.length === 2) {
          sendText(id, valLeftEn + " - " + valRightEn); 
        } 
        else if (getValuesEn.match(matcher2) && inputVar[2] !== "") {
          if (inputVar.length === 3) {
            sendText(id, valLeftEn + " - " + valRightEn);
          } 
          else if (getValuesEn.match(matcher3) && inputVar[3] !== "") {
            if (inputVar.length >= 4) {
              sendText(id, valLeftEn + " - " + valRightEn);
            } 
          }
        }
      }
      if (getValuesEs.match(matcher1) && inputVar[1] !== "") { 
        if (inputVar.length === 2) {
          sendText(id, valLeftEs + " - " + valRightEs); 
        } 
        else if (getValuesEs.match(matcher2) && inputVar[2] !== "") {
          if (inputVar.length === 3) {
            sendText(id, valLeftEs + " - " + valRightEs);
          } 
          else if (getValuesEs.match(matcher3) && inputVar[3] !== "") {
            if (inputVar.length >= 4) {
              sendText(id, valLeftEs + " - " + valRightEs);
            } 
          }
        }
      }
    }
  }  
}

