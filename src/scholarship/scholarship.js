const config = require("../config/config");
const { CODES } = require("../util/const");
const scholarshipCtrl = require("./scholarship.controller");

const list = async (req, res, next) =>
  scholarshipCtrl
    .getAll(req.path, res.locals.firebaseAdmin)
    .then((scholarships) => {
      console.info("Retrieved all scholarships...");
      res.json(scholarships);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error retrieving scholarships from database. Please try again later."
        );
      }
      next(e);
    });

const get = async (req, res, next) =>
  scholarshipCtrl
    .get(req.path, req.params.id, res.locals.firebaseAdmin)
    .then((sholarship) => {
      console.info("Retrieved scholarship...");
      res.json(sholarship);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error retrieving scolarship from database. Please try again later."
        );
      }
      next(e);
    });

const create = async (req, res, next) =>
  scholarshipCtrl
    .create(req.path, req.body, res.locals.firebaseAdmin)
    .then((scholarship) => {
      console.info("Created scholarship...");
      res.json(scholarship);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error creating scholarship in database. Please try again later."
        );
      }
      next(e);
    });

const update = async (req, res, next) =>
  scholarshipCtrl
    .update(req.path, req.params.id, req.body, res.locals.firebaseAdmin)
    .then((scholarship) => {
      console.info("Updated scholarship...");
      res.json(scholarship);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error updating scholarship in database. Please try again later."
        );
      }
      next(e);
    });

const del = async (req, res, next) =>
  scholarshipCtrl
    .delete(req.path, req.params.id, res.locals.firebaseAdmin)
    .then(() => {
      console.info("Deleted scholarship...");
      res.sendStatus(CODES.SUCCESS.OK);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error deleting scholarship from database. Please try again later."
        );
      }
      next(e);
    });

const load = async (req, res, next) => {
  // TODO: Implement loading if necessary
};

module.exports = { list, get, create, update, delete: del, load };
