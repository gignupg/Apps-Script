var token = "hidden";
var telegramUrl = "hidden";
var webAppUrl = "hidden";

function addToDoc(lang, chatId, input) {
  var body = DocumentApp.openById(values[lang].id.doc).getBody();
  
  sendText(chatId, values[lang].answer.doc);
  body.insertParagraph(1, "");
  if (lang === "r") {
    body.insertParagraph(1, input);
  } else {
    body.insertParagraph(1, input.replace(/^\w\w\s+/, ""));
  }
} 

function addToSpread(lang, chatId, input) {
  var myText = input.replace(/^..\s+/, "");
  var myLang = values[lang];
  var sheet = SpreadsheetApp.openById(myLang.id.spread).getSheetByName(myLang.sheetName.spread);
  
  sendText(chatId, myLang.answer.spread);
  sheet.insertRowBefore(1);

  if (/\s+-\s+/.test(myText)) {
    sheet.getRange('A1').setValue(myText.replace(/\s+-.*/, ""));
    sheet.getRange('B1').setValue(myText.replace(/.*-\s+/, ""));
  } else {
    sheet.getRange('A1').setValue(myText);
  }
}

function allInclusiveLookup(lang, chatId, chatInput) {
  var input = chatInput.replace(/^\w\w\s+/, "").replace(/\-+/g, "").replace(/[,.]+/g, " ").replace(/\s\s+/g, " ").trim().split(/[\/\s\|]+/);
  
  var allMatches = columnABMerger(lang, input);
  
  scoreAdder(allMatches, input, chatId, lang);
  
  detailedInfo(lang, chatId, input, 'youtube');
  detailedInfo(lang, chatId, input, 'flaws');
  detailedInfo("", chatId, input, 'r');
  detailedInfo("", chatId, input, lang);
}

function fullLiteralMatches(lang, chatId, chatInput) {
  var input = chatInput.replace(/^\w\w\s+/, "").replace(/\-+/g, "").replace(/[,.]+/g, " ").replace(/\s\s+/g, " ").trim();
  
  literalMatcher(lang, input, chatId );
  
  literalInfo(lang, chatId, input, 'youtube');
  literalInfo(lang, chatId, input, 'flaws');
  literalInfo("", chatId, input, 'r'); 
  literalInfo("", chatId, input, lang);
}

function sendText(id, text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text  + "&parse_mode=Markdown";
  UrlFetchApp.fetch(url);
}

function doPost(e) {
  // This is where telegram comes into play.
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text.trim().toLowerCase();
  var id = data.message.chat.id;
  var name = data.message.chat.first_name;
  
  var pos1 = text[0] === "d" || text[0] === "s" || text[0] === "a" || text[0] === "l";
  var pos2 = text[1] === "e" || text[1] === "s" || text[1] === "f";
  var pos3 = text[2] === " ";
  
  if (pos1 && pos2 & pos3){
    switch (text[0]) {
      case "d":
        addToDoc(text[1], id, text);
        break;
      case "s":
        addToSpread(text[1], id, text);
        break;
      case "a":
        allInclusiveLookup(text[1], id, text);
        break;
      case "l":
        fullLiteralMatches(text[1], id, text);
        break;
    }
  } else {
    addToDoc("r", id, text);
  }
}

function postFaker() {
  var text = "ae toledo";
  var id = "12345";
  
  var pos1 = text[0] === "d" || text[0] === "s" || text[0] === "a" || text[0] === "l";
  var pos2 = text[1] === "e" || text[1] === "s" || text[1] === "f";
  var pos3 = text[2] === " ";
  
  if (pos1 && pos2 & pos3){
    switch (text[0]) {
      case "d":
        addToDoc(text[1], id, text);
        break;
      case "s":
        addToSpread(text[1], id, text);
        break;
      case "a":
        allInclusiveLookup(text[1], id, text);
        break;
      case "l":
        fullLiteralMatches(text[1], id, text);
        break;  
    }
  } else {
    addToDoc("r", id, text);
  }
}

function infoCaller() {
  infoCollector("e", "12345", ["shinola", "that", "know"], "r")
}
