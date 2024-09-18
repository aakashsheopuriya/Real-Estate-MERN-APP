const mongoose = require("mongoose");
const requestPropertySchema = new mongoose.Schema({
  propertyId: {
    type: String,
  },
  buyerId: {
    type: String,
  },
  sellerId: {
    type: String,
  },
  status: {
    type: String,
  },
});

const RequestProperty = new mongoose.model(
  "RequestProperty",
  requestPropertySchema
);

module.exports = RequestProperty;
