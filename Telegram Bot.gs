var token = "hidden";
var telegramUrl = "hidden" + token;
var webAppUrl = "hidden";
var myId = {
  en: "1x3F2l52fpJVA0XSnIcG1KKS0YN1evXTKf9VzDlYH-uI",
  es: "1O5c1fpQ_-jHymuExE9UOmp9MQmxYCF2kVuvKXJegBQU",
  fr: "1ntQ6ZPmKjXOyqhy737-lpFyIOesH1orDn3ixGQfRJpM",
  re: "1mIZfFsZWCGm1rYewICDOYBzo7RMDmUKax829CQzZFkE",
  "new": "1-daqfXLUKNyqC1IPjBbc8HTtGDQl1UMEJV-1awIYIWM",
  "nuevo": "1FhGPeU4lC92BEWCtOjsGB5jK4yFIms_GrjIpMWfXFes",
  "nouveau": "1dtnrjzfB5tlBhzHoQJJbMiB4xc41YoYgJrcbbxkiuoU"
};

var myAnswer = {
  en: "Your question has been added!",
  es: "Una duda nueva ha sido añadida!",
  fr: "On a ajouté ton question!",
  re: "Rest!!!",
  "new": "Added to Anki!",
  "nuevo": "Ya está en la lista!",
  "nouveau": "C'est parti, c'est dans la liste!"
};

/* Adding phrases to Google Docs
function addToDoc(lang, postId, postText) {
  var myBody = DocumentApp.openById(myId[lang]).getBody();
  
  sendText(postId, myAnswer[lang]);
  myBody.insertParagraph(1, "");
  myBody.insertParagraph(1, postText.replace(/^..\s/, ""));
} 
*/

function addToSpread(lang, postId, postText) {
  var sheet = SpreadsheetApp.openById(myId[lang]).getSheetByName(lang);
  var myText = postText;
  var myRow = 2;
  
  if (lang !== "re") {
    myText = postText.replace(/^..\s+/, "");
  } 
  
  if (lang.length > 2) {
    myRow = 1;
  }
  
  sendText(postId, myAnswer[lang]);
  sheet.insertRowBefore(myRow);
  
  if (/\s+-\s+/.test(myText)) {
    sheet.getRange('A' + myRow).setValue(myText.replace(/\s+-.*/, ""));
    sheet.getRange('B' + myRow).setValue(myText.replace(/.*-\s+/, ""));
  } else {
    sheet.getRange('A' + myRow).setValue(myText);
  }
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
  // This is where telegram comes into play.
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var name = data.message.chat.first_name;
  
  
//  var inputVar = "";
  
  if (/^nq/.test(text) || /^Nq/.test(text)) {
    addToSpread("en", id, text);
  } 
  else if (/^dn/.test(text) || /^Dn/.test(text)) {
    addToSpread("es", id, text);
  } 
  else if (/^aq/.test(text) || /^Aq/.test(text)) {
    addToSpread("fr", id, text);
  } 
  else if (/^ae/.test(text) || /^Ae/.test(text)) {
    addToSpread("new", id, text);
  } 
  else if (/^as/.test(text) || /^As/.test(text)) {
    addToSpread("nuevo", id, text);
  } 
  else if (/^af/.test(text) || /^Af/.test(text)) {
    addToSpread("nouveau", id, text);
  } 
  else {
    addToSpread("re", id, text);
  }
}

