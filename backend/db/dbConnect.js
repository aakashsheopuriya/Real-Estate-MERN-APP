require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DATABASE_URL;
const dbConnect = async () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("database not connected", err.message);
    });
};

module.exports = dbConnect;
