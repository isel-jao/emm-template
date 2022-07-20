const { readdirSync } = require("fs");

const routes = readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .map((route) => [route.replace(/.js$/, ""), require(`./${route}`)]);
module.exports = routes;
