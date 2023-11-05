# Mock HTTP responses with Angular

- [Intro](#intro)
- [Code demos](#code-demos)
- [Preferred solution](#preferred-solution)
- [Other possible solutions](#other-possible-solutions)
  - [Angular HTTP interceptors](#angular-http-interceptors)
  - [Mock Service Worker comparison with similar tools](#mock-service-worker-comparison-with-similar-tools)
- [Learn more](#learn-more)
  - [Angular proxying support](#angular-proxying-support)
  - [Webpack dev-server middleware](#webpack-dev-server-middleware)
  - [Mock Service Worker](#mock-service-worker)
  - [Angular HTTP interceptors](#angular-http-interceptors-1)

## Intro

I was working on an Angular project with micro frontends using [Webpack Module Federation](https://github.com/edumserrano/webpack-module-federation-with-angular) where I was building a page that had to load two micro frontends. 

Whilst working on developing this page, the way I was dealing with the API calls from the micro frontends was by using [Angular's proxying support](https://angular.io/guide/build#proxying-to-a-backend-server) to send the API calls from the micro frontends to the APIs that were deployed on a non-prod environment or to local running instances.

I was facing a few issues with the above approach:

- Sometimes the non-prod APIs had issues/downtime and it affected the local development of the page. 
- The API calls were taking some non-negligible time to complete. This slowed down the development of the page and was painful for the dev loop experience.
- Some API requests require authentication and there was no easy way to provide it. Note that this was doable, I could go through the steps to get the required authentication headers and send them with the API requests using Angular's proxying support but it was still a cumbersome process.
- It's cumbersome having to start local versions of the APIs whenever I didn't want/couldn't use the non-prod APIs.
- Sometimes I wanted to test scenarios for the development of the page which depended on the data returned from the API calls. This was not only a cumbersome process but it was also an impossible one depending on the scenario I wanted to simulate.

> **Note**
>
> It's also important to remember that a lot of the changes needed to do on the page were non-dependent on the API calls from the micro frontends, such as style changes, but the app wouldn't even start/work properly if those API calls fail.
>

**This repo is the result of investigating ways to provide a solution for this problem by providing a way to control the returned HTTP responses.**

## Code demos

| Demo                                                                                 | Description                                                                                                                                 |
| :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| [angular-proxy-bypass](/code-demos/angular-proxy-bypass/README.md)                   | Shows how to use [Angular's proxying support](https://angular.io/guide/build#proxying-to-a-backend-server) to return mocked HTTP responses. |
| [webpack-dev-server-middleware](/code-demos/webpack-dev-server-middleware/README.md) | Shows how to add a middleware to [Webpack's dev-server](https://github.com/webpack/webpack-dev-server) to return mocked HTTP responses.     |
| [mock-service-worker](/code-demos/mock-service-worker/README.md)                     | Shows how to use [msw](https://mswjs.io/) to return mocked HTTP responses.                                                                  |

## Preferred solution

I believe [msw](https://mswjs.io/) is the best option for mocking HTTP responses. You can even use it for other scenarios, such as [unit tests](https://kentcdodds.com/blog/stop-mocking-fetch).

For the scenario I described in the [intro section](#intro) I ended up using both msw and [Angular Proxy](https://medium.com/ngconf/how-to-proxy-http-requests-in-angular-f873183880a4). I setup my Angular app so that it had two [development configurations](https://angular.io/guide/workspace-config#alternate-build-configurations) and also made use of an [environment variable](https://angular.io/guide/build) that controlled whether or not the msw worker would start:

- `npm run start:with-mocks` which did `ng serve --configuration api-mocks` and set to `true` the environment variable to start the msw worker: when the app was started with this command, the API requests would return mocked responses with msw.
- `npm run start:with-proxy` which did `ng serve --configuration api-proxy` and set to `false` the environment variable to start the msw worker: when the app was started with this command, the API requests would be proxied using Angular's proxy support.

## Other possible solutions

### Angular HTTP interceptors

You could use [Angular HTTP interceptors](https://angular.io/guide/http-intercept-requests-and-responses) to return mocked responses based on some environment variable. 

> **Note**
>
> I couldn't get this solution to work for my scenario which used Webpack Module Federation. I added an HTTP interceptor in the app that was loading the two micro frontends but I couldn't get the interceptor to intercept any of the HTTP calls from the remotely loaded micro frontends.
>
> This is probably feasable but I didn't dig more into it. I belive it would require a certain setup in making sure the HttpClient is a singleton across the micro frontends. For more info see the [links in the learn more section](#angular-http-interceptors-1) about Angular HTTP interceptors.
>

### Mock Service Worker comparison with similar tools

The Mock Service Worker documentation page [comparing msw with other tools](https://mswjs.io/docs/comparison) shows not only a lot of alternative tools you can use but it also compares them to msw.

## Learn more

The following links were helpful whilst researching the solutions provided in this repo:

- [4 Ways to Mock Backend Responses in Angular](https://javascript.plainenglish.io/mock-backend-responses-in-angular-320694a515c)

### Angular proxying support

- [How to proxy HTTP requests in Angular](https://medium.com/ngconf/how-to-proxy-http-requests-in-angular-f873183880a4)
- Angular docs: [Proxying to a backend server](https://angular.io/guide/build#proxying-to-a-backend-server)
- Angular docs: [Bypass the proxy](https://angular.io/guide/build#bypass-the-proxy)
- webpack/webpack-dev-server#829
- stackoverflow: [Angular proxy bypass intercepts all requests regardless of path](https://stackoverflow.com/questions/69906702/angular-proxy-bypass-intercepts-all-requests-regardless-of-path)
- stackoverflow: [How do you return data to your Angular app using proxy.conf.json?](https://stackoverflow.com/questions/49443750/how-do-you-return-data-to-your-angular-app-using-proxy-conf-json)
- Webpack docs: [dev-server proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)
- [Mastering Angular proxy configuration](https://jmrobles.medium.com/mastering-angular-proxy-configuration-6c8df0b175fe)
- [chimurai/http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

### Webpack dev-server middleware

- [webpack/webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [webpack/webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
- webpack/webpack-dev-server#4129

### Mock Service Worker

- [Stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch)
- [https://mswjs.io/](https://mswjs.io/) and it's [Getting started](https://mswjs.io/docs/getting-started) guide
- [mswjs/msw](https://github.com/mswjs/msw)
- [mswjs/examples](https://github.com/mswjs/examples)
- mswjs/msw#887

### Angular HTTP interceptors

- Angular docs: [HTTP - Intercept requests and responses](https://angular.io/guide/http-intercept-requests-and-responses)
- Angular docs: [HTTP - interceptor use-cases](https://angular.io/guide/http-interceptor-use-cases)
- stackoverflow: [interceptor in angular and module federation](https://stackoverflow.com/questions/76184144/interceptor-in-angular-and-module-federation)
- stackoverflow: [How to import Angular HTTP interceptor only for Child module](https://stackoverflow.com/questions/53305685/how-to-import-angular-http-interceptor-only-for-child-module)
- stackoverflow: [Angular Microfrontend with Module Federation intercept HTTP request in host application](https://stackoverflow.com/questions/72358529/angular-microfrontend-with-module-federation-intercept-http-request-in-host-appl)
- angular/angular/#36974: [Extend http interceptors in child module injector #36974](https://github.com/angular/angular/issues/36974)
