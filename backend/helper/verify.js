const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "realState", function (err, payload) {
      if (err) {
        return res.send({ message: "token not validate", status: false });
      } else {
        if (payload.username == req.params.id) {
          next();
        } else {
          return res.send({
            message: "user name is not authorised",
            status: false,
          });
        }
      }
    });
  } else {
    return res.send({
      message: "no token provided please login first",
      status: false,
    });
  }
};

module.exports = verifyToken;
