const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "realestste", // Folder name in Cloudinary
    public_id: (req, file) => req.params.id + "-" + file.originalname, // Set file name in Cloudinary
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;
