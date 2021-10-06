// siteContent.controller.js - Site content logic module

// const model = require("../models/siteContent.model");
const { makeError } = require("../config/errors");
const { isEmpty } = require("../util/util");

module.exports = {
  read,
  insert,
};

async function read(firebaseAdmin) {
  let data = firebaseAdmin.adminDB
    .ref("master/siteContent")
    .once("value", (snapshot) => {
      return snapshot.val();
    })
    .catch((err) => {
      console.info(err);
    });

  if (isEmpty(data)) {
    throw makeError("Bad Request: The server returned no data.", 400);
  }

  return data;
}

// Set new data for db collection "siteContent"
async function insert(body, firebaseAdmin) {
  firebaseAdmin.adminDB.ref("master/siteContent").set(body, (error) => {
    if (error) {
      console.info(error);
    }
  });
}
