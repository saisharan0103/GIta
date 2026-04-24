import { useMemo } from 'react';

import gita from '../../assets/data/gita.json';
import { Verse } from '../types';
import { shuffle } from '../utils/shuffle';

const verses: Verse[] = gita;

export function useVerses(): Verse[] {
  return useMemo(() => shuffle(verses), []);
}
