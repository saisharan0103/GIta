import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { ChatMessage } from '../types';

type ChatBubbleProps = {
  message: ChatMessage;
};

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
      <Text style={[styles.text, isUser ? styles.userText : styles.assistantText]}>
        {message.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.parchment,
    borderColor: colors.border,
    borderWidth: 1,
  },
  assistantText: {
    color: colors.softText,
  },
  bubble: {
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '82%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 23,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.deepBlue,
  },
  userText: {
    color: colors.white,
  },
});
