"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Spinner from "@/components/Spinner";
import CopyLinkButton from "@/components/CopyLinkButton";
import type { Question } from "@/lib/types";

function truncate(text: string, max: number) {
  const trimmed = text.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max).trim()}…` : trimmed;
}

export default function FatwaReferenceSearch({ onInsert }: { onInsert: (label: string, id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [results, setResults] = useState<Question[]>([]);
  const [searched, setSearched] = useState(false);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;

    setStatus("loading");
    try {
      const params = new URLSearchParams({ q: query.trim() });
      const response = await fetch(`/api/fatawa/answers?${params.toString()}`);
      if (!response.ok) throw new Error("request failed");
      const data: Question[] = await response.json();
      setResults(data);
      setSearched(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-xl border border-dashed border-[var(--line)] p-3">
      <button type="button" onClick={() => setOpen((value) => !value)} className="text-sm font-bold text-[var(--emerald)]">
        {open ? "إخفاء البحث عن فتوى سابقة" : "+ أرفق فتوى سابقة كمرجع"}
      </button>

      {open && (
        <div className="mt-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={14} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث عن فتوى سابقة بنص السؤال..."
                className="w-full rounded-lg border border-[var(--line)] bg-white py-2 pr-8 pl-3 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center rounded-lg bg-[var(--emerald)] px-3 text-sm font-bold text-white disabled:opacity-60"
            >
              {status === "loading" ? <Spinner size={14} /> : "بحث"}
            </button>
          </form>

          {status === "error" && <p className="mt-3 text-xs font-bold text-red-600">تعذّر البحث، حاول مجددًا.</p>}

          {searched &&
            status === "idle" &&
            (results.length === 0 ? (
              <p className="mt-3 text-xs text-[var(--muted)]">لا توجد نتائج مطابقة.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {results.map((item) => (
                  <li key={item.id} className="rounded-lg bg-[#f7faf8] p-3">
                    <span className="text-[11px] font-bold text-[var(--emerald)]">{item.category}</span>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-[var(--emerald-deep)]">{item.question}</p>
                    {item.answer && (
                      <p className="mt-1 line-clamp-1 text-xs text-[var(--muted)]">{item.answer}</p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onInsert(truncate(item.question, 80), item.id)}
                        className="rounded-lg bg-[var(--emerald)] px-3 py-1.5 text-xs font-bold text-white"
                      >
                        إدراج كمرجع
                      </button>
                      <CopyLinkButton
                        path={`/fatawa/${item.id}`}
                        className="flex items-center gap-1 rounded-lg border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--muted)]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      )}
    </div>
  );
}
