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
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  title: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
});

const RequestProperty = new mongoose.model(
  "RequestProperty",
  requestPropertySchema
);

module.exports = RequestProperty;
