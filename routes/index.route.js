// routes.js - Central module for all routes

const express = require("express");
const { makeError, error404, handleRouteErrors } = require("../config/errors");
const { CODES, RES } = require("../util/const");

const siteContentRoutes = require("./siteContent.route");
const calendarRoutes = require("./calendar.route");
const loginRoutes = require("./login.route");
const signoutRoutes = require("./signout.route");
const opportunitiesRoutes = require("./opportunities.route");
const { prodFirebaseAdmin, devFirebaseAdmin } = require("../config/firebase");
const { corsRegex } = require("../config/config");

const router = express.Router();

router.use(/^\/(.*)/, handleAccessLevel);
router.use("/siteContent", siteContentRoutes);
router.use("/calendar", calendarRoutes);
router.use("/login", loginRoutes);
router.use("/signout", signoutRoutes);
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
