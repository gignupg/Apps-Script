var student = "Name";

function structureCreator() {
  var italkiFolder = DriveApp.getFoldersByName("#Italki Unterricht").next();
  var italkiLesson = SpreadsheetApp.create(student);
  var copyItalkiLesson = DriveApp.getFileById(italkiLesson.getId());
  italkiFolder.addFile(copyItalkiLesson);
  DriveApp.getRootFolder().removeFile(copyItalkiLesson);
  var sheetUrl = italkiLesson.getUrl();
  var spreadsheet = SpreadsheetApp.openByUrl(sheetUrl);
  spreadsheet.getRange('A1').activate();
  spreadsheet.getActiveSheet().setColumnWidth(1, 170);
  spreadsheet.getCurrentCell().setValue('Reason for classes:');
  spreadsheet.getRange('A2').activate();
  spreadsheet.getCurrentCell().setValue('Additional information:');
  spreadsheet.getRange('A3').activate();
  spreadsheet.getCurrentCell().setValue('Hobbies:');
  spreadsheet.getRange('A4').activate();
  spreadsheet.getCurrentCell().setValue('Languages:');
  spreadsheet.getRange('A5').activate();
  spreadsheet.getCurrentCell().setValue('Location:');
  spreadsheet.getRange('A6').activate();
  spreadsheet.getCurrentCell().setValue('Profession and education:');
  spreadsheet.getRange('A7').activate();
  spreadsheet.getCurrentCell().setValue('Pending questions:');
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveRangeList().setFontWeight('bold');
  spreadsheet.getRange('B:B').activate();
  spreadsheet.getActiveSheet().setColumnWidth(2, 861);
  spreadsheet.getActiveRangeList().setFontColor('#980000')
  .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getRange('40:1000').activate();
  spreadsheet.getActiveSheet().deleteRows(spreadsheet.getActiveRange().getRow(), spreadsheet.getActiveRange().getNumRows());
  spreadsheet.getRange('C:Z').activate();
  spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());

  var folder = DriveApp.getFoldersByName("Schüler").next();     //gets first folder with the given foldername.
  folder.createFolder(student + " - Deutschunterricht");
  var subFolder = DriveApp.getFoldersByName(student + " - Deutschunterricht").next();
  subFolder.createFolder("Aktuelle Dokumente - " + student);
  subFolder.createFolder("Archiv");
  subFolder.createFolder("Materialien");
  var aktuelleDoc = DriveApp.getFoldersByName("Aktuelle Dokumente - " + student).next();
  
  aktuelleDoc.createFolder("Übersicht - " + student);
  
  var overview = SpreadsheetApp.create("Gesamtüberblick - " + student);
  var copyOverview = DriveApp.getFileById(overview.getId());
  aktuelleDoc.addFile(copyOverview);
  DriveApp.getRootFolder().removeFile(copyOverview);
  var sheetUrl = overview.getUrl();
  var spreadsheet = SpreadsheetApp.openByUrl(sheetUrl);
  spreadsheet.getRange('A:B').activate();
  spreadsheet.getActiveSheet().setColumnWidths(1, 2, 284);
  spreadsheet.getActiveRangeList().setBackground('#cfe2f3');
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getActiveSheet().setName('Vokabeln');
  spreadsheet.getRange('5:1000').activate();
  spreadsheet.getActiveSheet().deleteRows(spreadsheet.getActiveRange().getRow(), spreadsheet.getActiveRange().getNumRows());
  spreadsheet.getRange('C:Z').activate();
  spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());  spreadsheet.insertSheet(1);
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveSheet().setColumnWidth(1, 689);
  spreadsheet.getActiveRangeList().setBackground('#d9ead3');
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getActiveSheet().setName('Audio');
  spreadsheet.getRange('5:1000').activate();
  spreadsheet.getActiveSheet().deleteRows(spreadsheet.getActiveRange().getRow(), spreadsheet.getActiveRange().getNumRows());
  spreadsheet.getRange('B:Z').activate();
  spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
  spreadsheet.insertSheet(2);
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveSheet().setColumnWidth(1, 689);
  spreadsheet.getActiveRangeList().setBackground('#fff2cc');
  sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getActiveSheet().setName('Regeln');
  spreadsheet.getRange('5:1000').activate();
  spreadsheet.getActiveSheet().deleteRows(spreadsheet.getActiveRange().getRow(), spreadsheet.getActiveRange().getNumRows());
  spreadsheet.getRange('B:Z').activate();
  spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
  
  var lessonLog = SpreadsheetApp.create("Protokoll - " + student);
  var copyLessonLog = DriveApp.getFileById(lessonLog.getId());
  aktuelleDoc.addFile(copyLessonLog);
  DriveApp.getRootFolder().removeFile(copyLessonLog);
  var sheetUrl = lessonLog.getUrl();
  var spreadsheet = SpreadsheetApp.openByUrl(sheetUrl);
  spreadsheet.getRange('B:D').activate();
  spreadsheet.getActiveSheet().setColumnWidths(2, 3, 307);
  spreadsheet.getRange('B1').activate();
  spreadsheet.getCurrentCell().setValue('Themen')
  spreadsheet.getRange('C1').activate();
  spreadsheet.getCurrentCell().setValue('Hausaufgaben');
  spreadsheet.getRange('D1').activate();
  spreadsheet.getCurrentCell().setValue('Nächste Stunde');
  spreadsheet.getRange('1:1').activate();
  spreadsheet.getActiveRangeList().setFontWeight('bold');
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveRangeList().setFontWeight(null)
  .setFontWeight('bold');
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getRange('40:1000').activate();
  spreadsheet.getActiveSheet().deleteRows(spreadsheet.getActiveRange().getRow(), spreadsheet.getActiveRange().getNumRows());
  spreadsheet.getRange('E:Z').activate();
  spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
  
  var textDoc = DocumentApp.create("Textdokument - " + student);
  var copyTextDoc = DriveApp.getFileById(textDoc.getId());
  aktuelleDoc.addFile(copyTextDoc);
  DriveApp.getRootFolder().removeFile(copyTextDoc);
}
