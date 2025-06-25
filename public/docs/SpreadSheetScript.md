### Sript for IPF SpreadSheet
<strong>*</strong>Updated <br>
This script automates the process of populating weekly event occurrences from a source sheet (WorkSheet) to a target sheet (MainSheet). It processes events marked as "Weekly," calculates the next five dates for each weekly event, and creates new rows with the corresponding dates in the target sheet.

#### Key functionalities:
- <strong>*</strong>Conditional Data Clearing: Clears the existing data in the target sheet only if there are no errors during processing, ensuring that valid data is not overwritten in case of issues.
- <strong>*</strong>Error Handling: Adds robust error handling to check for missing sheets, columns, or invalid data values and logs meaningful error messages to assist with troubleshooting.
- <strong>*</strong>Sorts the newly added rows in the target sheet by the "Organizer" column in alphabetical order to maintain a clear and logical structure for event data.
- Calculates and adds the next **five** occurrences for events based on the specified day of the week.
- Skips unnecessary columns like "ID" and "Repeats" while updating the event dates.
- Automatically generates row IDs and sorts the data by the "Organizer" column in alphabetical order.

2025-06-25 Update
Changes implemented:
1. "Never" Support
- Rows with `Repeats = "Never"` are now skipped and not copied to the `MainSheet`, allowing you to keep hidden or draft events in the `WorkSheet`.
2. Smart Start Date for Weekly Events
- If `Repeats = "Weekly"`:
   - And `eventDate` is empty → the script starts generating dates from today.
   - If `eventDate` is provided and matches the specified `Day`, it starts repeating from that specific eventDate.
   - If `eventDate` is present but does not match the `cd..Day`, the row is skipped and logged as an error.


```JavaScript
function populateWeeklyEvents() {
  try {
    // Define the sheet names
    const sourceSheetName = "WorkSheet"; // Change this to the name of your source sheet
    const targetSheetName = "MainSheet"; // Change this to the name of your target sheet

    // Open the spreadsheet and sheets
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sourceSheet = ss.getSheetByName(sourceSheetName);
    const targetSheet = ss.getSheetByName(targetSheetName);

    // Check if source and target sheets exist
    if (!sourceSheet) {
      throw new Error(`Source sheet "${sourceSheetName}" not found.`);
    }
    if (!targetSheet) {
      throw new Error(`Target sheet "${targetSheetName}" not found.`);
    }

    // Get all data from the source sheet
    const sourceData = sourceSheet.getDataRange().getValues();
    if (sourceData.length < 2) {
      throw new Error("No data found in the WorkSheet sheet.");
    }
    const headers = sourceData[0]; // Header row
    const data = sourceData.slice(1); // Data rows

    // Define the column indices based on your headers
    const repeatsCol = headers.indexOf("Repeats");
    const dayCol = headers.indexOf("Day");
    const eventDateCol = headers.indexOf("eventDate");

    // Ensure the required columns exist
    if (repeatsCol === -1 || dayCol === -1 || eventDateCol === -1) {
      throw new Error("One or more required columns (Repeats, Day, eventDate) are missing.");
    }

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
    let success = true;  // Flag to track if processing is successful

    // Iterate through each row in the source data
    data.forEach(function (row, rowIndex) {
      try {
        const repeatsValue = row[repeatsCol];

        // Skip if Repeats === "Never"
        if (repeatsValue === "Never") {
          Logger.log(`Row ${rowIndex + 2} skipped because Repeats = Never`);
          return;
        }

        // Repeat Weekly logic
        if (row[repeatsCol] === "Weekly" && row[dayCol]) {
          // Calculate the next 5 dates for the weekly event
          const dayOfWeek = dayMapping[row[dayCol]];
          if (dayOfWeek === undefined) {
            throw new Error(`Invalid day value "${row[dayCol]}" in row ${rowIndex + 2}.`);
          }

          // Use eventDate if provided and valid, otherwise default to today
          let startDate = today;
          const rawEventDate = row[eventDateCol];

          if (rawEventDate && rawEventDate instanceof Date && !isNaN(rawEventDate)) {
            if (rawEventDate.getDay() !== dayOfWeek) {
              throw new Error(
                `Mismatch between eventDate (${formatDate(rawEventDate)}) and Day (${row[dayCol]}) in row ${rowIndex + 2}`
              );
            }
            startDate = rawEventDate;
          }

          const eventDates = getNextFiveOccurrences(startDate, dayOfWeek);

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
      } catch (rowError) {
        Logger.log(`Error processing row ${rowIndex + 2}: ${rowError.message}`);
        success = false;  // Mark the process as unsuccessful
      }
    });

    if (success) {
      // Only clear and populate the sheet if there were no errors
      const lastRow = targetSheet.getLastRow();

      // Check if there's data beyond the header row and clear it
      if (lastRow > 1) {
        targetSheet.getRange(2, 1, lastRow - 1, targetSheet.getLastColumn()).clearContent();
      } else {
        // If there is only the header row, clear everything below it to reset the sheet
        targetSheet.getRange(2, 1, 1, targetSheet.getLastColumn()).clearContent();
      }

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
    } else {
      Logger.log("Process failed. No data was cleared or written to the target sheet.");
    }
  } catch (error) {
    Logger.log(`Error in populateWeeklyEvents: ${error.message}`);
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