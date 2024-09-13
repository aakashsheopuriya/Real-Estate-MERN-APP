const Property = require("../models/property.model");
const { ObjectId } = require("mongodb");

const createProperty = async (req, res) => {
  const { title, contact, description, address, price, services } = req.body;
  const insertProperty = new Property({
    title,
    propertyDetails: description,
    address,
    price,
    contactNumber: contact,
    services,
    status: "Active", //1=Active,0=InActive
    sellerId: req.params.id,
  });
  const isInserted = await insertProperty.save();
  if (isInserted) {
    res.send({
      message: "Property Created Successfully",
      status: true,
      property: isInserted,
    });
  } else {
    res.send({ message: "something went wrong !", status: false });
  }
};

const propertyImageUpload = async (req, res) => {
  const propertyUpdate = await Property.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { image: req.params.id + "-" + req.file.originalname } }
  );
  if (propertyUpdate) {
    res.send({
      message: "image uploaded successfully",
      status: 1,
      image: req.params.email + "-" + req.file.originalname,
    });
  } else {
    res.send({ message: "image uploaded failed", status: 0 });
  }
};

const propertyUpdate = async (req, res) => {
  const { title, description, contact, address, price, services } = req.body;

  const propertyUpdate = await Property.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        title: title,
        contactNumber: contact,
        propertyDetails: description,
        price: price,
        services,
        address,
      },
    }
  );
  if (propertyUpdate) {
    res.send({
      message: "Propert details updated successfully",
      status: true,
    });
  } else {
    res.send({ message: "image uploaded failed", status: false });
  }
};

const getPropertyById = async (req, res) => {
  const userId = req.params.id;
  const isPropertyFind = await Property.find({ sellerId: userId });
  res.send({
    message: "fetched specific property successfully",
    status: true,
    property: isPropertyFind,
  });
};

const propertyDelete = async (req, res) => {
  const id = req.params.id;
  const isPropertyFind = await Property.find({ _id: new ObjectId(id) });
  const propertyDelete = await Property.deleteOne({ _id: new ObjectId(id) });
  res.send({
    message: "delete property successfully",
    status: true,
  });
};

module.exports = {
  createProperty,
  propertyImageUpload,
  propertyUpdate,
  getPropertyById,
  propertyDelete,
};
