const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Benas:benas1@cluster0.kdhflr9.mongodb.net/examDB"
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDb;
