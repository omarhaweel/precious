import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="homescreen" options={{ gestureEnabled: false }} /> 
      <Stack.Screen name="loginForm" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="sellScreen" />
    </Stack>
  );
}