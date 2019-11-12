const mongoose = require("mongoose");
//schema for our note - constructor function (blueprint of an object) - helps us define the shape of a document inside a collection.
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  // every note belongs to category
  // inside this, we have to specify the properties of ur object.
  title: {
    // value - obj of type
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category" //[optional] // the model name
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User" //to populate  // note belong to specific user
  }
});
//Note constructor function
const Note = mongoose.model("Note", noteSchema); // if ur model name is 'note' - then collection is 'notes'

module.exports = Note;
