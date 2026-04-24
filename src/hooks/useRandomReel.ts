import { useMemo } from 'react';

import { calcDuration } from '../utils/reelTiming';
import { useVerses } from './useVerses';

export function useRandomReel() {
  const verses = useVerses();

  return useMemo(() => {
    const verse = verses[0];

    if (!verse) {
      return null;
    }

    return {
      audioSrc: null,
      durationSec: calcDuration(verse.meaning),
      imageSrc: null,
      verse,
    };
  }, [verses]);
}
