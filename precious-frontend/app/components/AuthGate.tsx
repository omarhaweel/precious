import { AppColors } from '@/constants/theme';
import { getToken } from '@/services/auth';
import { router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type AuthGateProps = { children: React.ReactNode };

/**
 * On app load: if user has a token, redirect to homescreen so session persists.
 * Keeps a loading overlay until we're on homescreen so index is never visible.
 */
export default function AuthGate({ children }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getToken().then((token) => {
      setIsAuthenticated(Boolean(token));

    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    router.replace('/(tabs)/homescreen');
  }, [isAuthenticated]);

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background,
  },
});