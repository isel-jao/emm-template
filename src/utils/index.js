const { readdirSync } = require("fs");
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Object.prototype.deepCopy = function () {
  return JSON.parse(JSON.stringify(this));
};

const configs = readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .map((config) => [config.replace(/.js$/, ""), require(`./${config}`)]);
module.exports = Object.fromEntries(configs);
