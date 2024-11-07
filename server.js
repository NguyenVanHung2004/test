/**
 * @OnlyCurrentDoc
 * @NotOnlyCurrentDoc
 * Requires the following scope:
 * - https://www.googleapis.com/auth/script.external_request
 */

// Thay YOUR_RENDER_URL bằng URL từ Render
const BACKEND_URL = 'https://your-render-url.onrender.com/api/orders';

function onEdit(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Lấy headers
  const headers = data[0];
  
  // Chuyển đổi dữ liệu
  const orders = data.slice(1).map(row => {
    let order = {};
    headers.forEach((header, index) => {
      order[header] = row[index];
    });
    return order;
  });

  // Gửi dữ liệu
  try {
    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(orders),
      'muteHttpExceptions': true
    };
    
    const response = UrlFetchApp.fetch(BACKEND_URL, options);
    Logger.log('Response: ' + response.getContentText());
  } catch(error) {
    Logger.log('Error: ' + error.toString());
  }
}

// Menu để test
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Tùy chọn')
    .addItem('Gửi dữ liệu', 'manualSend')
    .addToUi();
}

function manualSend() {
  onEdit();
}