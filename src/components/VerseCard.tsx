import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { Verse } from '../types';

type VerseCardProps = {
  verse: Verse;
};

export function VerseCard({ verse }: VerseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.theme}>{verse.theme.replace(/-/g, ' ')}</Text>
        <View style={styles.divider} />
      </View>
      <Text style={styles.meaning}>{verse.meaning}</Text>
      <Text style={styles.reference}>
        {verse.chapter}.{verse.verse}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 18,
    shadowColor: colors.midnight,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  divider: {
    backgroundColor: colors.border,
    flex: 1,
    height: 1,
    marginLeft: 12,
  },
  meaning: {
    color: colors.softText,
    fontSize: 17,
    lineHeight: 27,
  },
  reference: {
    alignSelf: 'flex-end',
    color: colors.saffron,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 14,
  },
  theme: {
    color: colors.mutedText,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
  },
});
