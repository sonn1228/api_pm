import UserModel from "../../../model/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../../utils/jwt.js";
import { errorResponse, successResponse } from "../../../helper/response.js";
import Blacklist from "../../../model/blacklist.model.js";

const controller = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = new UserModel({
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error during signup", error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password: hash } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!bcrypt.compareSync(hash, user.password)) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const accessToken = createAccessToken({ userId: user.id });
      if (!accessToken) {
        return errorResponse(res, 500, "Server errors");
      }

      return successResponse(res, 200, "Success", { accessToken });
    } catch (error) {
      return res.status(500).json({ message: "Error during login", error });
    }
  },

  logout: async (req, res) => {
    const user = req.user;
    const { accessToken, exp } = user;

    if (!accessToken) {
      return res.status(400).json({ message: "Token not provided" });
    }

    try {
      const blacklist = await Blacklist.findOne({ token: accessToken });
      if (!blacklist) {
        const newBlackList = new Blacklist({
          token: accessToken,
          expiresAt: exp,
        });
        await newBlackList.save();
      }

      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  profile: async (req, res) => {
    const user = req.user;
    return successResponse(res, 200, "Success", user);
  }
}

export default controller;
