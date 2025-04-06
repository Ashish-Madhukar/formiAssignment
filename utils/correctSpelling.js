const fuzz = require("fuzzball");

// Add popular city/state/area names here or fetch dynamically
const knownLocations = [
  "Delhi",
  "Bangalore",
  "Mumbai",
  "Jaipur",
  "Sissu",
  "Koksar",
  "Manali",
  "Agra",
];

function correctSpelling(input) {
  const [bestMatch] = fuzz.extract(input, knownLocations, {
    scorer: fuzz.ratio,
  });
  return bestMatch;
}

module.exports = correctSpelling;
