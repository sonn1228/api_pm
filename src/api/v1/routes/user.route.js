import { Router } from "express";
import controller from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// GET all users
router.get("/", authMiddleware.requiredAuth, controller.getAllUsers);

// GET a single user by ID
router.get("/:id", controller.getUserById);

// POST to create a new user
router.post("/", controller.createUser);

// PUT to update a user by ID
router.put("/:id", controller.updateUser);

// PATCH to update a user by ID
router.patch("/:id", controller.updateUser);

// DELETE to remove a user by ID
router.delete("/:id", controller.deleteUser);

export default router;
