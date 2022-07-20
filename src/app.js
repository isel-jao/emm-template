const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { logger } = require("./utils");
const routes = require("./routes");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API",
      version: "1.0.0",
      description: "Node.js API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },
  apis: ["src/docs/*.js"],
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
console.clear();
app.use(bodyParser.json());
app.use("*", (req, res, next) => {
  const method = req.method;
  const url = req.url;
  let query = "";
  let body = "";
  try {
    query =
      Object.keys(req.query).length > 0
        ? `\nquery: ${JSON.stringify(req.query)}`
        : "";
    body =
      Object.keys(req.body).length > 0
        ? `\nbody: ${JSON.stringify(req.body)}`
        : "";
  } catch (err) {}
  logger.info(`${req.method}\t${req.originalUrl}${query}${body}`);
  next();
});
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
logger.debug(`connecting to ${uri}`);
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    logger.debug("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err);
  });

routes.forEach(([path, route]) => {
  app.use(`/${path}`, route);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {});
