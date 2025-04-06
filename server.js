const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const propertyRoutes = require("./routes/propertyRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// ✅ Homepage Route
app.get("/", (req, res) => {
  res.send("🎉 Moustache Escapes API is running successfully!");
});

// ✅ Property Routes
app.use("/", propertyRoutes);

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
