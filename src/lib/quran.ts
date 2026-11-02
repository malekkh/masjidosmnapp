const API_BASE = "https://api.alquran.cloud/v1";

export type SurahSummary = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

export type Ayah = {
  number: number;
  numberInSurah: number;
  text: string;
  page?: number;
};

export type SurahDetail = SurahSummary & {
  ayahs: Ayah[];
};

export type QuranPageAyah = Ayah & {
  surah: SurahSummary;
  numberInSurah: number;
  page: number;
  juz: number;
};

export type QuranPage = {
  number: number;
  ayahs: QuranPageAyah[];
  surahs: Record<string, SurahSummary>;
};

export async function getSurahList(): Promise<SurahSummary[]> {
  try {
    const response = await fetch(`${API_BASE}/surah`, { next: { revalidate: 86400 } });
    if (!response.ok) return [];
    const payload = await response.json();
    return payload?.data ?? [];
  } catch {
    return [];
  }
}

export async function getQuranPage(pageNumber: number): Promise<QuranPage | null> {
  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > 604) return null;

  try {
    const response = await fetch(`${API_BASE}/page/${pageNumber}/quran-uthmani`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) return null;

    const payload = await response.json();
    const data = payload?.data;
    if (!data) return null;

    return {
      number: data.number,
      ayahs: (data.ayahs ?? []).map((ayah: QuranPageAyah & { text: string }) => ({
        ...ayah,
        text: String(ayah.text).replace(/^\uFEFF/, "").normalize("NFC"),
      })),
      surahs: data.surahs ?? {},
    };
  } catch {
    return null;
  }
}

export async function getSurah(number: number): Promise<SurahDetail | null> {
  try {
    const response = await fetch(`${API_BASE}/surah/${number}/quran-uthmani`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) return null;
    const payload = await response.json();
    const data = payload?.data;
    if (!data) return null;

    return {
      number: data.number,
      name: data.name,
      englishName: data.englishName,
      englishNameTranslation: data.englishNameTranslation,
      numberOfAyahs: data.numberOfAyahs,
      revelationType: data.revelationType,
      ayahs: data.ayahs.map((ayah: { number: number; numberInSurah: number; text: string; page?: number }) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: String(ayah.text).replace(/^\uFEFF/, "").normalize("NFC"),
        page: ayah.page,
      })),
    };
  } catch {
    return null;
  }
}
