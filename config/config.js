// config.js - General config module

const Joi = require("joi");

// Require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// Define validation for all the env vars
const envVarsSchema = Joi.object({
  // NODE
  NODE_ENV: Joi.string()
    .allow("dev", "prod", "test", "provision")
    .default("prod")
    .description("Current environment for API"),
  SERVER_PORT: Joi.number().default(5000).description("API Server Port"),
  // FIREBASE
  FIREBASE_PROJECT_ID: Joi.string()
    .required()
    .description("Project ID identifying our database project within Firebase"),
  FIREBASE_CLIENT_EMAIL: Joi.string()
    .required()
    .description("Email associated with our firebase account"),
  FIREBASE_PRIVATE_KEY: Joi.string()
    .required()
    .description("Private key to restrict access to our firebase service"),
  FIREBASE_DATABASE_URL: Joi.string()
    .required()
    .description("Access URL to our firebase realtime database"),
  FIREBASE_STORAGE_BUCKET: Joi.string()
    .required()
    .description("Access to our firebase storage bucket"),
  CORS_REGEX: Joi.string()
    .required()
    .description("Enables CORS for firebase preview channels"),
})
  .unknown()
  .required();

// Validate env vars against schema
const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Define config for backend
const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  firebase: {
    credential: {
      projectId: envVars.FIREBASE_PROJECT_ID,
      clientEmail: envVars.FIREBASE_CLIENT_EMAIL,
      privateKey: envVars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    databaseURL: envVars.FIREBASE_DATABASE_URL,
    storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
  },
  corsRegex: envVars.CORS_REGEX,
  backendUrl: "/",
  apiUrl: "/api",  
};

module.exports = config;
