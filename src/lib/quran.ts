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
};

export type SurahDetail = SurahSummary & {
  ayahs: Ayah[];
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
      ayahs: data.ayahs.map((ayah: { number: number; numberInSurah: number; text: string }) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
      })),
    };
  } catch {
    return null;
  }
}
