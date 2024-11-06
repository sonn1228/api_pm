import mongoose, { Schema } from 'mongoose';

// Define the schema for blacklisted tokens
const BlacklistSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    blacklistedBy: { type: String, required: false }, // Optional field for who blacklisted the token
  },
  {
    timestamps: true,
  }
);

// Automatically remove expired tokens from the database
BlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create and export the Blacklist model
const Blacklist = mongoose.model('Blacklist', BlacklistSchema);

export default Blacklist;
