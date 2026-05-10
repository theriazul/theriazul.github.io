const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Sheet1";

function doGet(e) {
  return createCORSResponse({
    success: true,
    message: "Newsletter endpoint is live",
  });
}

function doOptions(e) {
  return createCORSResponse({ success: true, message: "OK" });
}

function doPost(e) {
  try {
    console.log("doPost called", {
      postDataType: e.postData ? e.postData.type : null,
      postDataContents: e.postData ? e.postData.contents : null,
      parameters: e.parameter,
    });

    if (!SPREADSHEET_ID || SPREADSHEET_ID.includes("REPLACE_WITH")) {
      return createCORSResponse({
        success: false,
        message: "Google Spreadsheet ID is not configured in Apps Script.",
      });
    }

    const payload = parseRequestBody(e);
    const email = (payload.email || "").toString().trim();

    if (!email) {
      return createCORSResponse({
        success: false,
        message: "Email is required",
      });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return createCORSResponse({
        success: false,
        message: `Sheet not found: ${SHEET_NAME}`,
      });
    }

    sheet.appendRow([email, new Date()]);

    return createCORSResponse({
      success: true,
      message: "Email saved successfully",
    });
  } catch (error) {
    console.error("doPost error:", error);
    return createCORSResponse({
      success: false,
      message: "Internal server error: " + (error.message || "Unknown error"),
    });
  }
}

function parseRequestBody(e) {
  try {
    if (e.postData && e.postData.contents) {
      const contentType = (e.postData.type || "").toLowerCase();
      if (contentType.includes("application/json")) {
        return JSON.parse(e.postData.contents);
      }
      if (contentType.includes("application/x-www-form-urlencoded")) {
        const parsed = Utilities.parseQueryString(e.postData.contents);
        const result = {};
        for (const key in parsed) {
          if (parsed.hasOwnProperty(key)) {
            result[key] =
              parsed[key] && parsed[key].length ? parsed[key][0] : "";
          }
        }
        return result;
      }
    }

    if (e.parameter && e.parameter.email) {
      return { email: e.parameter.email };
    }
  } catch (error) {
    console.error("Failed to parse request body:", error);
  }
  return {};
}

function createCORSResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Origin")
    .setHeader("Access-Control-Max-Age", "3600");
}
