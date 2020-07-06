var token = "hidden";
var telegramUrl = "hidden" + token;
var webAppUrl = "hidden";

var values = {
  e: {
    id: {
      doc: "1Wp-8OqIy-KOjLIhWs9P-MPGiFzog-jk58mDK6K3nd9Y",
      spread: "1-daqfXLUKNyqC1IPjBbc8HTtGDQl1UMEJV-1awIYIWM"
    },
    answer: {
      doc: "Your question has been added!",
      spread: "Added to Anki!",
    },
    sheetName: {
      spread: "new",
      youtube: "English"
    },
    error: "Couldn't find anything, sorry!"
  },
  s: {
    id: {
      doc: "1CET3MKnvZ2x5JGkvcsAj03Ii1pWd17dSsk9BRyqNufA",
      spread: "1FhGPeU4lC92BEWCtOjsGB5jK4yFIms_GrjIpMWfXFes"
    },
    answer: {
      doc: "Una duda nueva ha sido añadida!",
      spread: "Ya está en la lista!",
    },
    sheetName: {
      spread: "nuevo",
      youtube: "Español"
    },
    error: "No hay nada, lo siento!"  
  },
  f: {
    id: {
      doc: "1-yCMPblBUdzZ4ChFCHPjd1RlYWrmYoId8B6VG_8ltUY",
      spread: "1dtnrjzfB5tlBhzHoQJJbMiB4xc41YoYgJrcbbxkiuoU"
    },
    answer: {
      doc: "On a ajouté ta question !",
      spread: "C'est parti, c'est dans la liste !",
    },
    sheetName: {
      spread: "nouveau",
      youtube: "Français"
    },
    error: "Il n'y a rien, désolé !"  
  },
  r: {
    id: {
      doc: "1aLggxM7IGuGcJJeRA4at3Alf1DX74IRSd-e67qEn_vI"
    },
    answer: {
      doc: "Rest!!!"
    }  
  },
  youtubeId: "1IBp3I4eemZtoc3CS9MWwoStrRwOnTnldNmJtLfZossQ"
}


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

function lookup(lang, chatId, chatInput) {
  var sheet = SpreadsheetApp.openById(values[lang].id.spread).getSheetByName("Anki");  
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A1:B" + lastRow);
  var row = range.getValues();
  var rawResults = [];
  var rawResult = "";
  var input = chatInput.replace(/^\w\w\s+/, "").replace(/[,.]+/g, "").replace(/\s\s+/g, " ").split(/[\/\s\|\-]+/);
  var scoredResults = [];
  
  // Collecting data related to the search request
  for (var i = 0; i < lastRow; i++) {
    for (var k = 0; k < 2; k++) {
      for (var m = 0; m < input.length; m++) {
        if (RegExp(input[m], 'i').test(row[i][k])) {
          // Replacing three dashes with 52349 and normal dashes with 14237 and slashes with 67589 and pipes with 45123
          rawResult = row[i][0] + " 52349 " + row[i][1];
          rawResults.push(rawResult.replace(/\/+/g, " 67589 ").replace(/\-+/g, " 14237 ").replace(/\|+/g, " 45123 "));

          m = input.length - 1;
          k = 1;
        }
      }
    }
  }
  
  // Adding a score
  for (var i = 0; i < rawResults.length; i++) {   
    var rawSplit = rawResults[i].split(" "); 
    var score = 0;
    var rawWord = "";
    
    for (var k = 0; k < input.length; k++) {
      var kScore = 0;
      
      for (var m = 0; m < rawSplit.length; m++) {
        if (RegExp(input[k], "i").test(rawSplit[m])) {
          if (input[k].length / rawSplit[m].length >= 0.5) {  
            rawWord = rawSplit[m].replace(/["!?,.¿¡;:»«><“”]+/g, "")
            var division = input[k].length / rawWord.length;
            
            // Making all matches bold
            if (division >= 0.65) {
              rawSplit[m] = "*" + rawSplit[m] + "*";  
              
              if (division > kScore) {
                kScore = division
              }
            }
          }
        }
      }
      score += kScore;
    }   
    if (score) {
      scoredResults.push([score, rawSplit.join(" ").replace(/\"/g, "“").replace(/\s14237\s/g, "-").replace(/\s67589\s/g, "/").replace(/\s45123\s/g, "|").replace(/\s52349\s/, " --- ")]);
    }
  }    
  
  // Sorting the results
  scoredResults.sort(function(a, b) {
    return b[0] - a[0];
  });
  
  // Sending back the results or an error message 
  if (!scoredResults.length) {
    // Logger.log(errorMessage[sheetName]);
    sendText(chatId, values[lang].error);
  } else {
    // Formatting and putting the final touches on the results array 
    for (var i = 0; i < scoredResults.length; i++) {
      var points = scoredResults[i][0];
      var formattedText = scoredResults[i][1];
      
      if (points.toString().length > 3) {
        points = points.toFixed(1);
      }
      
      // Logger.log("Score: " + points + "/" + input.length + "    " + formattedText);
      sendText(chatId, "Score: " + points + " */* " + input.length + "    " + formattedText);
      
      if (i === 4) break;
    }
  }
  youtubeInfo(lang, chatId, input);
}

function youtubeInfo(lang, chatId, input) {
  
  var sheetYt = SpreadsheetApp.openById(values.youtubeId).getSheetByName(values[lang].sheetName.youtube); 
  var lastRowYt = sheetYt.getLastRow();
  var contentYt = sheetYt.getRange('D1:D' + lastRowYt).getValues();
  var rawResultsYt = [];
  var videoArr = [];
  
  for (var i = 0; i < contentYt.length; i++) { 
    videoArr = contentYt[i][0].split("\n");
    
    for (var m = 0; m < videoArr.length; m++) {
      for (var k = 0; k < input.length; k++) {
        
        if (RegExp(input[k], "i").test(videoArr[m])) {
          rawResultsYt.push(videoArr[m]);
          break;
        }
      }  
    }
  }
  
  // Creating the Youtube Timeline score  
  var bestResYt = 0;
  var matches = 0;
  
  for (var i = 0; i < rawResultsYt.length; i++) {
    var scoreYt = 0;
    var resultArr = rawResultsYt[i].split(/[ -"!?,.¿¡;:»«><“”()\d]+/);
    var tempMatch = false;
    
    for (var k = 0; k < input.length; k++) {
      var tempScore = 0;
      
      for (var m = 0; m < resultArr.length; m++) {
        if (RegExp(input[k], "i").test(resultArr[m])) {
          var compare = input[k].length / resultArr[m].length;
          
          if (compare >= 0.65 && compare > tempScore) {
            tempScore = compare;  
            tempMatch = true;
          }
        }
      }
      if (tempScore) {
        scoreYt += tempScore;
      } 
    }
    if (scoreYt > bestResYt) {
      bestResYt = scoreYt;
    }
    if (tempMatch) matches++;
  }
  
  if (bestResYt.toString().length > 3) {
    bestResYt = bestResYt.toFixed(1);
  }

  // Sending back information about the Youtube Timeline score
  if (matches) {
    sendText(chatId, "*Youtube Timeline:* " + matches + " matches found. Best score: " + bestResYt + " */* " + input.length);
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
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text  + "&parse_mode=Markdown";
  var response = UrlFetchApp.fetch(url);
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hey there!");
}

function doPost(e) {
  // This is where telegram comes into play.
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text.trim().toLowerCase();
  var id = data.message.chat.id;
  var name = data.message.chat.first_name;
  
  var pos1 = text[0] === "d" || text[0] === "s" || text[0] === "l";
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
      case "l":
        lookup(text[1], id, text);
        break;
    }
  } else {
    addToDoc("r", id, text);
  }
}

function postFaker() {
  var text = "lf obliterate"
  var id = "12345"
  
  var pos1 = text[0] === "d" || text[0] === "s" || text[0] === "l";
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
      case "l":
        lookup(text[1], id, text);
        break;
    }
  } else {
    addToDoc("r", id, text);
  }
}

function infoCaller() {
  youtubeInfo("s", "12345", ["cuadra", "le"])
}
