import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KrishnaEntryBar } from '../components/KrishnaEntryBar';
import { VerseCard } from '../components/VerseCard';
import { artwork } from '../constants/artwork';
import { colors } from '../constants/colors';
import { useVerses } from '../hooks/useVerses';
import { RootStackParamList, Verse } from '../types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const verses = useVerses();
  const navigation = useNavigation<Navigation>();

  const renderVerse = ({ item }: { item: Verse }) => <VerseCard verse={item} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <View>
            <ImageBackground imageStyle={styles.heroImage} source={artwork.hero} style={styles.hero}>
              <View style={styles.heroOverlay}>
                <Text style={styles.eyebrow}>Bhagavad Gita</Text>
                <Text style={styles.title}>
                  A quieter space for verse, reflection, and Krishna-inspired guidance.
                </Text>
              </View>
            </ImageBackground>
            <KrishnaEntryBar onPress={() => navigation.navigate('KrishnaChat')} />
            <Text style={styles.sectionLabel}>Daily Verses</Text>
          </View>
        }
        contentContainerStyle={styles.content}
        data={verses}
        keyExtractor={(item) => item.id}
        renderItem={renderVerse}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 30,
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  hero: {
    borderRadius: 30,
    height: 264,
    marginBottom: 18,
    overflow: 'hidden',
  },
  heroImage: {
    borderRadius: 30,
    transform: [{ translateY: 18 }],
  },
  heroOverlay: {
    backgroundColor: colors.overlayStrong,
    borderRadius: 30,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  safeArea: {
    backgroundColor: colors.cream,
    flex: 1,
  },
  sectionLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 16,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
});
