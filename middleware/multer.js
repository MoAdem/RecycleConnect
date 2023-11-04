const express = require("express");
const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + '-' + fileName); // Use a unique filename
  },
});
// Initialize multer
const upload = multer({ storage: storage });

module.exports = upload;
