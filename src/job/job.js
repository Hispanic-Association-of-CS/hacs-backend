const config = require("../config/config");
const { CODES } = require("../util/const");
const jobCtrl = require("./job.controller");

const list = async (req, res, next) =>
  jobCtrl
    .getAll(req.path, res.locals.firebaseAdmin)
    .then((jobs) => {
      console.info("Retrieved all job listings...");
      res.json(jobs);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error retrieving job listings from database. Please try again later."
        );
      }
      next(e);
    });

const get = async (req, res, next) =>
  jobCtrl
    .get(req.path, req.params.id, res.locals.firebaseAdmin)
    .then((job) => {
      console.info("Retrieved job listing...");
      res.json(job);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error retrieving job listing from database. Please try again later."
        );
      }
      next(e);
    });

const create = async (req, res, next) =>
  jobCtrl
    .create(req.path, req.body, res.locals.firebaseAdmin)
    .then((job) => {
      console.info("Created job listing...");
      res.json(job);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error creating job listing in database. Please try again later."
        );
      }
      next(e);
    });

const update = async (req, res, next) =>
  jobCtrl
    .update(req.path, req.params.id, req.body, res.locals.firebaseAdmin)
    .then((job) => {
      console.info("Updated job listing...");
      res.json(job);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error updating job listing in database. Please try again later."
        );
      }
      next(e);
    });

const del = async (req, res, next) =>
  jobCtrl
    .delete(req.path, req.params.id, res.locals.firebaseAdmin)
    .then(() => {
      console.info("Deleted job listing...");
      res.sendStatus(CODES.SUCCESS.OK);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error deleting job listing from database. Please try again later."
        );
      }
      next(e);
    });

const load = async (req, res, next) => {
  // TODO: Implement loading if necessary
};

module.exports = { list, get, create, update, delete: del, load };
