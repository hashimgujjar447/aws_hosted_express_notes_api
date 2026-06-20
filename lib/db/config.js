import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default connectDb;
