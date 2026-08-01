/**
 * CHAPTER ONE CAFE - GOOGLE SHEETS ORDER LOGGING APP SCRIPT
 * 
 * Instructions:
 * 1. Open Google Sheets -> Click 'Extensions' -> 'Apps Script'.
 * 2. Paste this code into Code.gs.
 * 3. Click 'Deploy' -> 'New deployment'.
 * 4. Select type: 'Web app'.
 * 5. Set 'Execute as': 'Me'.
 * 6. Set 'Who has access': 'Anyone'.
 * 7. Click 'Deploy', copy the Web App URL, and paste it into src/data/menuData.js (GOOGLE_SHEET_WEBHOOK_URL).
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order ID",
        "Timestamp",
        "Customer Name",
        "Customer Phone",
        "Table / Note",
        "Ordered Items",
        "Total Items Count",
        "Total Amount (INR)",
        "Status"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#F3F3F3");
    }

    var data = JSON.parse(e.postData.contents);
    
    var itemsFormatted = data.items.map(function(item) {
      var details = item.name;
      if (item.sizeName) details += " (" + item.sizeName + ")";
      if (item.stuffedCrust) details += " [+Stuffed Crust]";
      if (item.extraCheeseSlice) details += " [+Extra Cheese]";
      details += " x" + item.quantity + " = ₹" + (item.unitPrice * item.quantity);
      return details;
    }).join(" | ");

    sheet.appendRow([
      data.orderId || "ORD-" + Date.now(),
      data.dateFormatted || new Date().toLocaleString(),
      data.customerName || "Guest",
      data.customerPhone || "N/A",
      data.tableNumber || "Direct Order",
      itemsFormatted,
      data.totalCount || 1,
      data.totalAmount || 0,
      "New Order"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Order logged successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Chapter One Cafe Order Webhook is active!");
}
