import React, { ReactNode } from 'react';
import { AppColors } from '@/constants/theme';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GemstoneSvg from '../../assets/categories/gemstones.svg';
import JewelrySvg from '../../assets/categories/jewelry.svg';
import LeatherSvg from '../../assets/categories/leather.svg';
import RepairSvg from '../../assets/categories/repair.svg';
import SunglassesSvg from '../../assets/categories/sunglasses.svg';
import WatchesSvg from '../../assets/categories/watches.svg';


const ICON_SIZE = 40;
const SCREEN_WIDTH = Dimensions.get('window').width;

// the category item
type CategoryItem = {
  name: string;
  icon: () => ReactNode;
  onPress: () => void;
};


// categories list
const CATEGORIES: Record<string, CategoryItem> = {
  Watches: {
    name: 'Watches',
    icon: () => <WatchesSvg width={ICON_SIZE} height={ICON_SIZE} />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  Gemstone: {
    name: 'Gemstones',
    icon: () => <GemstoneSvg width={ICON_SIZE} height={ICON_SIZE} color={AppColors.button} />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  Jewelry: {
    name: 'Jewelry',
    icon: () => <JewelrySvg width={ICON_SIZE} height={ICON_SIZE} />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  Sunglasses: {
    name: 'Sunglasses',
    icon: () => <SunglassesSvg width={ICON_SIZE} height={ICON_SIZE} />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  Leather: {
    name: 'Leather',
    icon: () => <LeatherSvg width={ICON_SIZE} height={ICON_SIZE}  />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  Repair: {
    name: 'Service',
    icon: () => <RepairSvg width={ICON_SIZE} height={ICON_SIZE} />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  Jewelry2: {
    name: 'Jewelry',
    icon: () => <JewelrySvg width={ICON_SIZE} height={ICON_SIZE} />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  Sunglasses2: {
    name: 'Sunglasses',
    icon: () => <SunglassesSvg width={ICON_SIZE} height={ICON_SIZE} />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  Leather2: {
    name: 'Leather',
    icon: () => <LeatherSvg width={ICON_SIZE} height={ICON_SIZE}  />,
    onPress: () => {}, // TODO: add on press function for each category
  },
  // add more categories here
};

// category card
const CategoryCard = ({ category }: { category: CategoryItem }) => {
  return (
    <Pressable style={styles.card} onPress={category.onPress}>
      <View style={styles.iconWrapper}>
        {category.icon()}
      </View>
      
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{category.name}</Text>
      </View>
    </Pressable>
  );
};


const CategoryCardGrid = () => {
  const items = Object.values(CATEGORIES);
  const columns = [];
  for (let i = 0; i < items.length; i += 2) columns.push(items.slice(i, i + 2));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      {columns.map((col, i) => (
        <View key={i} style={styles.column}>
          {col.map((category) => <CategoryCard key={category.name} category={category} />)}
        </View>
      ))}
    </ScrollView>
  );
};

const MainScreenVerticalScrollView = () => {
  return (
    <View style={styles.verticalScrollWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.verticalScrollView}
        contentContainerStyle={styles.verticalScrollContent}
      >
        <View style={styles.categoryGridSection}>
          <CategoryCardGrid />
        </View>
        <View style={styles.scrollPlaceholder} />
      </ScrollView>
    </View>
  );
};
  



const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    flexDirection: 'column',
    verticalAlign: 'top',
    alignItems: 'center',
   
  },
  iconWrapper: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginBottom: 2,
    marginTop: 20,
    alignItems: 'center',
    marginLeft: 35,
  },
  nameWrapper: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 35,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '200',
    textAlign: 'center',
    color: AppColors.fontColor,
  },
  
  scrollView: {
    width: SCREEN_WIDTH,
    height: ICON_SIZE * 5,
    marginLeft: -35,
    marginRight: -35,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 1,
    borderRadius: 10,
  },
  verticalScrollWrapper: {
    flex: 1,
    marginHorizontal: -35,
  },
  verticalScrollView: {
    flex: 1,
  },
  verticalScrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  categoryGridSection: {
    marginBottom: 16,
  },
  scrollPlaceholder: {
    minHeight: 400,
  },
});

export { CategoryCardGrid, MainScreenVerticalScrollView };