import Constants from 'expo-constants';

import { krishnaSystemPrompt } from '../constants/krishnaSystemPrompt';
import { ChatMessage } from '../types';

type GeminiPart = {
  text: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  error?: {
    message?: string;
  };
};

function getGeminiApiKey(): string {
  const extra = Constants.expoConfig?.extra as { geminiApiKey?: string } | undefined;

  return extra?.geminiApiKey?.trim() ?? '';
}

export async function askKrishna(messages: ChatMessage[]): Promise<string> {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error('Gemini API key is missing. Add GEMINI_API_KEY to .env and restart Expo.');
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        body: JSON.stringify({
          contents: messages.map((message) => ({
            parts: [{ text: message.content }],
            role: message.role === 'assistant' ? 'model' : 'user',
          })),
          generationConfig: {
            responseMimeType: 'text/plain',
            temperature: 0.9,
          },
          system_instruction: {
            parts: [{ text: krishnaSystemPrompt }],
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        method: 'POST',
      }
    );

    const data = (await response.json()) as GeminiResponse;

    if (!response.ok) {
      throw new Error(data.error?.message ?? 'Gemini request failed.');
    }

    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join('\n')
      .trim();

    if (!text) {
      throw new Error('Gemini returned an empty response. Please try again.');
    }

    return text;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Network request failed')) {
        throw new Error('Network error while contacting Gemini. Check your internet connection.');
      }

      throw error;
    }

    throw new Error('Unable to reach Gemini right now. Please try again.');
  }
}
