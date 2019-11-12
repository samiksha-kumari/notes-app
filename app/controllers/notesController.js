const Note = require("../models/note");

//list
module.exports.list = (req, res) => {
  Note.find({ userId: req.user._id }) //find all the notes whose user id is this.
    .populate("categoryId")
    .then(notes => {
      //static method - array.isArray
      res.json(notes);
    })
    .catch(err => {
      res.json(err);
    });
};

//create
module.exports.create = (req, res) => {
  const body = req.body;
  //strong parameters - extract the value
  //const {title, description, categoryId}= req.user
  //const body = {title, description, categoryId}
  const note = new Note(body); //{ title: body.title, description: body.description });
  note.userId = req.user._id; // authenticateUser object available
  note
    .save() // return promise obj which return callback funtcn  // instance method -
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.json(err);
    });
};

// findById chk 2 condition-it chk the id and weather it belong to specific user
//show   //route handler
module.exports.show = (req, res) => {
  const id = req.params.id; //read the id
  Note.findOne({ userId: req.user._id, _id: id }) // pass as object is equality chk  and ',' = 'and'// findOne
    .populate("categoryId", ["name"])
    .populate("notesId")

    .then(note => {
      // retrun promise object ,
      if (note) {
        // check to see if the note is present in db
        res.json(note); // send note  //note will be either object or null
      } else {
        res.json({}); // send empty obj
      }
      //   res.json(note); //empty obj is the way to represent that record is not founds
    })
    .catch(err => {
      res.json(err);
    });
};

//destroy
module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Note.findOneAndDelete({ userId: req.user._id, _id: id }) // owner of the id
    .then(note => {
      if (note) {
        res.json(note);
      } else {
        res.json({});
      }
    })
    .catch(err => {
      res.json(err);
    });
};

//Update
module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Note.findOneAndUpdate({ userId: req.user._id, _id: id }, body, {
    new: true, // _id :- field of the id into the database
    runValidators: true
  }) // it send updated record, otherwise getting the older record
    // when u try to validate the record
    .then(note => {
      if (note) {
        res.json(note);
      } else {
        res.json({});
      }
    })
    .catch(err => {
      res.json(err);
    });
};
