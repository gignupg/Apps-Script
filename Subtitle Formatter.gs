function formatter() {
  var body = DocumentApp.getActiveDocument().getBody();
  var para = body.getParagraphs();
  var lastRow = para.length - 1;
  var text = body.getText()
  var textArr = text.split(/\n/);
  var filteredArr = textArr.filter(elem => elem);
  body.clear().appendParagraph(filteredArr.join(" "));
}

function myMenu() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Subtitles')
  .addItem("compress text", "formatter")
  .addToUi();
}
