const mongoose = require("mongoose");

//db configuration - establishing connection to db
//create functn , execute functn , export funtn.
const configureDB = () => {
  mongoose.Promise = global.Promise; // basically , promise to handle our async op,& the promise lib is on provided as ES6 promises.
  // what promise lib that u want to use
  mongoose
    .connect("mongodb://localhost:27017/june-weekday-notes-app", {
      useNewUrlParser: true
    }) //database name
    .then(() => {
      console.log("successfully connected to db");
    })
    .catch(err => {
      console.log("error connecting to db", err);
    });
};

module.exports = configureDB;
