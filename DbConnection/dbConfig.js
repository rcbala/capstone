import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGOURL;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(mongoURL);
    console.log("MongooDb Connected");

    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
