// firebase.js - Firebase config module

const config = require("./config");
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

firebaseConfig = config.firebase;
devFirebaseConfig = config.firebaseDev;

// admin config
const firebaseAdmin = require("firebase-admin");

adminConfig = {
  credential: firebaseAdmin.credential.cert(firebaseConfig.credential),
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket,
};

devAdminConfig = {
  credential: firebaseAdmin.credential.cert(devFirebaseConfig.credential),
  databaseURL: devFirebaseConfig.databaseURL,
  storageBucket: devFirebaseConfig.storageBucket,
};

const prodFirebaseAdmin = firebaseAdmin.initializeApp(adminConfig);
const adminDB = prodFirebaseAdmin.database();
const adminStorage = prodFirebaseAdmin.storage();

const devFirebaseAdmin = firebaseAdmin.initializeApp(devAdminConfig, "dev");
const devAdminDB = devFirebaseAdmin.database();
const devAdminStorage = devFirebaseAdmin.storage();

// regular config
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

console.info("Firebase app initialized...\n");

// workaround wrapper for all firebase auth() calls
const firebaseAuthWrap = async (promise) => {
  let rejected = Symbol();
  let valueOrError = await promise.catch((error) => {
    return { [rejected]: true, error: error };
  });

  if (valueOrError[rejected]) {
    throw valueOrError.error;
  } else {
    return valueOrError;
  }
};

module.exports = {
  db,
  firebase,
  firebaseAuthWrap,
  prodFirebaseAdmin: {
    firebaseAdmin,
    adminDB,
    adminStorage,
  },
  devFirebaseAdmin: {
    firebaseAdmin: devFirebaseAdmin,
    adminDB: devAdminDB,
    adminStorage: devAdminStorage,
  },
};
