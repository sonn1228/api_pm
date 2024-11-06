import { Router } from "express";
import controller from '../controller/auth.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// POST /users/signup - Create a new user
router.post("/signup", controller.signup);  // Renamed to createUser for consistency

// POST /users/login - Log in an existing user
router.post("/login", controller.login);   // Renamed to loginUser

// POST /users/logout - Log out the user (requires authentication)
router.post("/logout", authMiddleware.requiredAuth, controller.logout);  // Renamed to logoutUser

// GET /users/profile - Get the profile of the currently logged-in user
router.get("/profile", authMiddleware.requiredAuth, controller.profile);  // Renamed to getProfile for consistency

export default router;
