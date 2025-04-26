# Deploy your Web-App

You can Deploy your Web-App in two different ways.

## First way to deploy

#### From terminal with clasp

Make sure that you have added in the `.appsscript.json` file the `webapp` option:

```json
{
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "MYSELF"
  }
}
```

For "access" you can choose "MYSELF" or "ANYONE". For more information you can read
[here](https://developers.google.com/apps-script/manifest/web-app-api-executable?hl=de#webapp).

After pushing your changes in the first time with `npm run build`, type in the terminal:

```shell
clasp create-deployment --description "Message"
```

or

```shell
clasp create-deployment -d "Message"
```

The second time you have to add the deployId to the command. To see the deployIds type:

```shell
clasp deployments
```

A list appears with your deployments. Copy the Id from your last deployment and add it to the
command:

```shell
clasp create-deployment -d "Message" -i <deployId>
```

To see your Web-App in the browser type:

```shell
clasp open-script
```

The script opens in your browser. Press "Deploy" and "Manage Deployments". Click on the URL and your web app opens in a new tab.

# Test your Web-App before deploy

To test your Web-App before deploy it, go first to Google Script:

```shell
clasp open-script
```

The Script opens in the browser. Press "Deploy" and then "Test Deployment". Now click the URL to
open the Web-App.

The Web-App opens in a new tab. Keep it open in your browser.

Go to your editor and make the needed changes. If you want to see how it looks, push the files to
Google Script:

```shell
npm run build
```

Now go to your browser, reload the page and now all the changes are applied.

With this method you can test your Web-App before creating a new deployment.
