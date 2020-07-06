function detailedInfo(lang, chatId, input, name) {  
  var sheetDoc = ""; 
  var content = "";
    
  if (name === "youtube" || name === "flaws") {
    sheetDoc = SpreadsheetApp.openById(values[name].id.spread).getSheetByName(values[lang].sheetName[name]); 
    var lastRow = sheetDoc.getLastRow();
    content = sheetDoc.getRange(values[name].range + lastRow).getValues().flat();
  } else {
    sheetDoc = DocumentApp.openById(values[name].id.doc).getBody().getText();
    content = sheetDoc.split(/\n/);
  }
  
  // Creating the Youtube Timeline score  
  var bestRes = 0;
  var matches = 0;
  
  for (var i = 0; i < content.length; i++) {
    var score = 0;
    var onlyWords = content[i].replace(/["!?,.¿¡;:»«><“”()\[\]\+\*\-]+/g, "");
    var wordArray = onlyWords.split(/[\s\/\|]+/);
    var tempMatch = false;
    
    for (var k = 0; k < input.length; k++) {
      var tempScore = 0;
      
      for (var m = 0; m < wordArray.length; m++) {
        var comparer = input[k].length / wordArray[m].length;
        var bigger = comparer <= 1 ? wordArray[m] : input[k];
        var smaller = comparer <= 1 ? input[k] : wordArray[m];
        
        
        if (RegExp(smaller, 'i').test(bigger)) {
          var division = smaller.length / bigger.length;
          
          if (division >= 0.65 && division > tempScore) {
            tempScore = division;  
            tempMatch = true;
          }
        }
      }
      if (tempScore) {
        score += tempScore;
      } 
    }
    if (score > bestRes) {
      bestRes = score;
    }
    if (tempMatch) matches++;
  }
  
  if (bestRes.toString().length > 3) {
    bestRes = bestRes.toFixed(1);
  }

  // Sending back information about the Youtube Timeline score
  if (matches) {
    // Logger.log(values[name].display + matches + " match(es) found. Best score: " + bestRes + " */* " + input.length);
    sendText(chatId, values[name].display + matches + " match(es) found. Best score: " + bestRes + " */* " + input.length);
  }
}

function literalInfo(lang, chatId, input, name) {
  var sheetDoc = ""; 
  var content = "";
    
  if (name === "youtube" || name === "flaws") {
    sheetDoc = SpreadsheetApp.openById(values[name].id.spread).getSheetByName(values[lang].sheetName[name]); 
    var lastRow = sheetDoc.getLastRow();
    content = sheetDoc.getRange(values[name].range + lastRow).getValues().flat();
  } else {
    sheetDoc = DocumentApp.openById(values[name].id.doc).getBody().getText();
    content = sheetDoc.split(/\n/);
  }
  
  var matches = 0;
  
  for (var i = 0; i < content.length; i++) { 
    if (RegExp(input, "i").test(content[i])) {
      matches++;
    }
  }

  // Sending back information about the Youtube Timeline score
  if (matches) {
    sendText(chatId, values[name].display + matches + " match(es) found.");
  }
}
