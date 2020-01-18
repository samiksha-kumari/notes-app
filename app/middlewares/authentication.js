const { User } = require("../models/user");

const authenticateUser = function (req, res, next) {
  const token = req.header("x-auth");
  User.findByToken(token)
    .then(user => {
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        console.log("hello");
        res.status("401").send({ notice: "token are not available" });
      }
    })
    .catch(err => {
      console.log("bbby");
      res.status("401").send(err);
    });
};

//const authorizeUser = () => {};

module.exports = {
  authenticateUser //user to logged in
  // authorizeUser // privillage to do this
};
