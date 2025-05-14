import dotenv from 'dotenv';

// Load environment variables from .env file into process.env by defaul
dotenv.config();

// Define the config interface by extracting the properties from process.env
export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongooseUrl: process.env.MONGOOSE_URL || '',
  dbName: 'TellMe',
  townCouncilPwd: process.env.TOWN_COUNCIL_PWD || '',
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY || '',
};
