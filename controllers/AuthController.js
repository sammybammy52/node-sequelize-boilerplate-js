const { generateToken } = require("../helpers/jwtHelper");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

class AuthController {
  // Register a new user
  async register(req, res) {
    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create the user
      const user = await User.create({ firstName, lastName, email, password });

      // Generate JWT token
      const token = generateToken(user);

      return res.status(201).json({ status: "success", token, user: user });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  // Login user
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.scope("withPassword").findOne({
        where: { email },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = generateToken(user);
      user.password = null;
      return res.status(200).json({ status: "success", token, user: user });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async profile(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.user.email } });
      return res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }
}

module.exports = new AuthController();
