
export function truncateWord(
  word: string,
  maxLength: number = 10,
  truncationIndicator: string = "..."
): string {
  if (word.length <= maxLength) {
    return word;
  }


  const keepLength = maxLength - truncationIndicator.length;
 
  const safeKeepLength = Math.max(0, keepLength);

  return word.substring(0, safeKeepLength) + truncationIndicator;
}


export function truncateLongWords(
  text: string,
  maxWordLength: number = 10,
  truncationIndicator: string = "..."
): string {
  return text
    .split(/\s+/)
    .map(word => truncateWord(word, maxWordLength, truncationIndicator))
    .join(' ');
}