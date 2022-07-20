const { createLogger, transports, format } = require("winston");
const dotenv = require("dotenv");
dotenv.config();

const level = process.env.LOG_LEVEL || "info";
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf((item) => {
      //padEnd for add space
      return `${item.timestamp} ${item.level.toUpperCase().padEnd(7)}:${
        item.message
      }`;
    })
  ),
  level,
  transports: [
    new transports.Console({ level: "silly" }),
    new transports.File({ filename: "debug/app.log", level: "debug" }),
    new transports.File({ filename: "debug/info.log", level: "info" }),
    new transports.File({ filename: "debug/error.log", level: "error" }),
  ],
});
module.exports = logger;
