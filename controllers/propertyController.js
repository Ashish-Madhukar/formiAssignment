const Property = require("../models/Property");
const { getCoordinates, getNearbyProperties } = require("../utils/geocode");

// GET /search?q=CityName
const searchProperty = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Query param 'q' is required." });
    }

    const coords = await getCoordinates(q);
    if (!coords) {
      return res.status(404).json({ message: "Location not found." });
    }

    const nearbyProperties = await getNearbyProperties(coords.lat, coords.lon);

    if (nearbyProperties.length === 0) {
      return res.json({ message: "No properties found within 50km." });
    }

    res.json({ results: nearbyProperties });
  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

// POST /add
const addProperty = async (req, res) => {
  try {
    const { name, lat, lon } = req.body;

    if (!name || lat === undefined || lon === undefined) {
      return res
        .status(400)
        .json({ message: "Name, lat, and lon are required." });
    }

    const property = new Property({
      name,
      location: { lat, lon },
    });

    await property.save();
    res.status(201).json({ message: "Property added successfully", property });
  } catch (err) {
    console.error("Add Property Error:", err.message);
    res.status(500).json({ error: "Failed to add property." });
  }
};

module.exports = {
  searchProperty,
  addProperty,
};
