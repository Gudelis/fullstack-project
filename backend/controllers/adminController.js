const express = require("express");
const Admin = require("../models/adminModel.js");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const checkIfEmailIsTaken = await Admin.findOne({ email: req.body.email });

    if (checkIfEmailIsTaken) {
      return res.status(400).send({ error: "Email already taken" });
    } else {
      const newAdmin = await Admin.create(req.body);
      res.send(newAdmin);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const adminLogin = await Admin.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!adminLogin) {
      return res.status(401).send({ error: "Unauthorized login" });
    }
    res.status(200).send(adminLogin);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
