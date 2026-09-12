"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import Spinner from "@/components/Spinner";
import AnswerText from "@/components/AnswerText";
import type { Question } from "@/lib/types";

const CATEGORIES = ["عام", "عقيدة", "عبادات", "معاملات", "أسرة"];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ar", { dateStyle: "medium" }).format(new Date(iso));
}

function cacheKey(q: string, category: string) {
  return `${q.trim()}::${category}`;
}

export default function SelectedAnswers() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [results, setResults] = useState<Question[]>([]);
  const cacheRef = useRef<Map<string, Question[]>>(new Map());
  const hasFetchedRef = useRef(false);

  const fetchAnswers = useCallback(async (q: string, cat: string) => {
    const key = cacheKey(q, cat);
    const cached = cacheRef.current.get(key);
    if (cached) {
      setResults(cached);
      setStatus("idle");
      return;
    }

    setStatus("loading");
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (cat) params.set("category", cat);

      const response = await fetch(`/api/fatawa/answers?${params.toString()}`);
      if (!response.ok) throw new Error("request failed");

      const data: Question[] = await response.json();
      cacheRef.current.set(key, data);
      setResults(data);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  function handleToggle() {
    setOpen((value) => {
      const next = !value;
      if (next && !hasFetchedRef.current) {
        hasFetchedRef.current = true;
        fetchAnswers(query, category);
      }
      return next;
    });
  }

  function handleSearchSubmit(event: React.FormEvent) {
    event.preventDefault();
    fetchAnswers(query, category);
  }

  return (
    <section>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls="selected-answers-panel"
        className="flex w-full items-center justify-between text-right"
      >
        <h2 className="text-2xl font-black text-[var(--emerald-deep)]">إجابات مختارة</h2>
        {open ? (
          <ChevronUp className="text-[var(--muted)]" size={20} />
        ) : (
          <ChevronDown className="text-[var(--muted)]" size={20} />
        )}
      </button>

      {open && (
        <div id="selected-answers-panel" className="mt-5">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث في الأسئلة..."
                className="w-full rounded-xl border border-[var(--line)] bg-white py-2.5 pr-9 pl-3 text-sm"
              />
            </div>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-xl border border-[var(--line)] bg-white px-3 text-sm"
            >
              <option value="">كل التصنيفات</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 rounded-xl bg-[var(--emerald)] px-4 text-sm font-bold text-white disabled:opacity-60"
            >
              {status === "loading" ? <Spinner size={16} /> : "بحث"}
            </button>
          </form>

          {status === "loading" && (
            <div className="mt-5 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))}
            </div>
          )}

          {status === "error" && (
            <p className="mt-6 rounded-2xl border border-dashed border-red-200 p-8 text-center text-sm text-red-600">
              تعذّر جلب الإجابات، يرجى المحاولة مجددًا.
            </p>
          )}

          {status === "idle" &&
            (results.length === 0 ? (
              <p className="mt-6 rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
                لا توجد إجابات مطابقة حاليًا.
              </p>
            ) : (
              <div className="mt-5 space-y-4">
                {results.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-[var(--line)] bg-white p-6">
                    <span className="text-xs font-bold text-[var(--emerald)]">{item.category}</span>
                    <h3 className="mt-2 font-bold text-[var(--emerald-deep)]">
                      <Link href={`/fatawa/${item.id}`} className="hover:underline">
                        {item.question}
                      </Link>
                    </h3>
                    <AnswerText text={item.answer ?? ""} className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--muted)]" />
                    {item.answered_at && (
                      <p className="mt-3 text-xs text-[var(--muted)]">{formatDate(item.answered_at)}</p>
                    )}
                  </article>
                ))}
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
