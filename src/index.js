// Import libraries
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Import files
import { routesV1 } from "./api/v1/routes/index.route.js";
import connectDB from "./database/connect.js";

// Configure environment variables
dotenv.config();

// Create Express app
const app = express();

// Set port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Set up routes for API version 1
routesV1(app);

// Simple route for the root URL
app.get("/", (_, res) => {
    res.send("Hello, World abc!");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
