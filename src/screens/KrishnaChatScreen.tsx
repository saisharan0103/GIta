import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useMemo, useRef, useState } from 'react';

import { ChatBubble } from '../components/ChatBubble';
import { artwork } from '../constants/artwork';
import { colors } from '../constants/colors';
import { askKrishna } from '../services/gemini';
import { ChatMessage } from '../types';

export function KrishnaChatScreen() {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const emptyState = useMemo(
    () => (
      <ImageBackground imageStyle={styles.heroImage} source={artwork.hero} style={styles.hero}>
        <View style={styles.heroOverlay}>
          <Text style={styles.title}>Krishna</Text>
          <Text style={styles.body}>Share what is on your mind.</Text>
        </View>
      </ImageBackground>
    ),
    []
  );

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = draft.trim();

    if (!trimmed || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      content: trimmed,
      id: `${Date.now()}`,
      role: 'user',
    };

    const nextMessages = [...messages, userMessage];

    setDraft('');
    setError(null);
    setIsSending(true);
    setMessages(nextMessages);
    scrollToEnd();

    try {
      const reply = await askKrishna(nextMessages);

      setMessages((current) => [
        ...current,
        {
          content: reply,
          id: `${Date.now()}-assistant`,
          role: 'assistant',
        },
      ]);
      scrollToEnd();
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Unable to send message right now.');
    } finally {
      setIsSending(false);
    }
  }, [draft, isSending, messages, scrollToEnd]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <FlatList
          contentContainerStyle={styles.messagesContent}
          data={messages}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={emptyState}
          ref={listRef}
          renderItem={({ item }) => <ChatBubble message={item} />}
          showsVerticalScrollIndicator={false}
        />
        {isSending ? <Text style={styles.typing}>Krishna is reflecting...</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.inputWrap}>
          <TextInput
            editable={!isSending}
            multiline
            onChangeText={setDraft}
            placeholder="Share what's on your mind."
            placeholderTextColor={colors.mutedText}
            style={styles.input}
            value={draft}
          />
          <Pressable
            accessibilityLabel="Send message"
            disabled={!draft.trim() || isSending}
            onPress={handleSend}
            style={({ pressed }) => [
              styles.sendButton,
              (!draft.trim() || isSending) && styles.sendButtonDisabled,
              pressed && draft.trim() && !isSending ? styles.sendButtonPressed : null,
            ]}
          >
            <Text style={styles.sendLabel}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.parchment,
    fontSize: 16,
    lineHeight: 24,
  },
  container: {
    flex: 1,
  },
  error: {
    color: '#A33B2B',
    fontSize: 14,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  hero: {
    height: 280,
    marginBottom: 16,
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
    flex: 1,
    fontSize: 16,
    maxHeight: 120,
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputWrap: {
    alignItems: 'flex-end',
    backgroundColor: colors.parchment,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 16,
    paddingRight: 10,
  },
  messagesContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  safeArea: {
    backgroundColor: colors.cream,
    flex: 1,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: colors.deepBlue,
    borderRadius: 18,
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
    width: 64,
  },
  sendButtonDisabled: {
    backgroundColor: colors.mutedText,
    opacity: 0.5,
  },
  sendButtonPressed: {
    opacity: 0.82,
  },
  sendLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
  },
  typing: {
    color: colors.mutedText,
    fontSize: 14,
    marginBottom: 8,
    marginHorizontal: 20,
  },
});
