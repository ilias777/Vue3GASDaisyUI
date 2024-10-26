# Vue3GASDaisyUI

This template should help get you started developing with Vue 3 in Vite, with TailwindCSS and
DaisyUI. As a Backend we are using Google Sheet and Google Apps Script.

## Tools

#### Frontend

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

#### Backend

![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script-blue?style=for-the-badge&logo=google%20apps%20script&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Google_Sheets-darkgreen?style=for-the-badge&logo=google%20sheets&logoColor=white)

#### Build tools

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Clasp](https://img.shields.io/badge/CLASP-darkblue?style=for-the-badge&logo=google&logoColor=white)

## Setup

Clone the project:

```shell
git clone git@github.com:ilias777/Vue3GASDaisyUI.git
```

Navigate to the root folder:

```shell
cd Vue3GASDaisyUI
```

Remove `git` and add your own repo later if you want:

```shell
rm -rf .git*
```

Install dependencies:

```shell
npm install
```

#### Create Google Sheets and Google Script

Go to Google Docs and create a new Spreadsheet. Rename the Spreadsheet and add some random data for
testing reading data and adding data to it.

From there go to the menu above and go to `Extensions` &rarr; `Apps Script`. A new page is loading
with your script. Rename the script as you like and copy the `scriptID` from this script
(https://script.google.com/macros/s/{scriptID}/edit).

#### Install `clasp`

[clasp](https://github.com/google/clasp) is a command line tool to develop Apps Script projects
locally.

```shell
npm install -g @google/clasp
```

Make sure to have Google Apps Script API enabled. Check it under
[https://script.google.com/home/usersettings](https://script.google.com/home/usersettings)

Login to your Google account from your terminal:

```shell
clasp login
```

Clone the Google Script with `clasp` in the ./gas folder:

```shell
clasp clone --rootDir ./gas <scriptID>
```

Remove the `.clasp.json` file from the root directory:

```shell
rm .clasp.json
```

After cloning the Google Script, a `.clasp.json` file is created in the ./gas folder.
Move it to the root directory:

```shell
mv ./gas/.clasp.json .
```

This contains the `scriptID` from your Google Script to connect with it.

#### Add `doGet` method

Go to `./gas/Code.js` file and add this code:

```javascript
function doGet(e) {
  return HtmlService.createTemplateFromFile('index.html')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Vue3 GAS with DaisyUI')
}
```

#### Add function to read data from Spreadsheet

Go to `./gas/Code.js` and put this function:

```javascript
function getSheetData() {
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let ws = ss.getSheetByName('Sheet1')
  let data = ws.getRange(2, 1, ws.getLastRow() - 1, 3).getValues()

  return data
}
```

#### Add function to add data to Spreadsheet

Go to `./gas/Code.js` and put this function:

```javascript
function writeValues(val) {
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let ws = ss.getSheetByName('Sheet1')
  ws.getRange(ws.getLastRow() + 1, 1, 1, val.length).setValues([val])
}
```

#### Push files to Google Script

```shell
npm run build
```

#### Deploy and test your Web App

Read here how to deploy and test the Web-App.

<hr>

### How this works is explained in [How To](https://github.com/ilias777/Vue3GASDaisyUI/blob/main/howto.md)
