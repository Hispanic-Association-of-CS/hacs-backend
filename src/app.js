// app.js - Central logic for the HACS Node Application

// Import config before any other module
const config = require("./config/config");
const app = require("./config/express");
const axios = require("axios");
const { setIntervalAsync } = require("set-interval-async/fixed");
const routes = require("./routes/index.route");
const { error404, handleRouteErrors } = require("./config/errors");

// API Router
app.use(config.devApiUrl, routes);
app.use(config.apiUrl, routes);

// Base backend route response
app.get(config.backendUrl, (req, res) => {
  res.send("Welcome to the HACS backend!");
});

// Catch 404 and create error
app.use(error404);

// Error handler, send stacktrace only during development
app.use(handleRouteErrors);

// Make a request to our own server every 5 minutes to prevent heroku from putting the app to sleep
setIntervalAsync(() => {
  axios
    .get("https://hacs-server.herokuapp.com/")
    .then(console.info("Successfully pinged server to keep it awake...\n"))
    .catch((e) => {
      console.log(e);
    });
}, 600000);

module.exports = app;
