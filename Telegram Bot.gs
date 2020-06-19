var token = "hidden";
var telegramUrl = "hidden" + token;
var webAppUrl = "hidden";

var myId = {
  en: "1Wp-8OqIy-KOjLIhWs9P-MPGiFzog-jk58mDK6K3nd9Y",
  es: "1CET3MKnvZ2x5JGkvcsAj03Ii1pWd17dSsk9BRyqNufA",
  fr: "1-yCMPblBUdzZ4ChFCHPjd1RlYWrmYoId8B6VG_8ltUY",
  re: "1aLggxM7IGuGcJJeRA4at3Alf1DX74IRSd-e67qEn_vI",
  "new": "1-daqfXLUKNyqC1IPjBbc8HTtGDQl1UMEJV-1awIYIWM",
  "nuevo": "1FhGPeU4lC92BEWCtOjsGB5jK4yFIms_GrjIpMWfXFes",
  "nouveau": "1dtnrjzfB5tlBhzHoQJJbMiB4xc41YoYgJrcbbxkiuoU"
};

var myAnswer = {
  en: "Your question has been added!",
  es: "Una duda nueva ha sido añadida!",
  fr: "On a ajouté ta question!",
  re: "Rest!!!",
  "new": "Added to Anki!",
  "nuevo": "Ya está en la lista!",
  "nouveau": "C'est parti, c'est dans la liste!"
};

function addToDoc(lang, postId, postText) {
  var myBody = DocumentApp.openById(myId[lang]).getBody();
  
  sendText(postId, myAnswer[lang]);
  myBody.insertParagraph(1, "");
  myBody.insertParagraph(1, postText);
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
  var text = data.message.text.trim();
  var id = data.message.chat.id;
  var name = data.message.chat.first_name;
  
  if (/^nq/.test(text) || /^Nq/.test(text)) {
    addToDoc("en", id, text);
  } 
  else if (/^dn/.test(text) || /^Dn/.test(text)) {
    addToDoc("es", id, text);
  } 
  else if (/^aq/.test(text) || /^Aq/.test(text)) {
    addToDoc("fr", id, text);
  } 
  else if (/^ae/.test(text) || /^Ae/.test(text)) {
    addToDoc("new", id, text);
  } 
  else if (/^as/.test(text) || /^As/.test(text)) {
    addToDoc("nuevo", id, text);
  } 
  else if (/^af/.test(text) || /^Af/.test(text)) {
    addToDoc("nouveau", id, text);
  } 
  else {
    addToDoc("re", id, text);
  }
}
