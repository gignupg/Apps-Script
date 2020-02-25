var spreadsheet = SpreadsheetApp.openById("Id_To_Be_Specified_Here!!!")
var audioSheet = spreadsheet.getSheetByName("Audio")
var audio3Sheet = spreadsheet.getSheetByName("Audio 3")
var totalRows = audioSheet.getLastRow()
var totalRows3 = audio3Sheet.getLastRow()
var shortWords = []

function myFunction() {

  for (var i = totalRows; i >= 1; i--){
    var phrase = audioSheet.getRange(i,1).getValue()
    var words = phrase.split(" ").length
    
    if (words <= 3) {
      shortWords.push(phrase)
      audioSheet.deleteRow(i)
    }
  }

  var firstRow = totalRows3 + 1
  audio3Sheet.getRange(firstRow,1).activate()
    
  for (var i = 0; i <= shortWords.length; i++){
    spreadsheet.getCurrentCell().setValue(shortWords[i])
    spreadsheet.getCurrentCell().offset(1, 0).activate()
  }
}
