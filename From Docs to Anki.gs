function phrasesToAnki() {
  var sheetId = {
    "nouveau": "1dtnrjzfB5tlBhzHoQJJbMiB4xc41YoYgJrcbbxkiuoU",
    "new": "1FhGPeU4lC92BEWCtOjsGB5jK4yFIms_GrjIpMWfXFes",
    "nuevo": "1-daqfXLUKNyqC1IPjBbc8HTtGDQl1UMEJV-1awIYIWM"
  }
  
  var myParagraphs = DocumentApp.getActiveDocument().getBody().getParagraphs();
  var docName = myParagraphs[0].getText().toLowerCase();
  var sheetName = Object.keys(sheetId);
  
  // Shows an error message and stops the script, if docName doesn't match with one of the sheetId keys!
  if (!sheetName.some(elem => elem === docName)) {
    return DocumentApp.getUi().alert("The first line of the text document doesn't match with the 'sheetName' variable in the code!");
  }
  
  var totalOfParagraphs = myParagraphs.length;
  var start = false;
  var end = false;
  var arrayA = [];
  var arrayB = [];
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = dd + '/' + mm + '/' + yyyy;
  
  function arrayFiller() {
    for (var i = start; i >= end; i--) {
      var text = myParagraphs[i].getText().trim();
      if (text) {
        if (/\s+-\s+/.test(text)) {
          arrayA.push(text.replace(/\s+-.*/, ""));
          arrayB.push(text.replace(/.*-\s+/, ""));
        } else {
          arrayA.push(text);
          arrayB.push("");
        }
      }
    }
  }
  
  function ankiSetter() {
    //Preparing the array that is going to be added to anki
    var newWordsArray = [];
    var arrayLength = arrayA.length;
    
    for (var i = 0; i < arrayLength; i++) {
      newWordsArray.push([arrayA[i], arrayB[i]])
    }
    
    var sheet = SpreadsheetApp.openById(sheetId[docName]).getSheetByName(docName);    
    var range = sheet.getRange("A1:B" + arrayLength);
    var lastRow = sheet.getMaxRows();
    
    // Making sure the amount of rows in the spreadsheet stays consistent at 500!
    if (lastRow < 500) {
      sheet.insertRowsBefore(lastRow, 500 - lastRow);
    } else if (lastRow > 500) {
      sheet.deleteRows(501, lastRow - 500);
    }
    
    sheet.insertRowsBefore(1, arrayLength);
    range.setValues(newWordsArray); 
    sheet.deleteRows(501, arrayLength);
  }

  for (var i = totalOfParagraphs - 1; i >= 0; i--) {
    var text = myParagraphs[i].getText();
    if (text === today) {
      if (!start) {
        start = i - 1;
      } else {
        end = i + 1;
        arrayFiller()
        break;
      }
    }
  }
  
  if (!end) {
    DocumentApp.getUi().alert('Please define start and end correctly!');
  } else {
    ankiSetter();
  }
  // Success message
  DocumentApp.getUi().alert(arrayA.length + ' phrases have been added to "' + docName + '"');
}

function myMenu() {
  var ui = DocumentApp.getUi();
  ui.createMenu("Anki")
  .addItem("Add today's phrases to Anki", "phrasesToAnki")
  .addToUi();
}
