import { useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { artwork } from '../constants/artwork';
import { colors } from '../constants/colors';
import { useVerses } from '../hooks/useVerses';
import { Verse } from '../types';

const { height: screenHeight } = Dimensions.get('window');

type ReelItem = {
  id: string;
  image: (typeof artwork.reels)[number];
  verse: Verse;
};

export function ReelsScreen() {
  const verses = useVerses();
  const reels = useMemo<ReelItem[]>(
    () =>
      artwork.reels
        .map((image, index) => {
          const verse = verses[index];

          if (!verse) {
            return null;
          }

          return {
            id: `reel-${index}`,
            image,
            verse,
          };
        })
        .filter((item): item is ReelItem => Boolean(item)),
    [verses]
  );

  const renderItem: ListRenderItem<ReelItem> = ({ item }) => (
    <ImageBackground imageStyle={styles.slideImage} source={item.image} style={styles.slide}>
      <View style={styles.overlay}>
        <Text style={styles.reelBadge}>Sacred Reel</Text>
        <View style={styles.textBlock}>
          <Text style={styles.sanskrit}>{item.verse.sanskrit}</Text>
          <Text style={styles.meaning}>{item.verse.meaning}</Text>
        </View>
        <Text style={styles.reference}>
          {item.verse.chapter}.{item.verse.verse}
        </Text>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        pagingEnabled
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  meaning: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 34,
    marginTop: 18,
  },
  overlay: {
    backgroundColor: colors.overlayStrong,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 34,
    paddingHorizontal: 24,
    paddingTop: 22,
  },
  reelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(247, 240, 226, 0.16)',
    borderColor: 'rgba(224, 181, 92, 0.55)',
    borderRadius: 999,
    borderWidth: 1,
    color: colors.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 7,
    textTransform: 'uppercase',
  },
  reference: {
    alignSelf: 'flex-end',
    color: colors.gold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  safeArea: {
    backgroundColor: colors.midnight,
    flex: 1,
  },
  sanskrit: {
    color: colors.parchment,
    fontSize: 18,
    lineHeight: 30,
    opacity: 0.9,
  },
  slide: {
    height: screenHeight,
    justifyContent: 'flex-end',
  },
  slideImage: {
    resizeMode: 'cover',
  },
  textBlock: {
    marginTop: 'auto',
  },
});
