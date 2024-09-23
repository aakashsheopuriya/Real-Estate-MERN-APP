const verifyToken = async (req, res, next) => {
  console.log("req data in verifyToken", req.header);
  next();
};

module.exports = verifyToken;
