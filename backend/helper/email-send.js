const nodemailer = require("nodemailer");
const emailSend = async (user, otp, type) => {
  try {
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com", //gmail hostname
      port: 465,
      auth: {
        user: process.env.SMTP_USER, //user email address
        pass: process.env.SMTP_PASS, //app password
      },
    });
    const info = await transport.sendMail({
      from: process.env.SMTP_USER, // sender address
      to: user, // list of receivers
      subject:
        type == "reset" ? "Request For Reset Password ✔" : "Welcome Message", // Subject line
      text: "Hello all , student this is mern stack class by durgesh?", // plain text body
      html:
        type == "reset"
          ? `<b>Hello user "${user}", your otp for password reset is ${otp}.if not done by you report here support@gmail.com</b>`
          : `<b>Hello welcome user</b>`, // html body
    });
    return info;
  } catch (error) {
    console.log("server error", error.message);
  }
};

module.exports = emailSend;
