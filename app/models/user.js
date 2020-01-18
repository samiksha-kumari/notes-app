const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //how to chk the format of the email

    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "invalid email format";
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  tokens: [
    {
      token: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

// pre hooks
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then(function (salt) {
      bcryptjs.hash(user.password, salt).then(function (encryptedPassword) {
        user.password = encryptedPassword;
        next();
      });
    });
  } else {
    next();// it goes to save method
  }
});

//find by token
userSchema.statics.findByToken = function (token) {
  let tokenData;
  console.log(token, 'token')
  try {
    tokenData = jwt.verify(token, "jwt@456");
    console.log("token-data", tokenData)
  } catch (err) {
    console.log("errorintoken", err)
    return Promise.reject(err);
  }
  return User.findOne({
    _id: tokenData._id,
    "tokens.token": token
  });
};

//own static method
userSchema.statics.findByCredentials = function (email, password) {
  const User = this;
  return User.findOne({ email }).then(function (user) {
    if (!user) {
      return Promise.reject("invalid email / password");
    }
    return bcryptjs
      .compare(password, user.password)
      .then(function (result) {
        if (result) {
          return Promise.resolve(user);
        } else {
          return Promise.reject("invalid email /password");
        }
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  });
};

//own instance methods
userSchema.methods.generateToken = function () {
  const user = this;
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date())
  };
  const token = jwt.sign(tokenData, "jwt@456");

  user.tokens.push({ token });
  return user
    .save()
    .then(function (user) {
      return Promise.resolve({ _id: user._id, token: token });
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
};

const User = mongoose.model("User", userSchema);
module.exports = {
  User
};
