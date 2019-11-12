const Category = require("../models/category");
//list

module.exports.list = (req, res) => {
  Category.find()
    .then(categories => {
      res.json(categories);
    })
    .catch(err => {
      res.json(err);
    });
};
//POST /categories -> name
//create
module.exports.create = (req, res) => {
  const body = req.body;
  const category = new Category(body);
  category
    .save()
    .then(category => {
      res.json(category);
    })
    .catch(err => {
      res.json(err);
    });
};

//show
module.exports.show = (req, res) => {
  const id = req.params.id; //read the id
  Category.findById(id)
    .then(category => {
      if (category) {
        res.json(category);
      } else {
        res.json({});
      }
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then(category => {
      if (category) {
        res.json(category);
      }
    })
    .catch(err => {
      res.json(err);
    });
};
