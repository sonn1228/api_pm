import bcrypt from "bcrypt";
import UserModel from "../../../models/user.model.js";
import { successResponse, errorResponse } from "../../../helpers/response.js";

const controller = {
  getAllUsers: async (req, res) => {
    try {
      const { sort, order, status, q, page = 1, limit = 10 } = req.query;
      const sortObj = {};
      const filter = {};

      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      if (status === "true" || status === "false") {
        filter.status = status === "true";
      }

      if (q) {
        filter.name = { $regex: q, $options: "i" };
      }

      if (sort && order) {
        sortObj[sort] = order === "asc" ? 1 : -1;
      } else {
        sortObj._id = -1;
      }

      const totalUsers = await UserModel.countDocuments(filter);

      const users = await UserModel.find(filter)
        .select("-password")
        .sort(sortObj)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

      successResponse(res, 200, "Success", { count: totalUsers, users });
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Server Error");
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id).select("-password");
      if (!user) {
        errorResponse(res, 404, "User not found");
        return;
      }
      successResponse(res, 200, "Success", user);
    } catch (error) {
      console.error(error);
      errorResponse(res, 404, "Error fetching user");
    }
  },

  createUser: async (req, res) => {
    const { name, username, password, email } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name,
        username,
        password: hashedPassword,
        email,
      });

      const savedUser = await newUser.save();
      successResponse(res, 201, "User created", savedUser);
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Error creating user");
    }
  },

  updateUser: async (req, res) => {
    const { method } = req;
    const userId = req.params.id;

    try {
      let updatedUserData = {};

      if (method === "PUT") {
        updatedUserData = {
          name: req.body.name || null,
          username: req.body.username || null,
          email: req.body.email || null,
        };
      } else {
        updatedUserData = req.body;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updatedUserData,
        { new: true, runValidators: true }
      ).select("-password");

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      successResponse(res, 200, "User updated successfully", updatedUser);
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Error updating user");
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      successResponse(res, 200, "User deleted", { id: userId });
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Error deleting user");
    }
  }
}

export default controller;