const express = require("express");
const Client = require("../models/clientModel.js");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    res.send(newClient);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allClients = await Client.find();
    res.send(allClients);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
