export function normalizeArabic(text: string): string {
  return text
    .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627") // Alef variants → ا
    .replace(/\u0629/g, "\u0647")                      // ة → ه
    .replace(/\u0649/g, "\u064A")                      // ى → ي
    .replace(/\u0624/g, "\u0648")                      // ؤ → و
    .replace(/\u0640/g, "")                            // Remove kashida
    .replace(/[\u064B-\u065F]/g, "")                   // Remove tashkeel
    .replace(/\s+/g, " ")
    .trim();
}

export const isArabic = (t: string) =>
  (t.match(/[\u0600-\u06FF]/g) ?? []).length / (t.replace(/\s/g, "").length || 1) > 0.4;

export const countArabicChars = (t: string) =>
  (t.match(/[\u0600-\u06FF]/g) ?? []).length;
