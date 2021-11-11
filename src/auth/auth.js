// auth.js - Authentication logic module

const config = require("../config/config");

module.exports = { checkAuth };

function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    res.locals.firebaseAdmin.firebaseAdmin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then(() => {
        next();
      })
      .catch((err) => {
        if (config.env !== "prod") {
          console.error(err);
        }
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("No auth found!");
  }
}
