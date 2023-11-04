const bikes = require("./mock-api-responses/bikes.json");
const cars = require("./mock-api-responses/cars.json");

const PROXY_CONFIG = [
  {
    context: ["/*"],
    bypass(req, resp) {
      resp.header("Content-Type", "application/json");
      if (req.url === "/api/cars") {
        resp.end(JSON.stringify(cars));
      } else if (req.url === "/api/bikes") {
        resp.end(JSON.stringify(bikes));
      } else {
        throw Error(`no mock defined for ${req.url}`);
      }
    },
  },
];
module.exports = PROXY_CONFIG;
