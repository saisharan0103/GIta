import { ImageBackground, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { Verse } from '../types';

type ReelProps = {
  bottomOffset: number;
  height: number;
  image: ImageSourcePropType;
  topOffset: number;
  verse: Verse;
};

export function Reel({ bottomOffset, height, image, topOffset, verse }: ReelProps) {
  return (
    <ImageBackground imageStyle={styles.image} source={image} style={[styles.container, { height }]}>
      <View style={[styles.overlay, { paddingBottom: bottomOffset, paddingTop: topOffset }]}>
        <View style={styles.textBlock}>
          <Text style={styles.sanskrit}>{verse.sanskrit}</Text>
          <Text style={styles.meaning}>{verse.meaning}</Text>
        </View>
        <Text style={styles.reference}>
          {verse.chapter}.{verse.verse}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.midnight,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  meaning: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 34,
    marginTop: 20,
  },
  overlay: {
    backgroundColor: colors.overlayStrong,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  reference: {
    color: colors.saffron,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 24,
    textAlign: 'right',
  },
  sanskrit: {
    color: colors.parchment,
    fontSize: 18,
    lineHeight: 30,
    opacity: 0.92,
  },
  textBlock: {
    marginTop: 'auto',
  },
});
