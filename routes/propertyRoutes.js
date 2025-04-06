// const express = require("express");
// const { searchProperty } = require("../controllers/propertyController");

// const router = express.Router();

// router.get("/search", searchProperty);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { searchProperty } = require("../controllers/propertyController");

router.get("/search", searchProperty);

module.exports = router;
