import { AppColors } from '../../constants/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type TogglerValue = 'left' | 'right';

type TogglerProps = {
  leftLabel?: string;
  rightLabel?: string;
  value: TogglerValue;
  onValueChange: (value: TogglerValue) => void;
};

// Animation: higher stiffness = faster move, higher damping = less bounce
const SPRING_CONFIG = {
  damping: 100,
  stiffness: 200,
};

const PADDING = 8;

export default function Toggler({
  leftLabel = 'Seller',
  rightLabel = 'Buyer',
  value,
  onValueChange,
}: TogglerProps) {
  const isLeft = value === 'left';
  const progress = useSharedValue(isLeft ? 0 : 1);
  const segmentWidthSv = useSharedValue(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const segmentWidth = trackWidth > 0 ? (trackWidth - PADDING) / 2 : 0;

  // Animation runs here: withSpring drives progress (0 = left, 1 = right) on the UI thread
  useEffect(() => {
    progress.value = withSpring(isLeft ? 0 : 1, SPRING_CONFIG);
  }, [isLeft, progress]);

  useEffect(() => {
    segmentWidthSv.value = segmentWidth;
  }, [segmentWidth, segmentWidthSv]);

  // This runs every frame on the UI thread; progress.value updates → pill moves
  const pillAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateX: progress.value * segmentWidthSv.value }],
    };
  });

  return (
    <View
      style={styles.track}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
    >
      {segmentWidth > 0 && (
        <Animated.View
          style={[
            styles.pill,
            { width: segmentWidth },
            pillAnimatedStyle,
          ]}
          pointerEvents="none"
        />
      )}
      <Pressable
        style={[styles.segment, styles.segmentLeft]}
        onPress={() => onValueChange('left')}
      >
        <Text
          style={[
            styles.label,
            isLeft ? styles.labelSelected : styles.labelUnselected,
          ]}
        >
          {leftLabel}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.segment, styles.segmentRight]}
        onPress={() => onValueChange('right')}
      >
        <Text
          style={[
            styles.label,
            !isLeft ? styles.labelSelected : styles.labelUnselected,
          ]}
        >
          {rightLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: 'rgba(220, 252, 231, 0.35)',
    borderRadius: 30,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(20, 83, 45, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    alignSelf: 'center',
    position: 'relative',
  },
  pill: {
    position: 'absolute',
    left: 4,
    top: 4,
    bottom: 4,
    borderRadius: 26,
    backgroundColor: AppColors.button,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  segmentLeft: {
    marginRight: 2,
  },
  segmentRight: {
    marginLeft: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  labelSelected: {
    color: AppColors.buttonText,
  },
  labelUnselected: {
    color: 'rgba(20, 83, 45, 0.6)',
  },
});
