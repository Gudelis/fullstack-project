const express = require("express");
const server = express();
const connectToDb = require("./config/database");
const cors = require("cors");
const adminController = require("./controllers/adminController.js");
const clientController = require("./controllers/clientController.js");

connectToDb();

server.use(express.json());
server.use(cors());

server.use("/", adminController);
server.use("/", clientController);

server.listen(5000, () => {
  console.log("Express server is running: 5000");
});
