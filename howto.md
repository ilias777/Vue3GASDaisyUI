# How to

🛠️ These are the steps to recreate the project.

#### Create a Vue project

```shell
npm create vue@latest
```

In this project Router, Pinia, Eslint and Prettier are using.

#### Install `vite-plugin-singlefile` plugin

This [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) plugin
allows you to inline all JavaScript and CSS resources directly into the final dist/index.html file.
By doing this, your entire web app can be embedded and distributed as a single HTML file.

```shell
npm install vite-plugin-singlefile --save-dev
```

#### Install `tailwindcss`

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add `tailwindcss` to `tailwind.config.js` file:

```javascript
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add tailwind directives in `main.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Install `DaisyUI`

```shell
npm i -D daisyui@latest
```

Add `DaisyUI` to tailwind.config.js:

```javascript
import daisyui from 'daisyui'
module.exports = {
  //...
  plugins: [daisyui],
}
```

#### Create Google Sheets and Google Script

Go to Google Docs and create a new Spreadsheet. Rename the Spreadsheet and add some random data for
testing reading data and adding data to it.

From there go to the menu above and go to `Extensions` &rarr; `Apps Script`. A new page is loading
with your script. Rename the script as you like and copy the `scriptID` from this script.

#### Install `clasp`

[clasp](https://github.com/google/clasp) is a command line tool to develop Apps Script projects
locally.

```shell
npm install -g @google/clasp
```

Make sure to have Google Apps Script API enable. Check it under
[https://script.google.com/home/usersettings](https://script.google.com/home/usersettings)

Login to your Google account from your terminal:

```shell
clasp login
```

Create a `./gas` folder in the root of your project:

```shell
mkdir gas
```

Clone the script with clasp in the ./gas folder:

```shell
clasp clone --rootDir ./gas <scriptID>
```

Move `.clasp.json` file from the ./gas folder to the root directory:

```shell
mv ./gas/.clasp.json .
```

#### Install types for Google Apps Script

```shell
npm install --save-dev @types/google-apps-script
```

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

To prevent ESLint for "not defined" errors, put this in `eslint.config.js` file:

```javascript
export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      globals: {
        HtmlService: 'readonly',
      },
      env: {
        'google-apps-script': true,
      },
    },
  },
  // ...
]
```

This will inform ESLint about the `HtmlService` object, ensuring it no longer complains about
undefined GAS objects when you’re working with Apps Script code locally.

#### Update build script in `package.json` file

```json
"scripts": {
    "build": "vite build && mv ./dist/index.html ./gas && clasp push",
}
```

After every change in your app, you have to build the project. A `index.html` file are created, then
this file is moved to ./gas folder and lastly `clasp` pushes the files to the Google Script.

#### Fix Vue Router for Google Apps Script Web App

To work properly with Vue Router change "history" property, add this:

```javascript
const { createRouter, createWebHashHistory } = VueRouter
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
```

#### Create a Web App from Google Script

After pushing the files to Google Script, go to the Google Script website and deploy your Web App.

Go to `Deploy` and make a new deployment and chose "Web App". Set a description and press deploy.

Press the Web App URL to show your Web App.

Now your Web App is ready to use!

#### Try tailwind and DaisyUI

- Delete `./src/assets/base.css`
- Delete import statement `@import './base.css';` from `main.css`
- Go to `TheWelcome.vue` file, remove the template content and add this:

```vue
<template>
  <h1 class="text-3xl font-bold underline mb-5">Text with tailwind classes</h1>
  <button class="btn">DaisyUI Button</button>
</template>
```

Now open your Google Script and redeploy your App. You can open the Google Script from your terminal
with:

```shell
clasp open
```

After redeploy the App, press on the URL to open the Web App. As you can see, tailwind and DaisyUI
are in use.

#### Read data from Spreadsheet

Go to `./gas/Code.js` and put this function:

```javascript
function getSheetData() {
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let ws = ss.getSheetByName('Sheet1')
  let data = ws.getRange(2, 1, ws.getLastRow() - 1, 3).getValues()

  return data
}
```

In the `TheWelcome.vue` file:

```
import { ref, onMounted } from 'vue'

const spreadsheetData = ref([])

const getDataFromSheet = () => {
  google.script.run
    .withSuccessHandler(response => {
      spreadsheetData.value = response
    })
    .getSheetData()
}

onMounted(() => {
  getDataFromSheet()
})
```

The data are displayed on the page.

#### Add data to Spreadsheet

Go to `./gas/Code.js` and put this function:

```javascript
function writeValues(val) {
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let ws = ss.getSheetByName('Questions')
  ws.getRange(ws.getLastRow() + 1, 1, 1, val.length).setValues([val])
}
```

In `TheWelcome.vue` file add this code:

```
const dataToSheet = ['four', 'five', 'six']

const writeDataToSheet = () => {
  google.script.run.withSuccessHandler().writeValues(dataToSheet)
}
```

Now add a click event to the Button:

```html
<button class="btn mb-5" @click="writeDataToSheet">DaisyUI Button</button>
```

If you are now click on the button, the values are added to the Spreadsheet.

<hr>

From here you can start build you own app with Vue, Tailwind and DaisyUI.

Happy coding!!
