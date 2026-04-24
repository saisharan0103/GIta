import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MessageCircle } from 'lucide-react-native';

import { colors } from '../constants/colors';

type KrishnaEntryBarProps = {
  onPress: () => void;
};

export function KrishnaEntryBar({ onPress }: KrishnaEntryBarProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Talk with Krishna"
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <MessageCircle color={colors.saffron} size={20} strokeWidth={1.8} />
      </View>
      <View style={styles.copyWrap}>
        <Text style={styles.label}>Krishna Guidance</Text>
        <Text style={styles.text}>Talk with Krishna...</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.parchment,
    borderColor: colors.border,
    borderRadius: 26,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  copyWrap: {
    flex: 1,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(224, 181, 92, 0.14)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginRight: 12,
    width: 36,
  },
  label: {
    color: colors.saffron,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  pressed: {
    opacity: 0.74,
  },
  text: {
    color: colors.softText,
    fontSize: 16,
  },
});
