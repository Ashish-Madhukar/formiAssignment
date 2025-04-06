const axios = require("axios");
const Property = require("../models/Property");

// Function to get coordinates from location using OpenCage API
const getCoordinates = async (place) => {
  try {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      place
    )}&key=${apiKey}`;

    const { data } = await axios.get(url);

    if (data.results.length === 0) return null;

    const { lat, lng } = data.results[0].geometry;
    return { lat, lon: lng };
  } catch (err) {
    console.error("Geocoding failed:", err.message);
    return null;
  }
};

// Function to find properties within 50km radius
const getNearbyProperties = async (lat, lon) => {
  const EARTH_RADIUS_KM = 6371;
  const allProperties = await Property.find();

  return allProperties.filter((property) => {
    const dLat = ((property.location.lat - lat) * Math.PI) / 180;
    const dLon = ((property.location.lon - lon) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((property.location.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS_KM * c;

    return distance <= 50;
  });
};

module.exports = {
  getCoordinates,
  getNearbyProperties,
};
