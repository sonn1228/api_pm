import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: String,
    phone: String,
    avatar: String,
    status: {
      type: String,
      default: 'active',
    },
    friendsList: [
      {
        user_id: String,
        room_chat_id: String,
      },
    ],
    acceptFriends: Array,
    requestFriends: Array,
    statusOnline: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema, 'users');

export default User;
