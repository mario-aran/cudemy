import { NODE_ENVIRONMENTS } from '@/constants/node-environments';

// ---------------------------
// VALUES
// ---------------------------

const NODE_ENV = process.env.NODE_ENV;
export const isTest = NODE_ENV === NODE_ENVIRONMENTS.TEST;
export const isProduction = NODE_ENV === NODE_ENVIRONMENTS.PRODUCTION;
export const isDevelopment = !isProduction && !isTest;

// ---------------------------
// GUARDS
// ---------------------------

if (!isProduction) {
  // Disabled eslint: use "require()" to load dotenv synchronously
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  (require('dotenv') as typeof import('dotenv')).config({ quiet: isTest });
}

// ---------------------------
// UTILS
// ---------------------------

const getRequiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is required`);
  return value;
};

// ---------------------------
// ENV VARIABLES
// ---------------------------

export const PORT = Number(getRequiredEnv('PORT'));
export const DATABASE_URL = getRequiredEnv('DATABASE_URL');
export const STORAGE_ENDPOINT = getRequiredEnv('STORAGE_ENDPOINT');
export const STORAGE_ACCESS_KEY = getRequiredEnv('STORAGE_ACCESS_KEY');
export const STORAGE_SECRET_KEY = getRequiredEnv('STORAGE_SECRET_KEY');
export const RABBITMQ_URL = getRequiredEnv('RABBITMQ_URL');
