// job.controller.js - job listing logic module
const { uid } = require("../util/uid");

// const model = require("../models/opportunities.model");
const { makeError } = require("../config/errors");
const { isEmpty } = require("../util/util");

exports.getAll = async (path, firebaseAdmin) =>
  firebaseAdmin.adminDB
    .ref(`jobs`)
    .once("value")
    .then((snapshot) => extractSnapshotData(snapshot));

exports.get = async (path, id, firebaseAdmin) =>
  firebaseAdmin.adminDB
    .ref(`jobs/${id}`)
    .once("value")
    .then((snapshot) => extractSnapshotData(snapshot));

exports.create = async (path, body, firebaseAdmin) => {
  const id = "job_" + uid().split("-").join("");
  body = { ...body, uid: id };
  return firebaseAdmin.adminDB
    .ref(`jobs/${id}`)
    .set(body)
    .then(() => body);
};

exports.update = async (path, id, body, firebaseAdmin) =>
  firebaseAdmin.adminDB
    .ref(`jobs/${id}`)
    .set(body)
    .then(() => body);

exports.delete = async (path, id, firebaseAdmin) =>
  firebaseAdmin.adminDB.ref(`jobs/${id}`).remove();

const extractSnapshotData = (snapshot) => {
  const data = snapshot.val();
  if (isEmpty(data)) {
    throw makeError("Bad Request: The server returned no data.", 400);
  }
  return data;
};
