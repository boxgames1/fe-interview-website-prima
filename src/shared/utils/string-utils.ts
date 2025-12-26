export function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

export function matchesSearch(query: string, text: string): boolean {
  const normalizedQuery = normalizeString(query);
  const normalizedText = normalizeString(text);
  return normalizedText.includes(normalizedQuery);
}

