// opportunities.route.js - Opportunities route module

const express = require("express");
const asyncHandler = require("express-async-handler");
const opportunitiesCtrl = require("../../controllers/opportunities/opportunities.controller");
const config = require("../../config/config");
const { CODES } = require("../../util/const");
const SchemaValidator = require("../../schemas/schemaValidator");
const { checkAuth } = require("../../auth/auth");

const router = express.Router();
module.exports = router;

const validateRequest = SchemaValidator(config.env === "dev");

router.get("/", asyncHandler(getOpportunitiesData));
router.post(
  "/",
  validateRequest,
  checkAuth,
  asyncHandler(insertOpportunitiesData)
);

async function getOpportunitiesData(req, res, next) {
  try {
    let opportunitiesData = await opportunitiesCtrl.read(
      req.route.path,
      res.locals.firebaseAdmin
    );
    console.info("Retrieved opportunities data...\n");
    res.json(opportunitiesData);
  } catch (e) {
    if (config.env !== "dev") {
      e.message =
        "Error retrieving opportunities from database. Please try again.";
    }
    next(e);
  }
}

async function insertOpportunitiesData(req, res, next) {
  try {
    await opportunitiesCtrl.insert(
      req.route.path,
      req.body,
      res.locals.firebaseAdmin
    );
    res.sendStatus(CODES.SUCCESS.OK);
  } catch (e) {
    if (config.env !== "dev") {
      e.message =
        "Error inserting opportunities into database. Please try again.";
    }
    next(e);
  }
}
