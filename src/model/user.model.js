import mongoose, { Schema } from "mongoose";

// Define the User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current time
  },
});

// Create the User model from the schema
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
