const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Client = mongoose.model("client", clientSchema);
module.exports = Client;
