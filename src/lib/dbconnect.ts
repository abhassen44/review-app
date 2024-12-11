import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Connects to MongoDB using Mongoose.
 */
const connect = async () => {
  try {
    // Ensure the MONGO_URI environment variable is defined
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }

    // Log the MONGO_URI for debugging purposes
    console.log('MONGO_URI:', mongoUri);

    // Attempt to connect to MongoDB
    await mongoose.connect(mongoUri);

    console.log('MongoDB connected successfully.');
  } catch (err) {
    // Log the error message and exit the process
    console.error('MongoDB connection failed:');
    process.exit(1); // Exit the process with a failure code
  }
};

export default connect;
