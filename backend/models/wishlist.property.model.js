const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  propertyId: {
    type: String,
  },
  buyerId: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Wishlist = new mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
