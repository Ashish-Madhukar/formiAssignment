// Make sure dotenv is loaded first
require("dotenv").config();

const mongoose = require("mongoose");
const Property = require("../models/Property");

// Ensure MONGO_URI is loaded
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing in .env");
  process.exit(1);
}

// List of properties
const properties = [
  { name: "Moustache Udaipur Luxuria", lat: 24.57799888, lon: 73.68263271 },
  { name: "Moustache Udaipur", lat: 24.58145726, lon: 73.68223671 },
  { name: "Moustache Udaipur Verandah", lat: 24.58350565, lon: 73.68120777 },
  { name: "Moustache Jaipur", lat: 27.29124839, lon: 75.89630143 },
  { name: "Moustache Jaisalmer", lat: 27.20578572, lon: 70.85906998 },
  { name: "Moustache Jodhpur", lat: 26.30365556, lon: 73.03570908 },
  { name: "Moustache Agra", lat: 27.26156953, lon: 78.07524716 },
  { name: "Moustache Delhi", lat: 28.61257139, lon: 77.28423582 },
  { name: "Moustache Rishikesh Luxuria", lat: 30.13769036, lon: 78.32465767 },
  {
    name: "Moustache Rishikesh Riverside Resort",
    lat: 30.10216117,
    lon: 78.38458848,
  },
  { name: "Moustache Hostel Varanasi", lat: 25.2992622, lon: 82.99691388 },
  { name: "Moustache Goa Luxuria", lat: 15.6135195, lon: 73.75705228 },
  { name: "Moustache Koksar Luxuria", lat: 32.4357785, lon: 77.18518717 },
  { name: "Moustache Daman", lat: 20.41486263, lon: 72.83282455 },
  { name: "Panarpani Retreat", lat: 22.52805539, lon: 78.43116291 },
  { name: "Moustache Pushkar", lat: 26.48080513, lon: 74.5613783 },
  { name: "Moustache Khajuraho", lat: 24.84602104, lon: 79.93139381 },
  { name: "Moustache Manali", lat: 32.28818695, lon: 77.17702523 },
  { name: "Moustache Bhimtal Luxuria", lat: 29.36552248, lon: 79.53481747 },
  { name: "Moustache Srinagar", lat: 34.11547314, lon: 74.88701741 },
  { name: "Moustache Ranthambore Luxuria", lat: 26.05471373, lon: 76.42953726 },
  { name: "Moustache Coimbatore", lat: 11.02064612, lon: 76.96293531 },
  { name: "Moustache Shoja", lat: 31.56341267, lon: 77.36733331 },
];

// Connect to MongoDB and insert properties
const seedProperties = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Property.deleteMany(); // optional: clears previous entries
    await Property.insertMany(
      properties.map((p) => ({
        name: p.name,
        location: { lat: p.lat, lon: p.lon },
      }))
    );
    console.log(" All properties added!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedProperties();
