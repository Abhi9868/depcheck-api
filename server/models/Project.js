// models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    repoUrl: { type: String, required: true },
    accessToken: { type: String }, // Optional for private repos
    createdAt: { type: Date, default: Date.now },
    lastScannedAt: { type: Date },
});

module.exports = mongoose.model("Project", ProjectSchema);
