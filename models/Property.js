// const mongoose = require("mongoose");

// // Define the property schema
// const propertySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   location: {
//     lat: {
//       type: Number,
//       required: true,
//     },
//     lon: {
//       type: Number,
//       required: true,
//     },
//   },
// });

// // Prevent OverwriteModelError by reusing the existing model if it exists
// module.exports =
//   mongoose.models.Property || mongoose.model("Property", propertySchema);

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
