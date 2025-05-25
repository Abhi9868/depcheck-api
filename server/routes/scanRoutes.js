const express = require("express");
const router = express.Router();
const { scanHandler, } = require("../controllers/scanController.js");
const auth = require("../middleware/auth.js");


// router.post("/scan", auth, scanHandler);
router.post("/scans", auth, async (req, res) => {
    try {
        const userId = req.user._id;  // assuming auth middleware sets req.user

        res.json({
            message: "Scan request received",
            userId: userId,
        });
    } catch (err) {
        console.error("Scan error:", err);
        res.status(500).json({ error: "Scan failed" });
    }
});

module.exports = router;
