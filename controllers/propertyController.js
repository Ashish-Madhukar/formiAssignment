// const Property = require("../models/Property");
// const correctSpelling = require("../utils/correctSpelling");
// const getCoordinates = require("../utils/geocode");
// const haversineDistance = require("../utils/distance");

// const searchProperty = async (req, res) => {
//   try {
//     const query = req.query.q;
//     if (!query) return res.status(400).json({ message: "Query required" });

//     const correctedQuery = correctSpelling(query);
//     const coordinates = await getCoordinates(correctedQuery);

//     if (!coordinates)
//       return res.status(404).json({ message: "Location not found" });

//     const allProperties = await Property.find();

//     const nearby = allProperties
//       .map((p) => {
//         const dist = haversineDistance(coordinates, p.location);
//         return dist <= 50 ? { name: p.name, distance: dist.toFixed(2) } : null;
//       })
//       .filter(Boolean);

//     if (nearby.length === 0) {
//       return res
//         .status(200)
//         .json({ message: "No properties within 50km radius" });
//     }

//     return res.json({ location: correctedQuery, nearby });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { searchProperty };

// const { getCoordinates, getNearbyProperties } = require("../utils/geocode");

// const searchProperty = async (req, res) => {
//   const { query } = req.query;

//   if (!query) {
//     return res.status(400).json({ message: "Query is required" });
//   }

//   const coords = await getCoordinates(query);
//   if (!coords) {
//     return res.status(404).json({ message: "Location not found" });
//   }

//   const nearby = await getNearbyProperties(coords.lat, coords.lon);

//   if (nearby.length === 0) {
//     return res.status(200).json({ message: "No properties within 50KM" });
//   }

//   return res.status(200).json({ nearby });
// };

// module.exports = { searchProperty };

const axios = require("axios");
const Property = require("../models/Property");

// Helper: Haversine Formula to calculate distance in KM
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 🔍 Search nearest properties within 50km of a given query
const searchProperty = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res
      .status(400)
      .json({ message: "Please provide a location query." });
  }

  try {
    // Get coordinates from OpenCage
    const geoRes = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: query,
          key: process.env.OPENCAGE_API_KEY,
        },
      }
    );

    const results = geoRes.data.results;
    if (results.length === 0) {
      return res.status(404).json({ message: "Location not found." });
    }

    const { lat, lng } = results[0].geometry;

    // Fetch all properties from DB
    const properties = await Property.find();

    // Calculate distances
    const nearbyProperties = properties
      .map((prop) => {
        const distance = getDistanceFromLatLonInKm(
          lat,
          lng,
          prop.location.lat,
          prop.location.lon
        );
        return {
          name: prop.name,
          distance: distance.toFixed(2),
        };
      })
      .filter((prop) => prop.distance <= 50);

    if (nearbyProperties.length === 0) {
      return res
        .status(200)
        .json({ message: "No properties found within 50km." });
    }

    res.status(200).json({ nearbyProperties });
  } catch (error) {
    console.error("Error in searchProperty:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📥 Get all properties (for debugging or listing)
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  searchProperty,
  getAllProperties,
};
