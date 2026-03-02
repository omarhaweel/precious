import { AppColors } from '@/constants/theme';
import NavBar from '@/components/ui/navBar';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  'Watch',
  'Jewelry',
  'Gemstone',
  'Sunglasses',
  'Leather',
  'Service',
  'Other luxury',
] as const;

export default function SellScreen() {
  const [category, setCategory] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const requestMediaPermissions = useCallback(async (isCamera: boolean) => {
    if (isCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  }, []);

  const pickImage = useCallback(
    async (useCamera: boolean) => {
      const hasPermission = await requestMediaPermissions(useCamera);
      if (!hasPermission) {
        Alert.alert(
          'Permission needed',
          'Please allow access to your photos or camera in Settings.'
        );
        return;
      }
      try {
        const result = useCamera
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsMultipleSelection: true,
              selectionLimit: 10 - images.length,
              quality: 0.8,
            });
        if (result.canceled) return;
        const uris = result.assets.map((a) => a.uri);
        setImages((prev) => [...prev, ...uris].slice(0, 10));
      } catch {
        Alert.alert('Error', 'Could not open image picker.');
      }
    },
    [images.length, requestMediaPermissions]
  );

  const showUploadOptions = useCallback(() => {
    Alert.alert('Add photos', 'Choose source', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Photo library', onPress: () => pickImage(false) },
      { text: 'Camera', onPress: () => pickImage(true) },
    ]);
  }, [pickImage]);

  const removeImage = useCallback((uri: string) => {
    setImages((prev) => prev.filter((u) => u !== uri));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>What do you want to sell?</Text>
        <Text style={styles.DropDownDescription}>Describe your item in detail...</Text>

        <Pressable
          style={styles.dropdown}
          onPress={() => setDropdownOpen((o) => !o)}
        >
          <Text style={[styles.dropdownText, !category && styles.placeholder]}>
            {category ?? 'Select category'}
          </Text>
          <Ionicons
            name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={22}
            color={AppColors.fontColor}
          />
        </Pressable>

        <Modal
          visible={dropdownOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setDropdownOpen(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setDropdownOpen(false)}
          >
            <View style={styles.modalContent}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat}
                  style={styles.modalOption}
                  onPress={() => {
                    setCategory(cat);
                    setDropdownOpen(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{cat}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Describe your item..."
          placeholderTextColor="rgba(220, 252, 231, 0.5)"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Add Images</Text>
        <View style={styles.uploadRow}>
          <Pressable style={styles.uploadButton} onPress={showUploadOptions}>
            <Ionicons name="add" size={32} color={AppColors.buttonText} />
            <Text style={styles.uploadLabel}>Upload</Text>
          </Pressable>
        </View>

        {images.length > 0 && (
          <View style={styles.imageCardsWrap}>
            {images.map((uri) => (
              <View key={uri} style={styles.imageCard}>
                <Image source={{ uri }} style={styles.imageThumb} />
                <Pressable
                  style={styles.removeImageBtn}
                  onPress={() => removeImage(uri)}
                >
                  <Ionicons name="close-circle" size={24} color={AppColors.button} />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
}

const CARD_BG = 'rgba(220, 252, 231, 0.12)';
const THUMB_SIZE = 100;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 },


  title: { fontSize: 22,
    fontWeight: '600',
    color: AppColors.fontColor,
    marginBottom: 20,
    marginTop: 40,
  },
  description: { fontSize: 16,
     color: AppColors.fontColor,
      marginBottom: 24,
       marginTop: 24,
        textAlign: 'center' },
        
  DropDownDescription: { fontSize: 16,
     color: AppColors.fontColor,
      marginBottom: 24,
       marginTop: 24,
        textAlign: 'center',
        fontWeight: '500',
       },
  
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: -10,
    borderWidth: 1,
    borderColor: 'rgba(220, 252, 231, 0.25)',
    shadowColor: 'yellow',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownText: { fontSize: 16, color: AppColors.fontColor },
  placeholder: { opacity: 0.7 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: AppColors.background,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(220, 252, 231, 0.25)',
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(220, 252, 231, 0.15)',
  },
  modalOptionText: { fontSize: 16, color: AppColors.fontColor },

  label: { fontSize: 16,
     fontWeight: '500',
      color: AppColors.fontColor,
       marginBottom: 8,
       marginTop: 40,
      textAlign: 'center',
     },
  
  descriptionInput: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: AppColors.fontColor,
    minHeight: 100,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(220, 252, 231, 0.25)',
    shadowColor: 'yellow',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadRow: { flexDirection: 'row',
     alignItems: 'center',
      gap: 12,
       marginBottom: 16,
       justifyContent: 'center',
       shadowColor: 'yellow',
      },
  uploadButton: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: CARD_BG,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(220, 252, 231, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'yellow',
  },
  uploadLabel: { fontSize: 12, color: AppColors.fontColor, marginTop: 4 },
  uploadHint: { fontSize: 14, color: AppColors.fontColor, opacity: 0.7 },
  imageCardsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  imageCard: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 16,
    backgroundColor: CARD_BG,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(220, 252, 231, 0.25)',
  },
  imageThumb: { width: '100%', height: '100%' },
  removeImageBtn: { position: 'absolute', top: 4, right: 4, backgroundColor: AppColors.background, borderRadius: 12 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, paddingTop: 8 },
});