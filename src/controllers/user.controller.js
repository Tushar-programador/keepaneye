import User from "../models/user.model.js"; // Import User schema
import mongoose from "mongoose";
import Organization from "../models/organisation.model.js"; // Import Organization schema
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../configs/env.js";

// Secret key for JWT
const JWT_SECRET = jwtSecret;

// Controller object
const UserController = {
  /**
   * Register a new user
   */
  async register(req, res) {
    try {
      const { name, email, password, organizationId } = req.body;
      console.log("Register")
      console.log(name, email, password, organizationId,);
      // Check if email is already registered
      const existingUser = await  User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use." });
      }

      const organization = await Organization.findById(organizationId);
      // if (!organization) {
      //   return res.status(404).json({ error: "Organization not found." });
      // }

      // Hash the password
      const hashedPassword = await hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        organization: organizationId,
      });

      await newUser.save();

      res
        .status(201)
        .json({
          message: "User registered successfully.",
          userId: newUser._id,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  },

  /**
   * Login a user
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Invalid email or password." });
      }

      // Compare the password
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({ message: "Login successful.", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  },

  /**
   * Get user profile
   */
  async getProfile(req, res) {
    try {
      const { userId } = req.user; // Extract from middleware
      const user = await findById(userId).populate("organization", "name");
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          organization: user.organization,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(req, res) {
    try {
      const { userId } = req.user; // Extract from middleware
      const { name, email, password } = req.body;

      // Find the user by ID
      const user = await findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Update fields
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        const hashedPassword = await hash(password, 10);
        user.password = hashedPassword;
      }

      await user.save();

      res.status(200).json({ message: "Profile updated successfully.", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  },

  /**
   * Delete user account
   */
  async deleteAccount(req, res) {
    try {
      const { userId } = req.user; // Extract from middleware

      // Delete user by ID
      const deletedUser = await findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json({ message: "User account deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  },
};

export default UserController;
