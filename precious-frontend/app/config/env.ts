/**
 * App config from environment. In Expo, use EXPO_PUBLIC_* in .env (in the app directory).
 */
export const API_BASE =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_BASE) ||
  'http://localhost:8080'; // replace with production URL
