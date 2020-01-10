var myLink = "1-daqfXLUKNyqC1IPjBbc8HTtGDQl1UMEJV-1awIYIWM";
var myAnki = "Anki";
var myNew = "new";
var myLatest = "latest";
var myAudio = "audio";
var my50 = "latest 50";
var my100 = "latest 100";
var my150 = "latest 150";
var my200 = "latest 200";

var spreadsheet = SpreadsheetApp.openById(myLink);
var ankiSheet =  spreadsheet.getSheetByName(myAnki);
var nuevoSheet = spreadsheet.getSheetByName(myNew);
var recienSheet = spreadsheet.getSheetByName(myLatest);
var audioSheet = spreadsheet.getSheetByName(myAudio);
var ultimos50 = spreadsheet.getSheetByName(my50);
var ultimos100 = spreadsheet.getSheetByName(my100);
var ultimos150 = spreadsheet.getSheetByName(my150);
var ultimos200 = spreadsheet.getSheetByName(my200);

var emptyRowAnki = ankiSheet.getLastRow();
var emptyRowNuevo = nuevoSheet.getLastRow();
var emptyRowRecien = recienSheet.getLastRow();
var emptyRowAudio = audioSheet.getLastRow();

function myMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Vocabulary')
  .addItem("Add new words", "execute")
  .addToUi();
}

function execute() {
  wordAdder();
  atVoice();
}

function wordAdder() {
  
  recienSheet.clearContents();

  ankiSheet.insertRowsAfter(emptyRowAnki, emptyRowNuevo);
  audioSheet.insertRowsAfter(emptyRowAudio, emptyRowNuevo);
  
  var nuevo_range = nuevoSheet.getRange("A1:B" + emptyRowNuevo);
  var anki_range = ankiSheet.getRange("A" + (emptyRowAnki + 1));
  var audio_range = audioSheet.getRange("A" + (emptyRowAudio + 1));
  var recien_range = recienSheet.getRange("A1");
  
  nuevo_range.copyTo(anki_range);
  nuevo_range.copyTo(audio_range);
  nuevo_range.copyTo(recien_range);
  
  nuevoSheet.clearContents();
}

function atVoice() {
  ultimos50.clearContents();
  ultimos100.clearContents();
  ultimos150.clearContents();
  ultimos200.clearContents();
  
  emptyRowAnki = ankiSheet.getLastRow();
  emptyRowNuevo = nuevoSheet.getLastRow();
  emptyRowRecien = recienSheet.getLastRow();
  emptyRowAudio = audioSheet.getLastRow();
  
  var range50 = audioSheet.getRange("A" + (emptyRowAudio - 49) + ":A" + emptyRowAudio)
  var range100 = audioSheet.getRange("A" + (emptyRowAudio - 99) + ":A" + emptyRowAudio)
  var range150 = audioSheet.getRange("A" + (emptyRowAudio - 149) + ":A" + emptyRowAudio)
  var range200 = audioSheet.getRange("A" + (emptyRowAudio - 199) + ":A" + emptyRowAudio)
  
  var sheet50 = ultimos50.getRange("A1");
  var sheet100 = ultimos100.getRange("A1");
  var sheet150 = ultimos150.getRange("A1");
  var sheet200 = ultimos200.getRange("A1");
  
  range50.copyTo(sheet50);
  range100.copyTo(sheet100);
  range150.copyTo(sheet150);
  range200.copyTo(sheet200);
}
