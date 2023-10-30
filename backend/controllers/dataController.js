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

module.exports = router;
