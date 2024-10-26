# Deploy your Web-App

You can Deploy your Web-App in two different ways.

## First way to deploy

#### From terminal with clasp

Make sure that you have in the `.appsscript.json` file this option:

```json
{
  ...
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
clasp deploy --description "Message"
```

or

```shell
clasp deploy -d "Message"
```

The second time you have to add the deployId to the command. To see the deployIds type:

```shell
clasp deployments
```

A list appears with your deployments. Copy the Id from your last deployment and add it to the
command:

```shell
clasp deploy <deployId> -d "Message"
```

To see your Web-App in the browser type:

```shell
clasp open --webapp
```

a list appears with all your deployments. Choose your last deployment and the Web-App opens in the
browser.

## Second way to deploy

#### From your browser

After pushing the changes with `npm run build`, open your Google Script:

```shell
clasp open
```

The Google Script opens in the browser.

Press the "Deploy" button and select "New Deployment". Add a description, choose your options and
press "Deploy". From there you can copy the new URL and you can open the Web-App.

After changes to your Web-App and pushing the files to Google Script, you have to open again the
Google Script with `clasp open` and make the same steps again to create the new deployment.

# Test your Web-App before deploy

After changes push the files to Google Script:

```shell
npm run build
```

Now go to your Google Script:

```shell
clasp open --webapp
```

A list appears with your Web-App deployments. Choose your last deployment and your Web-App opens in
the browser.

Keep the Web-App open in your browser.

After making changes to your App, push your changes:

```shell
npm run build
```

Go to your browser and reload the page. The change are now applied.

With this you can test your Web-App before creating a new deployment.
