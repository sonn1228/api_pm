import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    console.log(`MongoDB successfully!`);
  } catch (error) {
    console.log("Connect Failed");
  }
};

export default connectDB;
