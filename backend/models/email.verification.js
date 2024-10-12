const mongoose = require("mongoose");
const emailVerificationSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  
  Otp: {
    type: String,
  }
});

const EmailVerification = new mongoose.model("EmailVerification", emailVerificationSchema);

module.exports = EmailVerification;
