const express = require("express");
const Admin = require("../models/adminModel.js");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    res.send(newAdmin);
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

    if (adminLogin) {
      res.send(adminLogin);
    } else {
      res.status(400);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
