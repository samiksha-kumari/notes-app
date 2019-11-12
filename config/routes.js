const express = require("express");
const router = express.Router();

const notesController = require("../app/controllers/notesController");
const categoriesController = require("../app/controllers/categoriesController");
const usersController = require("../app/controllers/usersController");

const { authenticateUser } = require("../app/middlewares/authentication");
//authenticateUser  chk whether the token provided is correct or not
router.get("/notes", authenticateUser, notesController.list);
router.get("/notes/:id", authenticateUser, notesController.show);
router.post("/notes", authenticateUser, notesController.create);
router.put("/notes/:id", authenticateUser, notesController.update);
router.delete("/notes/:id", authenticateUser, notesController.destroy);

router.get("/categories", categoriesController.list);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.show);
router.delete("/categories/:id", categoriesController.destroy);

router.post("/users/register", usersController.register);
router.post("/users/login", usersController.login);
router.get("/users/account", authenticateUser, usersController.account);
router.delete("/users/logout", authenticateUser, usersController.logout);

module.exports = router;
