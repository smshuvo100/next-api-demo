import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let isConnected = false;

export async function connectToDB() {
    if (isConnected) {
    return;
  }
    
  try{
    await mongoose.connect(MONGODB_URI, {
        dbName: "testdb",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
     console.error("❌ Mongoose connection error:", error);
    throw error;
  }
}