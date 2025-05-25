// models/ScanResult.js
const mongoose = require("mongoose");

const ReferenceSchema = new mongoose.Schema({
    type: String,
    url: String
}, { _id: false });

const VulnerabilitySchema = new mongoose.Schema({
    id: String,
    summary: String,
    details: String,
    severity: String,
    cwe_ids: [String],
    aliases: [String],
    references: [ReferenceSchema],
    published: Date,
    modified: Date,
}, { _id: false });

const PackageSchema = new mongoose.Schema({
    name: String,
    version: String,
    ecosystem: String,
    vulnerabilities: [VulnerabilitySchema]
}, { _id: false });

const ScanResultSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    repoUrl: { type: String, required: true },
    scannedAt: { type: Date, default: Date.now },
    packages: [PackageSchema]
});

module.exports = mongoose.model("ScanResult", ScanResultSchema);
