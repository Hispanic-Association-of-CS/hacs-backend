const config = require("../config/config");
const { CODES } = require("../util/const");
const eventCtrl = require("./event.controller");

const list = async (req, res, next) =>
  eventCtrl
    .getAll(req.path, res.locals.firebaseAdmin)
    .then((events) => {
      console.info("Retrieved all events...");
      res.json(events);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error retrieving events from database. Please try again later."
        );
      }
      next(e);
    });

const get = async (req, res, next) =>
  eventCtrl
    .get(req.path, req.params.id, res.locals.firebaseAdmin)
    .then((event) => {
      console.info("Retrieved event...");
      res.json(event);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error retrieving event from database. Please try again later."
        );
      }
      next(e);
    });

const create = async (req, res, next) =>
  eventCtrl
    .create(req.path, req.body, res.locals.firebaseAdmin)
    .then((event) => {
      console.info("Created event...");
      res.json(event);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error creating event in database. Please try again later."
        );
      }
      next(e);
    });

const update = async (req, res, next) =>
  eventCtrl
    .update(req.path, req.params.id, req.body, res.locals.firebaseAdmin)
    .then((event) => {
      console.info("Updated event...");
      res.json(event);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error updating event in database. Please try again later."
        );
      }
      next(e);
    });

const del = async (req, res, next) =>
  eventCtrl
    .delete(req.path, req.params.id, res.locals.firebaseAdmin)
    .then(() => {
      console.info("Deleted event...");
      res.sendStatus(CODES.SUCCESS.OK);
    })
    .catch((e) => {
      if (config.env === "prod") {
        e = new Error(
          "Error deleting event from database. Please try again later."
        );
      }
      next(e);
    });

const load = async (req, res, next) => {
  // TODO: Implement loading if necessary
};

module.exports = { list, get, create, update, delete: del, load };
