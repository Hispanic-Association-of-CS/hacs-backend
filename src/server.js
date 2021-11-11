// server.js - Server for Texas HACS

const app = require("./app");
let { port } = require("./config/config");

// Babel required imports DO NOT REMOVE
// require("core-js");
// require("regenerator-runtime/runtime");
// ------------------------------------

// Retrieve and set port
port = normalizePort(process.env.PORT || port);
app.set("port", port);

// Begin listening on port, confirm startup or log error
app
  .listen(port, () => {
    console.info(
      `Starting our virtual familia home at http://localhost:${port} (${process.env.NODE_ENV})\n\n-----\n`
    );
  })
  .on("error", console.log);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
