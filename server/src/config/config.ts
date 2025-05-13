import dotenv from 'dotenv';

// Load environment variables from .env file into process.env by defaul
dotenv.config(); 

interface Config {
  port: number;
  nodeEnv: string;
}

// Define the config interface by extracting the properties from process.env
const config: Config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Export the config object
// This allows us to use the config object in other parts of the application
export default config;