const express = require("express");
const configureDB = require("./config/database");
const router = require("./config/routes");
const cors = require("cors");

const app = express();
const port = 3005;

configureDB();

app.use(express.json());
app.use(cors());
// one route set up
app.get("/", (req, res) => {
  res.send("welcome to the notes app");
});

app.use("/", router);

app.listen(port, () => {
  // takes callback function
  console.log("listening on port app", port);
});
