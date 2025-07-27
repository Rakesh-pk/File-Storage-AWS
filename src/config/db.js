import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;


const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));
}

export default connectToDB;

