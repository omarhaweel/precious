/**
 * App config from environment. In Expo, use EXPO_PUBLIC_* in .env (project root).
 * env.ts reads those vars and exports API_BASE; .env is optional (overrides this default).
 */
export const API_BASE =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_BASE) ||
  'http://10.0.0.6.nip.io:8080';
