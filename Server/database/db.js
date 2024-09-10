import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected : ${connection.connection.host}`);
  } catch (error) {
    console.log(`There is an error : ${error.message}`);
  }
};
