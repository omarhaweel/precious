import { AppColors } from '@/constants/theme';
import Toggler, { TogglerValue } from '../../components/ui/toggler';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function SignupScreen() {
  const [accountType, setAccountType] = useState<TogglerValue>('left');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(48, insets.bottom + 24) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join and enjoy the luxury of a personalized shopping experience</Text>

          <View style={styles.togglerContainer}>
            <Toggler
              leftLabel="Seller"
              rightLabel="Buyer"
              value={accountType}
              onValueChange={setAccountType}
            />
          </View>

          <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            </View>
  
            <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerLine} />
          </View>
            
            
            <Pressable style={styles.signupButton}>
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
  
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 48,
  },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
      marginTop: '0%',
    },
    subtitle: {
      fontSize: 18,
      color: '#E5E7EB',
      marginBottom: 40,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: '#374151',
      borderRadius: 30,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#fff',
      marginBottom: 16,
    },
  togglerContainer: {
    marginBottom: '5%',
    marginTop: '30%',
  },
  signupButton: {
    backgroundColor: AppColors.button,
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: '5%',
    },
  buttonText: {
    color: AppColors.buttonText,
      fontSize: 16,
      fontWeight: '600',
    },
    formContainer: {
      marginTop: '10%',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 16,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#374151',
    },
    dividerText: {
      color: '#9CA3AF',
      fontSize: 16,
      fontWeight: '500',
      marginHorizontal: 12,
    },
});
