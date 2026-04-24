export function calcDuration(meaning: string): number {
  const wordCount = meaning.trim().split(/\s+/).filter(Boolean).length;

  return Math.ceil(wordCount / 3 + 5);
}
