// event.controller.js - Event logic module
const { uid } = require("../util/uid");

// const model = require("../models/opportunities.model");
const { makeError } = require("../config/errors");
const { isEmpty } = require("../util/util");
const GCal = require("../integrations/googleapi.calendar");

exports.getAll = async (path, firebaseAdmin) =>
  firebaseAdmin.adminDB
    .ref(`events`)
    .once("value")
    .then((snapshot) => extractSnapshotData(snapshot));

exports.get = async (path, id, firebaseAdmin) =>
  firebaseAdmin.adminDB
    .ref(`events/${id}`)
    .once("value")
    .then((snapshot) => extractSnapshotData(snapshot));

exports.create = async (path, event, firebaseAdmin) => {
  const id = "event_" + uid().split("-").join("");
  event = { ...event, uid: id };
  return GCal.safeUpdateEvent(event, firebaseAdmin).then(() =>
    firebaseAdmin.adminDB
      .ref(`events/${id}`)
      .set(event)
      .then(() => event)
  );
};

exports.update = async (path, id, event, firebaseAdmin) =>
  GCal.safeUpdateEvent(event, firebaseAdmin).then(() =>
    firebaseAdmin.adminDB
      .ref(`events/${id}`)
      .set(event)
      .then(() => event)
  );

exports.delete = async (path, id, firebaseAdmin) =>
  GCal.safeUpdateEvent({ uid: id }, firebaseAdmin).then(() =>
    firebaseAdmin.adminDB.ref(`events/${id}`).remove()
  );

const extractSnapshotData = (snapshot) => {
  data = snapshot.val();
  if (isEmpty(data)) {
    throw makeError("Bad Request: The server returned no data.", 400);
  }
  return data;
};
