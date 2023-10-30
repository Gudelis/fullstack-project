const express = require("express");
const server = express();
const connectToDb = require("./config/database");
const cors = require("cors");
const dataController = require("./controllers/dataController.js");

connectToDb();

server.use(express.json());
server.use(cors());

server.use("/", dataController);

server.listen(5000, () => {
  console.log("Express server is running: 5000");
});
