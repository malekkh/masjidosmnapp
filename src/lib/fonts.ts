import { Amiri_Quran, Scheherazade_New } from "next/font/google";

export const amiriQuran = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-amiri-quran",
});

// Used for the "رضي الله عنه" ligature glyph (U+FD41) — same font family
// used for it on the mosque's own site, since not all Arabic fonts include this glyph.
export const scheherazadeNew = Scheherazade_New({
  weight: "700",
  subsets: ["arabic"],
  variable: "--font-scheherazade-new",
});

const EASTERN_ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toEasternArabicNumerals(value: number) {
  return String(value).replace(/[0-9]/g, (digit) => EASTERN_ARABIC_DIGITS[Number(digit)]);
}
