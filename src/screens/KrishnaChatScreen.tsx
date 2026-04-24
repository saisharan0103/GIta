import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { artwork } from '../constants/artwork';
import { colors } from '../constants/colors';

export function KrishnaChatScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ImageBackground imageStyle={styles.heroImage} source={artwork.hero} style={styles.hero}>
          <View style={styles.heroOverlay}>
            <Text style={styles.title}>Krishna</Text>
            <Text style={styles.body}>Share what is on your mind.</Text>
          </View>
        </ImageBackground>
        <View style={styles.inputWrap}>
          <TextInput
            editable={false}
            placeholder="Chat setup comes next..."
            placeholderTextColor={colors.mutedText}
            style={styles.input}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  hero: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
  },
  heroImage: {
    borderRadius: 28,
  },
  heroOverlay: {
    backgroundColor: colors.overlayStrong,
    borderRadius: 28,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  input: {
    color: colors.softText,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 16,
  },
  inputWrap: {
    backgroundColor: colors.parchment,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  safeArea: {
    backgroundColor: colors.cream,
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
  },
});
