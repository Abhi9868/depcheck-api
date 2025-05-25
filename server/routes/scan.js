const express = require("express");
const router = express.Router();
const { scanHandler, getScanResults, } = require("../controllers/scanController.js");
const auth = require("../middleware/auth.js");


router.post("/", auth, scanHandler);
router.get("/:projectId", auth, getScanResults);
router.post("/test", async (req, res) => {
    try {

        res.json({
            message: "Scan request received",
        });
    } catch (err) {
        console.error("Scan error:", err);
        res.status(500).json({ error: "Scan failed" });
    }
});

module.exports = router;
