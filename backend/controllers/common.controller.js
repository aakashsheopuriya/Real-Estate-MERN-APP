const message = require("../constant/message");
const Property = require("../models/property.model");
const {ObjectId} = require("mongodb");
const getPropertyById = async (req, res) => {
  const { id } = req.params;

  const isPropertyFindById = await Property.findOne({ _id: new ObjectId(id) });

  console.log("isPropertyFindById", isPropertyFindById);
  res.send({
    message: "fetch specific property successfully",
    status: true,
    property: isPropertyFindById,
  });
};

module.exports = { getPropertyById };
