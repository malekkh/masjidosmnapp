"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { AdhkarCategory } from "@/lib/adhkar";

export default function AdhkarCategorySearch({ categories }: { categories: AdhkarCategory[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("ar");
  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return categories;

    return categories.filter((category) =>
      category.title.toLocaleLowerCase("ar").includes(normalizedQuery) ||
      category.items.some((item) => item.text.toLocaleLowerCase("ar").includes(normalizedQuery))
    );
  }, [categories, normalizedQuery]);

  return (
    <>
      <label className="mt-8 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-[var(--muted)]">
        <Search size={19} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="ابحث في الأذكار"
          placeholder="ابحث في الأذكار أو التصنيفات..."
          className="w-full bg-transparent text-sm text-[var(--emerald-deep)] outline-none placeholder:text-[var(--muted)]"
        />
      </label>

      {filteredCategories.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
          لا توجد نتائج مطابقة لبحثك.
        </p>
      ) : (
        <div className="mt-6 space-y-3 pb-16">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/adhkar/${category.id}`}
              className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white p-5"
            >
              <span>
                <strong className="block text-base text-[var(--emerald-deep)]">{category.title}</strong>
                <small className="text-xs text-[var(--muted)]">{category.items.length} ذكر</small>
              </span>
              <span className="text-[var(--muted)]">←</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
