const bikes = require("./mock-api-responses/bikes.json");
const cars = require("./mock-api-responses/cars.json");

module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      // see middleware configuration examples at
      // https://github.com/webpack/webpack-dev-server/issues/4129
      devServer.app.get("/api/cars", (request, response) => {
        response.json(cars);
      });
      devServer.app.get("/api/bikes", (request, response) => {
        response.json(bikes);
      });

      return middlewares;
    },
  },
};
