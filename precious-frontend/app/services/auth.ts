import * as WebBrowser from 'expo-web-browser';

const API_BASE = 'http://localhost:8080'; // replace with production URL
const OAUTH_GOOGLE_URL = `${API_BASE}/oauth2/authorization/google`;
const AUTH_CALLBACK_SCHEME = 'app://auth/callback';

/**
 * Calls the login endpoint. On success returns true so the caller can redirect.
 */
export async function signInWithEmailAndPassword(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch {
    return false;
  }
}

/**
 * Opens the system browser to Google OAuth. When the backend redirects to app://auth/callback,
 * the session completes and returns true so the caller can redirect to homescreen.
 */
export async function signInWithGoogle(): Promise<boolean> {
  try {
    const result = await WebBrowser.openAuthSessionAsync(
      OAUTH_GOOGLE_URL,
      AUTH_CALLBACK_SCHEME
    );
    return result.type === 'success';
  } catch {
    return false;
  }
}