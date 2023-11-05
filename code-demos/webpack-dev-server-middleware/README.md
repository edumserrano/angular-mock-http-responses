# webpack-dev-server-middleware code demo

## Intro

This code demo uses [webpack's dev-server middleware](https://github.com/webpack/webpack-dev-middleware) to return mocked HTTP responses.

## How to run

1) Go to the `/code-demos/webpack-dev-server-middleware` folder.
2) Run `npm i` to install all the packages.
3) Run `npm start` to start the app which will be available on http://localhost:4201.

## Implementation details

This solution requires extending Angular's Webpack configuration. To do the code demo used the [ngx-build-plus](https://www.npmjs.com/package/ngx-build-plus) npm package and created a [webpack.config.js](/code-demos/webpack-dev-server-middleware/webpack.config.js) file where the middleware that returns mocked responses is defined. The `webpack.config.js` is set as an `extraWebpackConfig` to use int the [angular.json](/code-demos/webpack-dev-server-middleware/angular.json) file.

> **Warning**
>
> This solution is dependent on using Webpack as your bundler. Angular 16 brings a preview support for using [vite](https://vitejs.dev/). If you wanted to use vite, this solution would not work.
>

