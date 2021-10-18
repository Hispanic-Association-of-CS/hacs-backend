// auth.js - Authentication logic module

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
        res.status(403).send(err);
      });
  } else {
    res.status(403).send("No auth found!");
  }
}
