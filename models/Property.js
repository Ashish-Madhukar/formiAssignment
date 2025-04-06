const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
});

module.exports =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
