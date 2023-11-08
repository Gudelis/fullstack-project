const express = require("express");
const Client = require("../models/clientModel.js");
const router = express.Router();

router.post("/clients", async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    res.send(newClient);
  } catch (error) {
    console.log(error);
  }
});

router.get("/clients", async (req, res) => {
  try {
    const allClients = await Client.find();
    res.send(allClients);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/clients/:id", async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id });

    if (!client) {
      res.send("User with requested ID was not found");
      return;
    }
    client.deleteOne();
    res.status(200).send("User deleted").end();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
