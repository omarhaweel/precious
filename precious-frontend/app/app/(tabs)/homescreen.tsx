import { AppColors } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainScreenVerticalScrollView } from '../../components/ui/categoryCard';
import NavBar from '../../components/ui/navBar';
import SearchBar from '../../components/ui/searchBar';

export default function HomeScreenPage() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.background} />

      <View style={styles.mainContent}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <SearchBar />
          </View>
        </View>

        <View style={styles.cardsSection}>
          <MainScreenVerticalScrollView />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.background,
  },
  mainContent: {
    flex: 1,
    zIndex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 35,
    paddingTop: 30,
    shadowColor: 'yellow',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 9,
  },
  searchBar: {
    borderRadius: 30,
  },
  cardsSection: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 35,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

