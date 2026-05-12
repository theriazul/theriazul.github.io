const SPREADSHEET_ID = ""; // Optional: set your spreadsheet ID if this is a standalone web app.
const SHEET_NAME = "Sheet1";

function doGet(e) {
  const spreadsheet = getTargetSpreadsheet();
  const sheet = spreadsheet
    ? spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0]
    : null;

  return createCORSResponse({
    success: true,
    message: "Newsletter endpoint is live",
    spreadsheetId: spreadsheet ? spreadsheet.getId() : "No spreadsheet found",
    sheetName: sheet ? sheet.getName() : "No sheet found",
    lastRow: sheet ? sheet.getLastRow() : 0,
  });
}

function doOptions(e) {
  return createCORSResponse({
    success: true,
    message: "Options OK",
  });
}

function doPost(e) {
  try {
    Logger.log("doPost called");
    Logger.log("postData type: " + (e.postData ? e.postData.type : "none"));
    Logger.log(
      "postData contents: " + (e.postData ? e.postData.contents : "none"),
    );
    Logger.log("request parameters: " + JSON.stringify(e.parameter || {}));

    const data = parseRequestBody(e);
    const email = (data.email || "").toString().trim();

    if (!email) {
      return createCORSResponse({
        success: false,
        error: "Email is required",
      });
    }

    const spreadsheet = getTargetSpreadsheet();
    if (!spreadsheet) {
      return createCORSResponse({
        success: false,
        error:
          "Unable to open spreadsheet. Set SPREADSHEET_ID or bind the script to the target spreadsheet.",
      });
    }

    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log("Sheet not found by name: " + SHEET_NAME);
      const sheets = spreadsheet.getSheets();
      if (sheets.length > 0) {
        sheet = sheets[0];
        Logger.log("Falling back to first sheet: " + sheet.getName());
      }
    }

    if (!sheet) {
      return createCORSResponse({
        success: false,
        error: "No sheets available in spreadsheet.",
      });
    }

    sheet.appendRow([email, new Date()]);
    Logger.log("Appended email row to sheet: " + sheet.getName());

    // Get the last row number to confirm storage
    const lastRow = sheet.getLastRow();
    Logger.log("Last row in sheet: " + lastRow);

    return createCORSResponse({
      success: true,
      message: "Email saved successfully",
      spreadsheetId: spreadsheet.getId(),
      sheetName: sheet.getName(),
      lastRow: lastRow,
    });
  } catch (error) {
    Logger.log("doPost error: " + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString(),
    });
  }
}

function parseRequestBody(e) {
  try {
    if (e.postData && e.postData.contents) {
      const contentType = (e.postData.type || "").toLowerCase();
      Logger.log("Detected content type: " + contentType);
      if (
        contentType.includes("application/json") ||
        contentType.includes("text/plain")
      ) {
        return JSON.parse(e.postData.contents);
      }
      if (contentType.includes("application/x-www-form-urlencoded")) {
        return parseUrlEncodedBody(e.postData.contents);
      }
    }

    if (e.parameter && e.parameter.email) {
      return { email: e.parameter.email };
    }
  } catch (error) {
    Logger.log("parseRequestBody error: " + error.toString());
  }

  return {};
}

function parseUrlEncodedBody(contents) {
  const parsed = Utilities.parseQueryString(contents);
  const result = {};
  for (const key in parsed) {
    if (Object.prototype.hasOwnProperty.call(parsed, key)) {
      result[key] = Array.isArray(parsed[key]) ? parsed[key][0] : parsed[key];
    }
  }
  return result;
}

function getTargetSpreadsheet() {
  if (SPREADSHEET_ID && !SPREADSHEET_ID.includes("REPLACE_WITH")) {
    Logger.log("Opening spreadsheet by ID: " + SPREADSHEET_ID);
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  Logger.log("Opening active spreadsheet for bound script");
  return SpreadsheetApp.getActiveSpreadsheet();
}

function createCORSResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Origin")
    .setHeader("Access-Control-Max-Age", "3600");
}
