// events.route.js - Events route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const eventsCtrl = require("../..//controllers/opportunities/opportunities.controller");
const config = require("../../config/config");
const { CODES, RES } = require("../../util/const");
const SchemaValidator = require("../../schemas/schemaValidator");
const { checkAuth } = require("../../auth/auth");
const validateRequest = SchemaValidator(config.env === "dev");

const router = express.Router();
module.exports = router;

router.use("/", asyncHandler(getEventsData));
router.post(
  "/",
  validateRequest,
  checkAuth,
  asyncHandler(insertEventsData)
);

async function getEventsData(req, res, next) {
  try {
    let eventsData = await eventsCtrl.read(
      req.path,
      res.locals.firebaseAdmin
    );
    console.info("Retrieved events data...\n");
    res.json(eventsData);
  } catch (e) {
    if (config.env !== "dev") {
      e.message =
        "Error retrieving events from database. Please try again.";
    }
    next(e);
  }
}

async function insertEventsData(req, res, next) {
  try {
    await eventsCtrl.insert(
      req.route.path,
      req.body,
      res.locals.firebaseAdmin
    );
    res.sendStatus(CODES.SUCCESS.OK);
  } catch (e) {
    if (config.env !== "dev") {
      e.message =
        "Error inserting events into database. Please try again.";
    }
    next(e);
  }
}