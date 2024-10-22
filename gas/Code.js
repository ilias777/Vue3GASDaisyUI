function doGet(e) {
  return HtmlService.createTemplateFromFile('index.html')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Vue3 GAS with DaisyUI')
}

function getSheetData() {
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let ws = ss.getSheetByName('Sheet1')
  let data = ws.getRange(2, 1, ws.getLastRow() - 1, 3).getValues()

  return data
}
