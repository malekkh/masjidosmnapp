const API_BASE = "https://www.hisnmuslim.com/api/ar";
const MAX_CATEGORY_ID = 140;
const BATCH_SIZE = 20;

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
  const categories: AdhkarCategory[] = [];

  for (let start = 1; start <= MAX_CATEGORY_ID; start += BATCH_SIZE) {
    const ids = Array.from({ length: BATCH_SIZE }, (_, index) => start + index).filter(
      (id) => id <= MAX_CATEGORY_ID
    );
    const results = await Promise.all(ids.map(fetchCategory));
    for (const category of results) {
      if (!category || category.items.length === 0) continue;

      const uniqueItems = new Map<string, AdhkarItem>();
      for (const item of category.items) {
        const key = item.text.trim().replace(/\s+/g, " ");
        if (!uniqueItems.has(key)) uniqueItems.set(key, item);
      }

      categories.push({ ...category, items: [...uniqueItems.values()] });
    }
  }

  const uniqueCategories = new Map<number, AdhkarCategory>();
  for (const category of categories) {
    if (!uniqueCategories.has(category.id)) uniqueCategories.set(category.id, category);
  }

  return [...uniqueCategories.values()].sort((a, b) => a.id - b.id);
}

export async function getAdhkarCategory(id: number): Promise<AdhkarCategory | null> {
  return fetchCategory(id);
}
