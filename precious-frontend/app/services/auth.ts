import * as WebBrowser from 'expo-web-browser';

import { API_BASE } from '@/config/env';

const OAUTH_GOOGLE_URL = `${API_BASE}/oauth2/authorization/google`;
const AUTH_CALLBACK_SCHEME = 'app://auth/callback';

/**
 * Calls the login endpoint with email and password. On success returns { success: true, user }.
 */
export async function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<{ success: boolean; user?: { id: number; username: string; email: string; role: string } }> {
  try {
    const params = new URLSearchParams({ email, password });
    const response = await fetch(`${API_BASE}/api/login/email-and-password?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json().catch(() => ({}));
    return { success: data.success, user: data.user };
  } catch {
    return { success: false };
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