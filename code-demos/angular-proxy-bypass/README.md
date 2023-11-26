# angular-proxy-bypass code demo

## Intro

This code demo uses [webpack's dev-server proxy bypass](https://webpack.js.org/configuration/dev-server/#devserverproxy) feature to return mocked HTTP responses.

The thing to note is that even though the `bypass` function is defined at the level of a proxy entry, [when it's defined, it applies to all requests](https://github.com/webpack/webpack-dev-server/issues/829). I think this is a bug and even though the bug report for this has been closed, I don't think they implemented a fix or have any plans to do so. Furthermore, the webpack/webpack-dev-server#4827 PR seems to indicate that Webpack's dev-server plans to deprecate the bypass function:

> Using the 'bypass' option is deprecated. Please use the 'router' and 'context' options. Read more at https://github.com/chimurai/http-proxy-middleware/tree/v2.0.6#http-proxy-middleware-options"

> [!NOTE]
>
> Even with the comment given about `bypass` possibly becoming deprecated, I couldn't figure out how I could use `router` and `context` to provide similar functionality :shrug:
>

## How to run

1) Go to the `/code-demos/angular-proxy-bypass` folder.
2) Run `npm i` to install all the packages.
3) Run `npm start` to start the app which will be available on http://localhost:4200.

## Implementation details

This solution requires creating a [proxy.conf.js](/code-demos/angular-proxy-bypass/proxy.conf.js) file and using it as [Angular's proxy configuration](https://angular.io/guide/build#proxying-to-a-backend-server) which is defined in the [angular.json](/code-demos/angular-proxy-bypass/angular.json).

Since we can only define a single `bypass` function, we define a catch all proxy route `/*` and then use code to decide which mocked response to return based on the request url.

> [!WARNING]
>
> This solution is dependent on using Webpack as your bundler. See angular/angular-cli#25337.
>

> [!NOTE]
>
> Angular's proxy feature is built on top of [Webpack's dev-server proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) which makes use of the powerful http-proxy-middleware package. Check out its [documentation](https://github.com/chimurai/http-proxy-middleware#options) for more advanced usages.
>
> The `bypass` feature though, is a Webpack dev-server feature, not part of the http-proxy-middleware package.
>
