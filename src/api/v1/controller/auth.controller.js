import User from "../../../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../../utils/jwt.js";
import { errorResponse, successResponse } from "../../../helpers/response.js";
import Blacklist from "../../../models/blacklist.model.js";

const controller = {

  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      console.log("existingUser: ", existingUser);

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      console.log("existingUser: ", existingUser);


      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return successResponse(res, 201, "successfully", { newUser });
    } catch (error) {
      return errorResponse(res, 500, "Internal server error - signup controller");
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return errorResponse(res, 400, "User not found");
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const accessToken = createAccessToken({ userId: user._id });
      if (!accessToken) {
        return errorResponse(res, 500, "Server errors");
      }
      console.log("accessToken: ", accessToken);


      return successResponse(res, 200, "Success", { accessToken });
    } catch (error) {
      errorResponse(res, 500, "Internal server error");
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
