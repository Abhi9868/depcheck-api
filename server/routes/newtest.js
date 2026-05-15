const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe
} = require("../controllers/auth.js");

const auth = require("../middleware/auth.js");

// ==============================
// Public Auth Routes
// ==============================

router.post("/register", register);
router.post("/login", login);

// ==============================
// Protected Route
// ==============================

router.get("/me", auth, getMe);

// ==============================
// Intentionally Vulnerable Routes
// For API Security Testing
// ==============================

// Broken Authentication
router.get("/admin", (req, res) => {
  const role = req.headers.role;

  if (role === "admin") {
    return res.json({
      success: true,
      message: "Welcome Admin"
    });
  }

  res.status(403).json({
    success: false,
    message: "Access denied"
  });
});

// IDOR Vulnerability
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  res.json({
    success: true,
    userId,
    email: `user${userId}@gmail.com`,
    role: "user",
    token: "sample-jwt-token"
  });
});

// Sensitive Data Exposure
router.get("/debug", (req, res) => {
  res.json({
    ENV: process.env,
    headers: req.headers,
    cookies: req.cookies
  });
});

// Hardcoded Secrets
router.get("/config", (req, res) => {
  res.json({
    githubToken: "ghp_test_secret_token_123456",
    awsSecret: "AKIAIOSFODNN7EXAMPLE",
    jwtSecret: "SUPER_SECRET_JWT_KEY"
  });
});

// No Rate Limiting
router.post("/bruteforce-login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({
      success: true,
      token: "admin-token"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

// Open Redirect
router.get("/redirect", (req, res) => {
  const url = req.query.url;

  return res.redirect(url);
});

// Command Injection Simulation
router.post("/ping", (req, res) => {
  const host = req.body.host;

  const command = `ping -c 1 ${host}`;

  res.json({
    success: true,
    command
  });
});

// SQL Injection Simulation
router.post("/search-user", (req, res) => {
  const email = req.body.email;

  const query = `
    SELECT * FROM users WHERE email = '${email}'
  `;

  res.json({
    success: true,
    query
  });
});

// Prototype Pollution
router.post("/merge", (req, res) => {
  const body = req.body;

  const merged = Object.assign({}, body);

  res.json({
    success: true,
    merged
  });
});

// JWT Exposure
router.get("/token", (req, res) => {
  res.json({
    token: req.headers.authorization
  });
});

// Unsafe File Access
router.get("/read-file", (req, res) => {
  const file = req.query.file;

  res.json({
    path: `../../${file}`
  });
});

// Missing Authorization
router.delete("/delete-user/:id", (req, res) => {
  res.json({
    success: true,
    deletedUser: req.params.id
  });
});

module.exports = router;
