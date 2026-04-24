import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { Verse } from '../types';

type ReelProps = {
  verse: Verse;
};

export function Reel({ verse }: ReelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sanskrit}>{verse.sanskrit}</Text>
      <Text style={styles.meaning}>{verse.meaning}</Text>
      <Text style={styles.reference}>
        {verse.chapter}.{verse.verse}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.deepBlue,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  meaning: {
    color: colors.white,
    fontSize: 22,
    lineHeight: 32,
    marginTop: 20,
  },
  reference: {
    color: colors.saffron,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 24,
    textAlign: 'right',
  },
  sanskrit: {
    color: colors.cream,
    fontSize: 17,
    lineHeight: 27,
    opacity: 0.78,
  },
});
