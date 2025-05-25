const Project = require('../models/Project');
const ScanResult = require('../models/ScanResult');
const { scanRepository } = require('../services/osvScanner');

exports.scanHandler = async (req, res) => {
    try {
        const userId = req.user._id;  // assuming auth middleware sets req.user
        const { repoUrl, accessToken } = req.body;
        if (!repoUrl) return res.status(400).json({ error: "repoUrl is required" });

        // Check if project exists for user + repoUrl
        let project = await Project.findOne({ user: userId, repoUrl });
        if (!project) {
            project = await Project.create({ user: userId, repoUrl, accessToken });
        }

        // Perform scan and get packages data (don’t save ScanResult here)
        const packages = await scanRepository(repoUrl, accessToken);

        // Save ScanResult linked to Project
        const scanResult = await ScanResult.create({
            projectId: project._id,    // <-- reference project
            repoUrl,
            packages,
        });

        // update scantime for project

        project.lastScannedAt = new Date();
        await project.save();

        res.json({ projectId: project._id, scanResultId: scanResult._id });
    } catch (err) {
        console.error("Scan error:", err);
        res.status(500).json({ error: "Scan failed" });
    }
};

exports.getScanResults = async (req, res) => {
    try {
        const userId = req.user._id;  // assuming auth middleware sets req.user
        const { projectId } = req.params;

        if (!projectId) return res.status(400).json({ error: "projectId is required" });

        // Find project to ensure it belongs to the user
        const project = await Project.findOne({ _id: projectId, user: userId });
        if (!project) return res.status(404).json({ error: "Project not found" });

        // Get scan results for this project
        const scanResults = await ScanResult.find({ projectId }).populate('projectId', 'repoUrl');

        res.status(200).json({
            success: true,
            message: "Scan results retrieved successfully",
            projectId: project._id,
            repoUrl: project.repoUrl,
            scanResults: scanResults.map(result => ({
                _id: result._id,
                createdAt: result.createdAt,
                packages: result.packages,
            })),
        });
    } catch (err) {
        console.error("Get scan results error:", err);
        res.status(500).json({ error: "Failed to retrieve scan results" });
    }
}