# mock-service-worker code demo

## Intro

This code demo uses the [Mock Service Worker](https://mswjs.io/) (msw) library to return mocked HTTP responses.

## How to run

1) Go to the `/code-demos/mock-service-worker` folder.
2) Run `npm i` to install all the packages.
3) Run `npm start` to start the app which will be available on http://localhost:4202.

## Implementation details

This solution uses the [msw npm package](https://www.npmjs.com/package/msw) which following the [Getting started](https://mswjs.io/docs/getting-started) guide and the [Browser integration](https://mswjs.io/docs/integrations/browser) guide. The implementation details are:

1) install `msw` npm package.
2) run the `npx msw init src/mock-api-responses` command. This will add the `mockService.Worker.js` script in the `src/mock-api-responses` folder, which is where I decided to put everything related with `msw`. 
3) instruct Angular to serve the `mockService.Worker.js` script from the root, meaning at http://localhost:4202/mockService.Worker.js. To do this an extra entry was added to the [assets configuration](https://lukasznojek.com/blog/2019/03/angular-cli-different-ways-to-include-assets) in the [angular.json](/code-demos/mock-service-worker/angular.json) file:
```json
{
  "glob": "mockServiceWorker.js",
  "input": "src/mock-api-responses",
  "output": "./"
}
```
4) create the [browser.ts](/code-demos/mock-service-worker/src/mock-api-responses/browser.ts) and [handlers.ts](/code-demos/mock-service-worker/src/mock-api-responses/handlers.ts) files as per `msw` documentation.
5) run the `msw` worker at app startup if the app is in development mode. This is done in the [app.module.ts](/code-demos/mock-service-worker/src/app/app.module.ts).
