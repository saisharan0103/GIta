import { useCallback, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { artwork } from '../constants/artwork';
import { colors } from '../constants/colors';
import { Reel } from '../components/Reel';
import { useVerses } from '../hooks/useVerses';
import { Verse } from '../types';

type ReelItem = {
  id: string;
  image: (typeof artwork.reels)[number];
  verse: Verse;
};

export function ReelsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
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

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { changed: ViewToken<ReelItem>[]; viewableItems: ViewToken<ReelItem>[] }) => {
      const nextItem = viewableItems.find((item) => item.isViewable && item.index != null);

      if (nextItem?.index != null) {
        setActiveIndex(nextItem.index);
      }
    }
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const nextHeight = Math.round(event.nativeEvent.layout.height);

      if (nextHeight > 0 && nextHeight !== viewportHeight) {
        setViewportHeight(nextHeight);
      }
    },
    [viewportHeight]
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<ReelItem> | null | undefined, index: number) => ({
      index,
      length: viewportHeight,
      offset: viewportHeight * index,
    }),
    [viewportHeight]
  );

  const renderItem: ListRenderItem<ReelItem> = useCallback(
    ({ item }) => (
      <Reel
        bottomOffset={tabBarHeight + insets.bottom + 20}
        height={viewportHeight}
        image={item.image}
        topOffset={insets.top + 20}
        verse={item.verse}
      />
    ),
    [insets.bottom, insets.top, tabBarHeight, viewportHeight]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View onLayout={handleLayout} style={styles.container}>
        {viewportHeight > 0 ? (
          <FlatList
            data={reels}
            decelerationRate="fast"
            disableIntervalMomentum
            extraData={activeIndex}
            getItemLayout={getItemLayout}
            initialNumToRender={2}
            keyExtractor={(item) => item.id}
            maxToRenderPerBatch={2}
            onViewableItemsChanged={onViewableItemsChanged.current}
            overScrollMode="never"
            removeClippedSubviews
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={viewportHeight}
            viewabilityConfig={viewabilityConfig.current}
            windowSize={3}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: colors.midnight,
    flex: 1,
  },
});
