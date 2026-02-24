import { AppColors } from '@/constants/theme';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const NAV_ITEMS = [
  { label: 'Profile', onPress: () => console.log('Profile pressed') },
  { label: 'Settings', onPress: () => console.log('Settings pressed') },
  { label: 'Info', onPress: () => console.log('Info pressed') },
  { label: 'Contact', onPress: () => console.log('Contact pressed') },
] as const;

export default function NavBar() {
  return (
    <View style={styles.container}>
      <View style={styles.navLinks}>
        {NAV_ITEMS.map((item) => (
          <Pressable
            key={item.label}
            onPress={item.onPress}
          >
            <Text style={styles.navLinkText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const BOTTOM_CURVE_RADIUS = 44;

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: AppColors.button,
    borderTopLeftRadius: BOTTOM_CURVE_RADIUS - 35,
    borderTopRightRadius: BOTTOM_CURVE_RADIUS - 35,
    borderBottomLeftRadius: BOTTOM_CURVE_RADIUS,
    borderBottomRightRadius: BOTTOM_CURVE_RADIUS,
    shadowColor: 'yellow',
    shadowOffset: { width: 1, height: 9 },
    shadowOpacity: 0.2,
    shadowRadius: 70
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  navLinkText: {
    fontSize: 19,
    fontWeight: '300',
    marginTop: 10,
    color: AppColors.buttonText,
  },
});