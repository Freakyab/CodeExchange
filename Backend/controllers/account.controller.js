const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");

/*
 * POST : /account/signup
 */
router.post("/signup", async (req, res) => {
  try {
    console.debug("Signup request received");
    const { username, name, email, password } = req.body;

    // Validate
    const existingEmail = await Account.findOne({ email });
    const existingUsername = await Account.findOne({ username });

    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists" });

    // Create new User
    const newUser = new Account({
      username,
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // Save user and return response
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*
 * POST : /account/login
 */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
