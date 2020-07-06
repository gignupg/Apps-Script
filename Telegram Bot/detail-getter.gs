function columnABMerger(lang, input) {
  var sheet = SpreadsheetApp.openById(values[lang].id.spread).getSheetByName("Anki");  
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A1:B" + lastRow);
  var content = range.getValues();
  
  var rawResults = [];
  
  // Collecting related data to the search request. At least one word must match to 65%.
  // Mergin column A and B of the spreadsheet
  for (var i = 0; i < lastRow; i++) {
    for (var k = 0; k < 2; k++) {
      for (var m = 0; m < input.length; m++) {
        var onlyWords = content[i][k].replace(/["!?,.¿¡;:»«><“”()\[\]\+\*\-]+/g, "");
        var wordArray = onlyWords.split(/[\s\/\|]+/);        
        
        for (var l = 0; l < wordArray.length; l++) {
          var comparer = input[m].length / wordArray[l].length;
          var bigger = comparer <= 1 ? wordArray[l] : input[m];
          var smaller = comparer <= 1 ? input[m] : wordArray[l];
        
          // Injecting 52349 between column A and B which will later be replaced with three dashes. Also replacing all slashes with 67589 and all pipes with 45123
          // The numbers will later on be converted back to the original character.
          if (RegExp(smaller, 'i').test(bigger)) {
            var division = smaller.length / bigger.length
            
            if (division >= 0.65) {
              var rawResult = content[i][0] + " 52349 " + content[i][1];
              rawResults.push(rawResult.replace(/\/+/g, " 67589 ").replace(/\|+/g, " 45123 "));
              
              l = wordArray.length;
              m = input.length;
              k = 1;
            }
          }
        }
      }
    }
  }
  
  // Returning an array that contains all the data that might be relevant to the search request
  return rawResults;
}

function scoreAdder(allMatches, input, chatId, lang) {
  var scoredResults = [];
  
  // Evaluating "allMatches" by adding a score and highlighting matching words in bold. 
  // takes "allMatches" and "input" and 
  for (var i = 0; i < allMatches.length; i++) {   
    var rawSplit = allMatches[i].split(" "); 
    var score = 0;
    var rawWord = "";
    
    for (var k = 0; k < input.length; k++) {
      var kScore = 0;
      
      for (var m = 0; m < rawSplit.length; m++) {
        rawWord = rawSplit[m].replace(/["!?,.¿¡;:»«><“”()\[\]\+\*\-]+/g, "");
        var comparer = input[k].length / rawWord.length;
        var bigger = comparer <= 1 ? rawWord : input[k];
        var smaller = comparer <= 1 ? input[k] : rawWord;
        
        if (RegExp(smaller, "i").test(bigger)) {
          var division = smaller.length / bigger.length;
          
          // Making all words bold that match the input to at least 65% and saving the score
          if (division >= 0.65) {
            rawSplit[m] = "*" + rawSplit[m] + "*";  
            
            if (division > kScore) {
              kScore = division
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
  
  // returns a properly formatted array with all entries that match at least one of the search terms to 65%.
    // Sending back the results or an error message 
  if (!scoredResults.length) {
    sendText(chatId, values[lang].error);
    
  } else {
    for (var i = 0; i < scoredResults.length; i++) {
      var points = scoredResults[i][0];
      var formattedText = scoredResults[i][1];
      
      if (points.toString().length > 3) {
        points = points.toFixed(1);
      }
      
      // Logger.log("Score: " + points + " */* " + input.length + "    " + formattedText);
      sendText(chatId, "Score: " + points + " */* " + input.length + "    " + formattedText);
      
      // Only showing the top 5 results.
      if (i >= 4) break;
    }
  }
}

function literalMatcher(lang, input, chatId) {
  var rawResults = [];
  var sheet = SpreadsheetApp.openById(values[lang].id.spread).getSheetByName("Anki");  
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A1:B" + lastRow);
  var row = range.getValues();
  
  // Collecting related data to the search request. At least one word must match to 65%.
  // Mergin column A and B of the spreadsheet
  for (var i = 0; i < lastRow; i++) {
    for (var k = 0; k < 2; k++) {
      
      if (RegExp(input).test(row[i][k])) {
        row[i][k] = row[i][k].replace(RegExp(input, 'i'), "*" + input + "*");
        var rawResult = row[i][0] + " --- " + row[i][1];
        rawResults.push(rawResult);  
        break;
      }
    }
  }
  
  // Sending back the results or an error message 
  if (!rawResults.length) {
    sendText(chatId, values[lang].error);
    
  } else {
    for (var i = 0; i < rawResults.length; i++) {
      // Logger.log(rawResults[i]);
      sendText(chatId, rawResults[i]);
      
      // Only showing the top 5 results.
      if (i >= 4) break;
    }
  }
}
