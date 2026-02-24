import { AppColors } from '@/constants/theme';
import Toggler, { TogglerValue } from '../../components/ui/toggler';
import {
  Alert,
  GestureResponderEvent,
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

import { API_BASE } from '@/config/env';

export default function SignupScreen() {
  const [accountType, setAccountType] = useState<TogglerValue>('Seller');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const insets = useSafeAreaInsets();

  const API_USERS_CREATE_USER = `${API_BASE}/api/users/create-user`;
  async function handleSignup(event: GestureResponderEvent): Promise<void> {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    const response = await fetch(API_USERS_CREATE_USER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name,
        email,
        password,
        role: accountType.toUpperCase(),
      }),
    });
    const data = await response.json();
    console.log(data);
  }


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
          <Text style={styles.subtitle}>Enjoy the luxury of a personalized shopping experience</Text>

          {/* Toggler for account type */}
          <View style={styles.togglerContainer}>
            <Toggler
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
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
  
            <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerLine} />
          </View>
            
            
            <Pressable style={styles.signupButton} onPress={handleSignup}>
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
