import mongoose from 'mongoose';
import { config } from '../config/config';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongooseUrl, {
      dbName: config.dbName,
    });
    // console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};
