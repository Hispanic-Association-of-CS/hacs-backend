// scholarship.controller.js - Scholarship logic module
const { uid } = require("../util/uid");

// const model = require("../models/opportunities.model");
const { makeError } = require("../config/errors");
const { isEmpty } = require("../util/util");

exports.getAll = async (path, firebaseAdmin) =>
  firebaseAdmin.adminDB
    .ref(`scholarships`)
    .once("value")
    .then((snapshot) => extractSnapshotData(snapshot));

exports.get = async (path, id, firebaseAdmin) =>
  firebaseAdmin.adminDB
    .ref(`scholarships/${id}`)
    .once("value")
    .then((snapshot) => extractSnapshotData(snapshot));

exports.create = async (path, body, firebaseAdmin) => {
  const id = "scholarship_" + uid().split("-").join("");
  body = { ...body, uid: id };
  return firebaseAdmin.adminDB
    .ref(`scholarships/${id}`)
    .set(body)
    .then(() => body);
};

exports.update = async (path, id, body, firebaseAdmin) =>
  firebaseAdmin.adminDB
    .ref(`scholarships/${id}`)
    .set(body)
    .then(() => body);

exports.delete = async (path, id, firebaseAdmin) =>
  firebaseAdmin.adminDB.ref(`scholarships/${id}`).remove();

const extractSnapshotData = (snapshot) => {
  data = snapshot.val();
  if (isEmpty(data)) {
    throw makeError("Bad Request: The server returned no data.", 400);
  }
  return data;
};
