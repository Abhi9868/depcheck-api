require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const scanRoutes = require("./routes/scan");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5174" })); // frontend URL
app.use(express.json());


// home route 
app.get("/", (req, res) => {
    res.send("Welcome to the OSV Scanner API");
});

app.use("/api/scan", scanRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
    })
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
    });
