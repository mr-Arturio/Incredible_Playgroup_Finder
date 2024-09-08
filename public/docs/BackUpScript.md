### Google Sheet Back Up script
that stores data into [Google Drive Folder](https://drive.google.com/drive/u/0/folders/1Yt0aWfkVSQQ61om9WAFlFduBHbTUVtf_)

```JavaScript
function backupSpreadsheet() {
  var today = new Date();
  var day = today.getDate();

  // Only run the backup on even days (or customize this logic)
  if (day % 2 === 0) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var spreadsheetId = ss.getId();
    var sheet = ss.getActiveSheet();
    var sheetName = sheet.getName();

    // Get the current date in YYYY-MM-DD format
    var dateString = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    var exportUrl = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export?format=xlsx&id=' + spreadsheetId;

    var token = ScriptApp.getOAuthToken();
    var options = {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(exportUrl, options);

    if (response.getResponseCode() == 200) {
      // Set file name as IPFData with the current date in .xlsx format
      var blob = response.getBlob().setName('IPFData_' + dateString + '.xlsx');
      var folder = DriveApp.getFolderById('1Yt0aWfkVSQQ61om9WAFlFduBHbTUVtf_');  // Set your Google Drive folder ID to store backup
      folder.createFile(blob);  // Save backup file to Drive

      Logger.log('Spreadsheet backed up successfully!');
    } else {
      Logger.log('Failed to export the spreadsheet: ' + response.getContentText());
    }
  } else {
    Logger.log('Skipping backup, today is not an even day.');
  }
}

```