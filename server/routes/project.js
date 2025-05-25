const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const { createProject, getUserProjects } = require("../controllers/project.js");

router.post("/", auth, createProject);
router.get("/", auth, getUserProjects);

module.exports = router;
