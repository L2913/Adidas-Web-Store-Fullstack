const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = "adidas_secret_key";


// REGISTER
router.post("/register", async (req, res) => {
  try {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Registration error"
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      username: user.username
    });

  } catch (error) {

    res.status(500).json({
      message: "Login error"
    });
  }
});

module.exports = router;