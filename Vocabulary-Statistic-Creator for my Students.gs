var student = "Name";
var doc = DocumentApp.getActiveDocument();
var body = doc.getBody();
var paragraphs = body.getParagraphs();
var iStart = 0;
var iEnd = 0; 
var parser = [];
var paraScanner = [];
var blueTemp = "";
var blueList = [];
var blueLTemp = "";
var blueRTemp = "";
var blueLList = [];
var blueRList = [];
var audioList = [];
var redTemp = "";
var redList = [];
var lightRedTemp = "";
var lightRedList = [];
var orangeList = [];
var greenList = [];
var limeList = [];
var yellowList = [];
var count = 0;
var COLOR_BLUE = "#6d9eeb";
var COLOR_LIGHT_RED = "#ea9999";
var COLOR_RED = "#e06666";
var COLOR_ORANGE = "#e69138";
var COLOR_GREEN = "#93c47d";
var COLOR_LIME = "#00ff00";
var COLOR_YELLOW = "#f1c232";

function test() {
  if (paragraphs[2].getText().match("-") === null) {
    Logger.log("No dash");
  } else {
    Logger.log("Dash!");
  }
}

function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Übersicht')
  .addItem('Übersicht erstellen', 'createVocabList')
  .addItem('Struktur erstellen', 'structureCreator')
  .addToUi();
}

function createVocabList() {
  looper();
  colorFinder();
  listMaker();
  sheetCreator();
  appender();
}

  
function looper() {
  for (var i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].getText().match(Utilities.formatDate(new Date(), "GTM+2", "yy"))) {
      iStart = i + 1;
      var k = iStart;
      break;
    }
  }
  for (; k < paragraphs.length; k++) {
    if (paragraphs[k].getText().match(Utilities.formatDate(new Date(), "GTM+2", "yy"))) {
      iEnd = k;
      break;
    }
  }
  var g = iStart;
  for (; g < iEnd; g++) { 
    var getColor = paragraphs[g].getBackgroundColor();
    var getText = paragraphs[g].getText();
    if (getColor === null && getText.match(/\w/)) {
      parser.push(g);
    } else if (getColor === COLOR_BLUE && getText.match(/\w/)) {
      blueList.push(getText)
    } else if (getColor === COLOR_GREEN && getText.match(/\w/)) {
      audioList.push(getText)
    } else if (getColor === COLOR_ORANGE && getText.match(/\w/)) {
      orangeList.push(getText)
    } else if (getColor === COLOR_RED && getText.match(/\w/)) {
      redList.push(getText)
    } else if (getColor === COLOR_LIGHT_RED && getText.match(/\w/)) {
      lightRedList.push(getText)
    } else if (getColor === COLOR_YELLOW && getText.match(/\w/)) {
      yellowList[count] = new Array(getText);
      for (var p = 1; p > 0; p++) {  
        if (paragraphs[g+p].getText() !== "") {
          yellowList[count].push(paragraphs[g+p].getText());
        } else {
          count++;
          p = -1;
        }
      }
    } 
  }
}  

function colorFinder() {
  for (var h = 0; h < parser.length; h++) { 
    var parsEdit = paragraphs[parser[h]].editAsText();
    var parsText = paragraphs[parser[h]].getText();
    var parsLength = parsText.length
    
    for (var i = 0; i < parsLength; i++) {
      
      
      //blue
      if (parsEdit.getBackgroundColor(i) === COLOR_BLUE) {
        blueTemp += parsText[i];
      }

      if (i > 0 && parsEdit.getBackgroundColor(i-1) === COLOR_BLUE) {                                                                      
        if (parsEdit.getBackgroundColor(i) !== COLOR_BLUE || parsLength === (i+1)) {
          blueList.push(blueTemp);
          blueTemp = "";
          if (parsText.match("-") === null && audioList[audioList.length-1] !== parsText) {
            audioList.push(parsText);
          }
        }
      }
      
      //red
      if (parsEdit.getBackgroundColor(i) === COLOR_RED) {
        redTemp += parsText[i];
      } 
      
      if (i > 0 && parsEdit.getBackgroundColor(i-1) === COLOR_RED) {
        if (parsEdit.getBackgroundColor(i) !== COLOR_RED || parsLength === (i+1)) {
          redList.push(redTemp);
          redTemp = "";
        }
      }
      
      //light red
      if (parsEdit.getBackgroundColor(i) === COLOR_LIGHT_RED) {
        lightRedTemp += parsText[i];
      } 
      if (i > 0 && parsEdit.getBackgroundColor(i-1) === COLOR_LIGHT_RED) {
        if (parsEdit.getBackgroundColor(i) !== COLOR_LIGHT_RED || parsLength === (i+1)) {
          lightRedList.push(lightRedTemp);
          lightRedTemp = "";
        }
      }
      
      // orange
      if (parsEdit.getBackgroundColor(i) === COLOR_ORANGE) {
        if (orangeList[orangeList.length-1] !== parsText) {
          orangeList.push(parsText);
        }
      } 
      
      //lime
      if (parsEdit.getBackgroundColor(i) === COLOR_LIME) {
        if (limeList[limeList.length-1] !== parsText) {
          limeList.push(parsText);
          audioList.push(parsText);
        }
      }
      
      //yellow
      if (parsEdit.getBackgroundColor(i) === COLOR_YELLOW) {
        if (yellowList[yellowList.length-1] !== parsText) {
          yellowList[count] = new Array(parsText); 
          for (var p = 1; p > 0; p++) {  
            if (paragraphs[parser[h]+p].getText() !== "") {
              yellowList[count].push(paragraphs[parser[h]+p].getText());
            } else {
              count++;
              p = -1;
              i = parsLength;
            }
          }
        }
      }
    }
  }
}

function listMaker() {
  //blue left & right
  for (var k = 0; k < blueList.length; k++) { 
    if (blueList[k].match("-")) {
      blueLTemp = blueList[k].match(/.+-/).toString().match(/[^-]+/).toString().replace(/\s+$/, "").replace(/^\s+/, "");
      blueLList.push(blueLTemp);
      blueRTemp = blueList[k].match(/-.+/).toString().match(/[^-]+/).toString().replace(/\s+$/, "").replace(/^\s+/, "");
      blueRList.push(blueRTemp);
    } else if (blueList[k].match("[(]")) {
      blueLTemp = blueList[k].match(/.+\(/).toString().match(/[^\(\)]+/).toString().replace(/\s+$/, "").replace(/^\s+/, "");
      blueLList.push(blueLTemp);
      blueRTemp = blueList[k].match(/\(.+/).toString().match(/[^\(\)]+/).toString().replace(/\s+$/, "").replace(/^\s+/, "");
      blueRList.push(blueRTemp);
    }
  }
  //blue audio
  for (var l = 0; l < audioList.length; l++) {
    audioList[l] = audioList[l].replace(/\(.+?\)/g, "").replace(/\s\s+/g, " ").replace(/\s+$/, "").replace(/^\s+/, "");
  }
  
  //red
  for (var j = 0; j < redList.length; j++) {
    redList[j] = redList[j].replace(/\s+$/, "").replace(/^\s+/, "");
  }
  
  //lightRed
  for (var j = 0; j < lightRedList.length; j++) {
    lightRedList[j] = lightRedList[j].replace(/\s+$/, "").replace(/^\s+/, "") + " [besp.]";
  }
  
  //orange
  for (var i = 0; i < orangeList.length; i++) {
    orangeList[i] = orangeList[i].replace(/\s+$/, "").replace(/^\s+/, "").replace(/\s\s+/g, " ");
  }
  
  //lime
  for (var i = 0; i < limeList.length; i++) {
    audioList[i] = audioList[i].replace(/\s+$/, "").replace(/^\s+/, "").replace(/\s\s+/g, " ");
  }
}  

function sheetCreator() {
  var folder = DriveApp.getFoldersByName("Übersicht - " + student).next();//gets first folder with the given foldername
  var file = SpreadsheetApp.create("Übersicht - " + student + Utilities.formatDate(new Date(), "GTM+2", " - yyyy/MM/dd"));
  var copyFile = DriveApp.getFileById(file.getId());
  folder.addFile(copyFile);
  DriveApp.getRootFolder().removeFile(copyFile);
  var sheetUrl = file.getUrl();
  var spreadsheet = SpreadsheetApp.openByUrl(sheetUrl);
  var sheet = spreadsheet.getActiveSheet();
  sheet.setName("Vokabeln & Audio");
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName("Vokabeln & Audio"), true);
  spreadsheet.getRange('A:B').activate();
  spreadsheet.getActiveSheet().setColumnWidths(1, 2, 206);
  spreadsheet.getActiveRangeList().setBackground('#cfe2f3');
  spreadsheet.getRange('C:C').activate();
  spreadsheet.getActiveSheet().setColumnWidth(3, 619);
  spreadsheet.getActiveRangeList().setBackground('#d9ead3');
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getRange("A1").activate();
  for (var i = 0; i < blueLList.length; i++) {
    spreadsheet.getCurrentCell().setValue(blueLList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  spreadsheet.getRange("B1").activate();
  for (var i = 0; i < blueRList.length; i++) {
    spreadsheet.getCurrentCell().setValue(blueRList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  spreadsheet.getRange("C1").activate();
  for (var i = 0; i < audioList.length; i++) {
    spreadsheet.getCurrentCell().setValue(audioList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  
  spreadsheet.insertSheet().setName("Verbesserungen");
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Verbesserungen'), true);
  sheet = spreadsheet.getActiveSheet();
  spreadsheet.getRange('A:B').activate();
  spreadsheet.getActiveSheet().setColumnWidths(1, 2, 162);
  spreadsheet.getRange('C:D').activate();
  spreadsheet.getActiveSheet().setColumnWidths(3, 2, 352);
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveRangeList().setBackground('#ea9999');
  spreadsheet.getRange('B:B').activate();
  spreadsheet.getActiveRangeList().setBackground('#f4cccc');
  spreadsheet.getRange('C:C').activate();
  spreadsheet.getActiveRangeList().setBackground('#fce5cd');
  spreadsheet.getRange('D:D').activate();
  spreadsheet.getActiveRangeList().setBackground('#d9ead3');
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getRange("A1").activate();
  for (var i = 0; i < redList.length; i++) {
    spreadsheet.getCurrentCell().setValue(redList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  spreadsheet.getRange("B1").activate();
  for (var i = 0; i < lightRedList.length; i++) {
    spreadsheet.getCurrentCell().setValue(lightRedList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  spreadsheet.getRange("C1").activate();
  for (var i = 0; i < orangeList.length; i++) {
    spreadsheet.getCurrentCell().setValue(orangeList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  spreadsheet.getRange("D1").activate();
  for (var i = 0; i < limeList.length; i++) {
    spreadsheet.getCurrentCell().setValue(limeList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  
  spreadsheet.insertSheet().setName("Regeln");
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Regeln'), true);
  var emptyRow = spreadsheet.getLastRow() + 2;
  sheet = spreadsheet.getActiveSheet();
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveSheet().setColumnWidth(1, 1031);
  spreadsheet.getActiveRangeList().setBackground('#fff2cc');
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  for (var i = 0; i < yellowList.length; i++) {
    if (i === 0) {
      spreadsheet.getRange("A1").activate();
      for (var b = 0; b < yellowList[i].length; b++) {
        if (b === 0) {
          spreadsheet.getCurrentCell().setRichTextValue(SpreadsheetApp.newRichTextValue()
          .setText(yellowList[i][b])
          .setTextStyle(SpreadsheetApp.newTextStyle()
          .setBold(true)
          .setUnderline(true)
          .build())
          .build());
          spreadsheet.getCurrentCell().offset(1, 0).activate();
        } else if (b !== yellowList[i].length - 1) {
          spreadsheet.getCurrentCell().setValue(yellowList[i][b]);
          spreadsheet.getCurrentCell().offset(1, 0).activate();
        } else {
          spreadsheet.getCurrentCell().setValue(yellowList[i][b]);
          spreadsheet.getCurrentCell().offset(2, 0).activate();
        }
      }
    } else {
      for (var b = 0; b < yellowList[i].length; b++) {
        if (b === 0) {
          spreadsheet.getCurrentCell().setRichTextValue(SpreadsheetApp.newRichTextValue()
          .setText(yellowList[i][b])
          .setTextStyle(SpreadsheetApp.newTextStyle()
          .setBold(true)
          .setUnderline(true)
          .build())
          .build());
          spreadsheet.getCurrentCell().offset(1, 0).activate();
        } else if (b !== yellowList[i].length - 1) {
          spreadsheet.getCurrentCell().setValue(yellowList[i][b]);
          spreadsheet.getCurrentCell().offset(1, 0).activate();
        } else {
          spreadsheet.getCurrentCell().setValue(yellowList[i][b]);
          spreadsheet.getCurrentCell().offset(2, 0).activate();
        }
      }
    }
  }
}

function appender() {
  var file = DriveApp.getFilesByName("Gesamtüberblick - " + student).next();
  var spreadsheet = SpreadsheetApp.open(file);
  
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Vokabeln'), true);
  var emptyRow = spreadsheet.getLastRow() + 1;
  spreadsheet.getRange("A" + emptyRow).activate();
  for (var i = 0; i < blueLList.length; i++) {
    spreadsheet.getCurrentCell().setValue(blueLList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  spreadsheet.getRange("B" + emptyRow).activate();
  for (var i = 0; i < blueRList.length; i++) {
    spreadsheet.getCurrentCell().setValue(blueRList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Audio'), true);
  emptyRow = spreadsheet.getLastRow() + 1;
  spreadsheet.getRange("A" + emptyRow).activate();
  for (var i = 0; i < audioList.length; i++) {
    spreadsheet.getCurrentCell().setValue(audioList[i]);
    spreadsheet.getCurrentCell().offset(1, 0).activate();
  }
  
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Regeln'), true);
  emptyRow = spreadsheet.getLastRow() + 2;
  spreadsheet.getRange("A" + emptyRow).activate();
  for (var i = 0; i < yellowList.length; i++) {
    for (var b = 0; b < yellowList[i].length; b++) {
      if (b === 0) {
        spreadsheet.getCurrentCell().setRichTextValue(SpreadsheetApp.newRichTextValue()
        .setText(yellowList[i][b])
        .setTextStyle(SpreadsheetApp.newTextStyle()
        .setBold(true)
        .setUnderline(true)
        .build())
        .build());
        spreadsheet.getCurrentCell().offset(1, 0).activate();
      } else if (b !== yellowList[i].length - 1) {
        spreadsheet.getCurrentCell().setValue(yellowList[i][b]);
        spreadsheet.getCurrentCell().offset(1, 0).activate();
      } else {
        spreadsheet.getCurrentCell().setValue(yellowList[i][b]);
        spreadsheet.getCurrentCell().offset(2, 0).activate();
      } 
    }
  }
}  
function structureCreator() {
  var folder = DriveApp.getFoldersByName("Aktuelle Dokumente - " + student).next();//gets first folder with the given foldername
  var file = SpreadsheetApp.create("Gesamtüberblick - " + student);
  var copyFile = DriveApp.getFileById(file.getId());
  folder.addFile(copyFile);
  DriveApp.getRootFolder().removeFile(copyFile);
  var sheetUrl = file.getUrl();
  var spreadsheet = SpreadsheetApp.openByUrl(sheetUrl);
  spreadsheet.getRange('A:B').activate();
  spreadsheet.getActiveSheet().setColumnWidths(1, 2, 284);
  spreadsheet.getActiveRangeList().setBackground('#cfe2f3');
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getActiveSheet().setName('Vokabeln');
  spreadsheet.insertSheet(1);
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveSheet().setColumnWidth(1, 689);
  spreadsheet.getActiveRangeList().setBackground('#d9ead3');
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getActiveSheet().setName('Audio');
  spreadsheet.insertSheet(2);
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveSheet().setColumnWidth(1, 689);
  spreadsheet.getActiveRangeList().setBackground('#fff2cc');
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getActiveSheet().setName('Regeln');
  folder.createFolder("Übersicht - " + student);
}
