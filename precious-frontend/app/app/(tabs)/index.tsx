import { AppColors } from '@/constants/theme';
import { openBrowserAsync } from 'expo-web-browser';
import { router } from 'expo-router';
import '../../global.css';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleSignInComponent from '@/components/ui/googleSignIn';
import { signInWithEmailAndPassword, signInWithGoogle } from '@/services/auth';

export default function HomeScreen() {
  const openLink = (url: string) => () => openBrowserAsync(url);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcomeTitle}>Welcome to Precious,</Text>
        <Text style={styles.welcomeSubtitle}>Your Luxury Companion</Text>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/signup')}>
          <Text style={styles.primaryButtonText}>Create account</Text>
        </Pressable>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable
          style={styles.secondaryButton}
          onPress={async () => {
            const success = await signInWithEmailAndPassword();
            if (success) router.push('/homescreen');
          }}
        >
          <Text style={styles.secondaryButtonText}>Log in</Text>
        </Pressable>

        <GoogleSignInComponent
          onPress={async () => {
            const success = await signInWithGoogle();
            if (success) router.push('/homescreen');
          }}
        />

        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.link} onPress={openLink('https://example.com/terms')}>
            terms
          </Text>
          , and{' '}
          <Text style={styles.link} onPress={openLink('https://example.com/privacy')}>
            privacy policy
          </Text>
        </Text>

        <Text style={styles.versionText}>Version 1.1</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    marginTop: '40%',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#E5E7EB',
    marginBottom: 48,
  },
  primaryButton: {
    backgroundColor: AppColors.button,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: '60%',
  },
  primaryButtonText: {
    color: AppColors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#9CA3AF',
  },
  dividerText: {
    color: '#D1D5DB',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: AppColors.button,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: AppColors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    marginTop: 32,
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 22,
    textAlign: 'center',
  },
  link: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  versionText: {
    marginTop: 24,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});