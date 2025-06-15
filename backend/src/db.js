import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB () {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bulkuploader');
  console.log('MongoDB connected');
}
