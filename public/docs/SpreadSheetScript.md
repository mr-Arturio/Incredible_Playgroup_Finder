### Sript for IPF SpreadSheet

This script automates the process of populating weekly event occurrences from a source sheet (WorkSheet) to a target sheet (MainSheet). It processes events marked as "Weekly," calculates the next five dates for each weekly event, and creates new rows with the corresponding dates in the target sheet.

#### Key functionalities:
- Clears the existing data in the target sheet before adding new rows.
- Calculates and adds the next **five** occurrences for events based on the specified day of the week.
- Skips unnecessary columns like "ID" and "Repeats" while updating the event dates.
- Automatically generates row IDs and sorts the data by the "Organizer" column in alphabetical order.

```JavaScript
function populateWeeklyEvents() {
  // Define the sheet names
  const sourceSheetName = "WorkSheet"; // Change this to the name of your source sheet
  const targetSheetName = "MainSheet"; // Change this to the name of your target sheet

  // Open the spreadsheet and sheets
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName(sourceSheetName);
  const targetSheet = ss.getSheetByName(targetSheetName);

  const lastRow = targetSheet.getLastRow();

  // Check if there's data beyond the header row
  if (lastRow > 1) {
    targetSheet.getRange(2, 1, lastRow - 1, targetSheet.getLastColumn()).clearContent();
  } else {
    // If there is only the header row, clear everything below it to reset the sheet
    targetSheet.getRange(2, 1, 1, targetSheet.getLastColumn()).clearContent();
  }

  // Get all data from the source sheet
  const sourceData = sourceSheet.getDataRange().getValues();
  const headers = sourceData[0]; // Header row
  const data = sourceData.slice(1); // Data rows

  // Define the column indices based on your headers
  const repeatsCol = headers.indexOf("Repeats");
  const dayCol = headers.indexOf("Day");
  const eventDateCol = headers.indexOf("eventDate");

  // Today's date
  const today = new Date();

  // Define day mapping (assuming Day column is in string format like "Tue")
  const dayMapping = {
    "Mon": 1,
    "Tue": 2,
    "Wed": 3,
    "Thur": 4,
    "Fri": 5,
    "Sat": 6,
    "Sun": 0
  };

  // Create an array to store the new rows
  const newRows = [];

  // Iterate through each row in the source data
  data.forEach(function (row) {
    if (row[repeatsCol] === "Weekly" && row[dayCol]) {
      // Calculate the next 5 dates for the weekly event
      const dayOfWeek = dayMapping[row[dayCol]];
      const eventDates = getNextFiveOccurrences(today, dayOfWeek);

      // Create a new row for each date
      eventDates.forEach(function (date) {
        // Copy the original row, excluding the "ID" and "Repeats" columns
        const newRow = row.slice(1); // Skip the first column (ID)
        newRow[eventDateCol - 1] = formatDate(date); // Update the eventDate field, adjusting for the skipped ID column

        // Remove the "Repeats" column before adding the new row to the target sheet
        newRow.splice(repeatsCol - 1, 1);

        newRows.push(newRow); // Add the new row to the array
      });
    } else {
      // Copy the row as is (even if it doesn't have Repeats, Day, or eventDate)
      const newRow = row.slice(1); // Skip the first column (ID)

      // Remove the "Repeats" column before adding the row to the target sheet
      if (repeatsCol !== -1) {
        newRow.splice(repeatsCol - 1, 1);
      }

      newRows.push(newRow);
    }
  });

  // Paste the new rows into the target sheet, starting from column B (since column A is for the ID)
  if (newRows.length > 0) {
    targetSheet.getRange(2, 2, newRows.length, newRows[0].length).setValues(newRows);

    // Fill column A with the formula =ROW()-1 for each row with data
    for (let i = 2; i <= newRows.length + 1; i++) {
      targetSheet.getRange(i, 1).setFormula('=ROW()-1');
    }

    // Sort the target sheet by the Organizer column (Column B)
    targetSheet.getRange(2, 1, newRows.length, targetSheet.getLastColumn()).sort({ column: 2, ascending: true });
  }
}

// Function to calculate the next 5 occurrences of a specific day of the week
function getNextFiveOccurrences(startDate, dayOfWeek) {
  const occurrences = [];
  let date = new Date(startDate);

  // Find the first occurrence
  while (date.getDay() !== dayOfWeek) {
    date.setDate(date.getDate() + 1);
  }

  // Add the first occurrence and the next 5
  for (let i = 0; i < 6; i++) {
    occurrences.push(new Date(date));
    date.setDate(date.getDate() + 7); // Move to the next week
  }

  return occurrences;
}

// Function to format the date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return year + "-" + month + "-" + day;
}
```