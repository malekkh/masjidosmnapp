const API_BASE = "https://www.hisnmuslim.com/api/ar";

// Only these categories are shown on the site: 27 = أذكار الصباح والمساء
// (the source bundles morning & evening into one category), 25 = الأذكار بعد السلام من الصلاة.
export const ADHKAR_CATEGORY_IDS = [27, 25];

export type AdhkarItem = {
  id: number;
  text: string;
  repeat: number;
  audio: string;
};

export type AdhkarCategory = {
  id: number;
  title: string;
  items: AdhkarItem[];
};

type RawItem = {
  ID: number;
  ARABIC_TEXT: string;
  REPEAT: number;
  AUDIO: string;
};

async function fetchCategory(id: number): Promise<AdhkarCategory | null> {
  try {
    const response = await fetch(`${API_BASE}/${id}.json`, { next: { revalidate: 86400 } });
    if (!response.ok) return null;

    const payload = await response.json();
    const title = Object.keys(payload)[0];
    const rawItems: RawItem[] = payload[title];
    if (!title || !Array.isArray(rawItems)) return null;

    return {
      id,
      title,
      items: rawItems.map((item) => ({
        id: item.ID,
        text: item.ARABIC_TEXT,
        repeat: item.REPEAT,
        audio: item.AUDIO,
      })),
    };
  } catch {
    return null;
  }
}

export async function getAdhkarCategories(): Promise<AdhkarCategory[]> {
  const results = await Promise.all(ADHKAR_CATEGORY_IDS.map(fetchCategory));
  return results.filter((category): category is AdhkarCategory => category !== null);
}

export async function getAdhkarCategory(id: number): Promise<AdhkarCategory | null> {
  if (!ADHKAR_CATEGORY_IDS.includes(id)) return null;
  return fetchCategory(id);
}
