const express = require("express");
const server = express();
const cors = require("cors");
const connectToDb = require("./database");

connectToDb();

server.use(express.json());
server.use(cors());

server.listen(5000, () => {
  console.log("Express server is running: 5000");
});
