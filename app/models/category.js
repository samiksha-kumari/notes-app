const mongoose = require("mongoose");
//create categorySchema - with fields like name of type string and requires is true
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String
  }
});

//create a model called as Category
const Category = mongoose.model("Category", categorySchema);
//if the user goes to GET /categories

module.exports = Category;
