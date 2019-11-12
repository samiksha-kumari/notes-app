const { User } = require("../models/user");
const _ = require("lodash");
// const { authenticateUser } = require("../middlewares/authentication");

//localhost:30005/users/register
module.exports.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then(user => {
      // res.json(user);
      const { _id, username, email } = user; // object destructuring
      console.log(user);
      res.send({
        // consize property.
        _id,
        username,
        email
      });
    })
    .catch(err => {
      res.send(err);
    });
};

//localhost:3005/users/login

module.exports.login = (req, res) => {
  const body = req.body;
  console.log(body);
  let user;
  User.findByCredentials(body.email, body.password)
    .then(userFound => {
      user = userFound;
      return user.generateToken();
    })
    .then(token => {
      console.log(token, "token");
      // res.setHeader("x-auth", token).send({});
      // res.send(token);
      user = _.pick(user, ["_id", "username", "email", "password"]);
      res.json({
        token,
        user
      });
    })
    .catch(err => {
      res.send(err);
    });
};

//localhost:3005/users/account

module.exports.account = (req, res) => {
  // const { _id, username, email } = req.user;
  // // console.log(user);
  // res.send({
  //   _id,
  //   username,
  //   email
  // });
  res.send(_.pick(req.user, ["_id", "username", "email"]));
};

//pick returns new object
//localhost:3005/users/logout

module.exports.logout = (req, res) => {
  const { user, token } = req;
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(function() {
      res.send({ notice: "successfully logged out" });
    })
    .catch(function(err) {
      res.send(err);
    });
};
