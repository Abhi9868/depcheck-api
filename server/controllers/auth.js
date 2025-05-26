const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });
    res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
        return res.status(400).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user._id) });
};


// GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        // auth middleware should have set req.user to the full User doc (minus password)
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        });
    } catch (err) {
        console.error("GetMe error:", err);
        res.status(500).json({ message: "Failed to fetch user info" });
    }
};

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
