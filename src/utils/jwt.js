import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
// Environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ACCESS_TOKEN_EXPIRE = process.env.JWT_ACCESS_TOKEN_EXPIRE;
const JWT_REFRESH_TOKEN_EXPIRE = process.env.JWT_REFRESH_TOKEN_EXPIRE;

// Function to create an access token
const createAccessToken = (data = {}) => {
  console.log("JWT_SECRET: ", JWT_SECRET);
  console.log("JWT_ACCESS_TOKEN_EXPIRE: ", JWT_ACCESS_TOKEN_EXPIRE);
  console.log("data: ", data);

  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRE,
  });
};

// Function to create a refresh token
const createRefreshToken = (data = {}) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRE,
  });
};

// Function to verify a token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { createAccessToken, createRefreshToken, verifyToken };
