import { AppColors } from '@/constants/theme';
import { getStoredUser, logout, type AuthUser } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import NavBar from '@/components/ui/navBar';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function ProfileScreen() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const loadUser = useCallback(async () => {
    const u = await getStoredUser();
    setUser(u);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  const menuItems: MenuItem[] = [
    { id: 'favorites', label: 'My Favorites', icon: 'heart', onPress: () => {} },
    { id: 'payment', label: 'Payment', icon: 'card', onPress: () => {} },
    { id: 'promotions', label: 'Promotions', icon: 'pricetag', onPress: () => {} },
    { id: 'settings', label: 'Settings', icon: 'settings', onPress: () => {} },
    { id: 'logout', label: 'Log out', icon: 'log-out', onPress: handleLogout },
  ];

  const initial = user?.username?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          </View>
          <View style={styles.nameEmailBlock}>
            <Text style={styles.userName} numberOfLines={1}>
              {user?.username ?? 'Guest'}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {user?.email ?? '—'}
            </Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <Pressable key={index} style={styles.menuRow} onPress={item.onPress}>
              <View style={styles.menuRowContent}>
                <View style={styles.menuRowIconWrap}>
                  <Ionicons name={item.icon} size={22} color={AppColors.fontColor} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/** Custom NavBar at bottom */}
      <View style={styles.bottomNav}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
}

const AVATAR_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    marginBottom: 12,
  },
  avatarCircle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: AppColors.button,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'yellow',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
    elevation: 5,
  },
  avatarInitial: {
    fontSize: 28,
    fontWeight: '600',
    color: AppColors.buttonText,
  },
  nameEmailBlock: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: AppColors.fontColor,
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: 15,
    color: AppColors.fontColor,
    opacity: 0.85,
    textAlign: 'center',
  },
  menu: {
    backgroundColor: 'rgba(220, 252, 231, 0.12)',
    borderRadius: 50,
    overflow: 'hidden',
    minHeight: 500,
    marginTop: -8,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginLeft: 80
  },
  menuRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    gap: 12,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(220, 252, 231, 0.35)',
  },
  menuRowPressed: {
    opacity: 0.7,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: AppColors.fontColor,
  },
  menuRowIconWrap: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'yellow',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: AppColors.button,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonPressed: {
    opacity: 0.85,
  },
  logoutLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.buttonText,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 8,
  },
});
