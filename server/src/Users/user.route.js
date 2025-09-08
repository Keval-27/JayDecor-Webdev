// src/Users/user.route.js

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const verifyAdminToken = require("../middleware/verifyAdminToken");

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  console.log("Admin login attempt:", req.body);  // <-- log incoming data

  try {
    const admin = await User.findOne({ username, role: "admin" });
    console.log("Found admin user:", admin);       // <-- log if admin user was found

    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // ✅ Use bcrypt to compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match result:", isMatch); // <-- log password check result

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication successful",
      token,
      user: { username: admin.username, role: admin.role },
    });

  } catch (err) {
    console.error("Failed to login as admin", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/create-admin", verifyAdminToken, async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide username, email, and password" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Login route
  
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body; // identifier = email OR username

  try {
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check password (hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Signup route

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, email, password: hashedPassword, role: "user" });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
