import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';

import { API_BASE } from '@/config/env';

const OAUTH_GOOGLE_URL = `${API_BASE}/oauth2/authorization/google`;
const AUTH_CALLBACK_SCHEME = 'app://auth/callback';
const TOKEN_KEY = 'auth_token';


export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function setToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export type AuthUser = { id: number; username: string; email: string; role: string };


/**
 * Calls the login endpoint with email and password. On success returns { success: true, user }.
 */
export async function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<{ success: boolean; user?: AuthUser, token?: string }> {
  try {
    const params = new URLSearchParams({ email, password });
    const response = await fetch(`${API_BASE}/api/login/email-and-password?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json().catch(() => ({}));
    if (data.success && data.token) {
      await setToken(data.token);
    }
    return { success: data.success, user: data.user, token: data.token };
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