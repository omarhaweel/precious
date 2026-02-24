import { AppColors as ThemeColors } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const buttonBg = ThemeColors.button;
const buttonTextColor = ThemeColors.buttonText;

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="#6B7280" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#9CA3AF"
        value={query}
        onChangeText={setQuery}
      />
      <Pressable style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.3)',
    height: 46,
    paddingLeft: 16,
    borderRadius: 23,
    overflow: 'hidden',
    maxWidth: 448,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#374151',
    paddingVertical: 0,
  },
  submitBtn: {
    backgroundColor: buttonBg,
    width: 80,
    height: 36,
    borderRadius: 18,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: buttonTextColor,
    fontSize: 15,
    shadowColor: 'emerald',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 9,
  },
});