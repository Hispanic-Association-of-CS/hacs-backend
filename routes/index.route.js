// routes.js - Central module for all routes

const express = require("express");
const asyncHandler = require("express-async-handler");

const siteContentRoutes = require("./siteContent.route");
const calendarRoutes = require("./calendar.route");
const loginRoutes = require("./login.route");
const signoutRoutes = require("./signout.route");
const event = require("../event/event");
const opportunitiesRoutes = require("./opportunities/opportunities.route");
const { prodFirebaseAdmin, devFirebaseAdmin } = require("../config/firebase");
const { corsRegex } = require("../config/config");
const { checkAuth } = require("../auth/auth");
const schemaValidator = require("../schemas/schemaValidator");
const config = require("../config/config");

const router = express.Router();

const validateRequest = schemaValidator(config.env === "dev");

router.use(/\/(.*)/, handleAccessLevel);

const asyncAll = (path, handler) => router.all(path, asyncHandler(handler));
const asyncGet = (path, handler) => router.get(path, asyncHandler(handler));
const asyncPost = (path, handler) =>
  router.post(path, checkAuth, validateRequest, asyncHandler(handler));
const asyncPut = (path, handler) =>
  router.put(path, checkAuth, validateRequest, asyncHandler(handler));
const asyncDelete = (path, handler) =>
  router.delete(path, checkAuth, asyncHandler(handler));

router.use("/siteContent", siteContentRoutes);
router.use("/calendar", calendarRoutes);
router.use("/login", loginRoutes);
router.use("/signout", signoutRoutes);

// events
asyncGet("/events", event.list);
// asyncAll("/event/:id/:op?", event.load);
asyncPost("/event", event.create);
asyncGet("/event/:id", event.get);
asyncPut("/event/:id", event.update);
asyncDelete("/event/:id", event.delete);

router.use("/opportunities", opportunitiesRoutes);

router.get("/health-check", (req, res) => {
  res.send("Health check OK!!!");
});

router.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});

router.get("/", (req, res) => {
  res.send("Welcome to the HACS API!");
});

function handleAccessLevel(req, res, next) {
  let prodAccess =
    req.get("origin") === "https://texashacs.org" ||
    new RegExp(corsRegex).test(req.get("origin"));
  res.locals.firebaseAdmin = prodAccess ? prodFirebaseAdmin : devFirebaseAdmin;
  next();
}

module.exports = router;
