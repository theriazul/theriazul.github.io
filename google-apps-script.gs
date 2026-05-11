const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Sheet1";

function doGet(e) {
  return createCORSResponse({
    success: true,
    message: "Newsletter endpoint is live",
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

    if (!SPREADSHEET_ID || SPREADSHEET_ID.includes("REPLACE_WITH")) {
      return createCORSResponse({
        success: false,
        error: "Google Spreadsheet ID is not configured in Apps Script.",
      });
    }

    const data = parseRequestBody(e);
    const email = (data.email || "").toString().trim();

    if (!email) {
      return createCORSResponse({
        success: false,
        error: "Email is required",
      });
    }

    const sheet =
      SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      return createCORSResponse({
        success: false,
        error: "Sheet not found: " + SHEET_NAME,
      });
    }

    sheet.appendRow([email, new Date()]);

    return createCORSResponse({
      success: true,
      message: "Email saved successfully",
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

function createCORSResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Origin")
    .setHeader("Access-Control-Max-Age", "3600");
}
