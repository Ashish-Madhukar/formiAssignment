const express = require("express");
const router = express.Router();
const {
  searchProperty,
  addProperty,
} = require("../controllers/propertyController");

// Route to search for properties near a given location
router.get("/search", searchProperty);

// Route to add a new property
router.post("/add", addProperty);

module.exports = router;
