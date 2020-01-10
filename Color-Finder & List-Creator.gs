var doc = DocumentApp.getActiveDocument();
var body = doc.getBody();
var paragraph = body.getParagraphs();

var pink = "#ff00ff";
var pinkTemp = "";

var sheet = SpreadsheetApp.openById("1hogm-Coye5VgHVnNMhHAKZhrrJ7z2GLtwJn6HHQL2Cw").getActiveSheet();
var row = 1;

function pinkGetter() {
  for (var l = 0; l < paragraph.length; l++) {
    var color = paragraph[l].getBackgroundColor();
    var text = paragraph[l].getText();
    var para = paragraph[l];
    var edit = paragraph[l].editAsText();
    
    if (text !== "") {
      for (var p = 0; p < text.length; p++) {
        if (edit.getBackgroundColor(p) === pink) {
          pinkTemp += text[p];
        }
        if (p > 0 && edit.getBackgroundColor(p-1) === pink) {
          if (edit.getBackgroundColor(p) !== pink || text.length === (p+1)) {
            sheet.getRange("A" + row).setValue(pinkTemp);
            pinkTemp = "";
            row++;
          } 
        }
      }
    }
  }
}
