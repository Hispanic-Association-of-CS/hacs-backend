// express.js - Express config module

// const path = require("path");
const express = require("express");
const { logger } = require("./logging");
// const cookieParser = require("cookie-parser");
// const compress = require("compression");
// const methodOverride = require("method-override");
const cors = require("cors");
// const helmet = require("helmet");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
const config = require("./config");
// const passport = require("./passport");

const app = express();

// Enable CORS - Cross Origin Resource Sharing
var allowlist = [
  "https://texashacs.org",
  "http://localhost:3000",
  new RegExp(config.corsRegex),
  new RegExp(config.corsDevRegex),
];
var corsOptions = {
  origin: allowlist,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Set logger to dev mode
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(compress());
// app.use(methodOverride());

// Secure apps by setting various HTTP headers
// app.use(helmet());

// app.use(passport.initialize());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
