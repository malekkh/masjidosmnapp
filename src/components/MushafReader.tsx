"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, ChevronLeft, ChevronRight, Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PROGRESS_KEY = "quran:last-read-page";
const BOOKMARKS_KEY = "quran:bookmarks";
const LAST_ALLOWED_ZOOM = 2.5;

function pagePath(page: number) {
  return `/quran/pages/${String(page).padStart(3, "0")}.webp`;
}

function safePage(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(604, Math.max(1, Math.trunc(value)));
}

export default function MushafReader({ initialPage = 1, restoreProgress = true }: { initialPage?: number; restoreProgress?: boolean }) {
  const [page, setPage] = useState(safePage(initialPage));
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [pageInput, setPageInput] = useState(String(safePage(initialPage)));
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    [page - 1, page + 1].forEach((nearbyPage) => {
      if (nearbyPage < 1 || nearbyPage > 604) return;
      const preloader = new window.Image();
      preloader.src = pagePath(nearbyPage);
    });
  }, [page]);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = localStorage.getItem(PROGRESS_KEY);
      const restored = stored ? Number(stored) : null;
      if (restoreProgress && restored && Number.isInteger(restored)) {
        const safe = safePage(restored);
        setPage(safe);
        setPageInput(String(safe));
        setIsImageLoading(true);
        setImageError(false);
      }

      try {
        const saved = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) ?? "[]");
        if (Array.isArray(saved)) setBookmarks(saved.filter((value) => Number.isInteger(value)).map(safePage));
      } catch {
        localStorage.removeItem(BOOKMARKS_KEY);
      }
    });
  }, [initialPage, restoreProgress]);

  function navigate(nextPage: number) {
    const safe = safePage(nextPage);
    setPage(safe);
    setPageInput(String(safe));
    setZoom(1);
    setImageError(false);
    setIsImageLoading(true);
    localStorage.setItem(PROGRESS_KEY, String(safe));
    window.history.replaceState(null, "", `/quran/reader?page=${safe}`);
  }

  function saveBookmark() {
    const next = bookmarks.includes(page) ? bookmarks.filter((value) => value !== page) : [...bookmarks, page].sort((a, b) => a - b);
    setBookmarks(next);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
  }

  function jumpToPage() {
    navigate(Number(pageInput));
  }

  function handleTouchEnd(clientX: number) {
    if (touchStart.current === null || zoom > 1) return;
    const distance = clientX - touchStart.current;
    if (Math.abs(distance) > 55) navigate(page + (distance < 0 ? -1 : 1));
    touchStart.current = null;
  }

  return (
    <main className="fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-hidden bg-[#ede7d8]">
      <header className="z-20 flex min-h-14 items-center gap-2 border-b border-[#d0b98a] bg-[#fffaf0] px-3 py-2 sm:px-5">
        <Link href="/quran" className="rounded-lg border border-[#d8c49a] px-3 py-2 text-sm font-bold text-[var(--emerald-deep)]">
          فهرس السور
        </Link>

        <div className="mx-auto flex items-center gap-1">
          <button type="button" onClick={() => navigate(page - 1)} disabled={page === 1} className="grid h-10 w-10 place-items-center rounded-lg border border-[#d8c49a] disabled:opacity-35" aria-label="الصفحة السابقة">
            <ChevronRight size={20} />
          </button>
          <label className="flex items-center gap-1 text-sm font-bold text-[var(--emerald-deep)]">
            <input
              value={pageInput}
              onChange={(event) => setPageInput(event.target.value.replace(/[^0-9]/g, ""))}
              onBlur={jumpToPage}
              onKeyDown={(event) => { if (event.key === "Enter") { event.currentTarget.blur(); } }}
              inputMode="numeric"
              aria-label="رقم الصفحة"
              className="h-10 w-14 rounded-lg border border-[#d8c49a] bg-white text-center"
            />
            <span>/ 604</span>
          </label>
          <button type="button" onClick={() => navigate(page + 1)} disabled={page === 604} className="grid h-10 w-10 place-items-center rounded-lg border border-[#d8c49a] disabled:opacity-35" aria-label="الصفحة التالية">
            <ChevronLeft size={20} />
          </button>
        </div>

        <button type="button" onClick={saveBookmark} aria-label={bookmarks.includes(page) ? "إزالة العلامة" : "حفظ علامة مرجعية"} className={`grid h-10 w-10 place-items-center rounded-lg border ${bookmarks.includes(page) ? "border-[#b98a43] bg-[#f4e7c7] text-[#8a642c]" : "border-[#d8c49a] text-[var(--emerald-deep)]"}`}>
          <Bookmark size={19} fill={bookmarks.includes(page) ? "currentColor" : "none"} />
        </button>
      </header>

      <section
        className="relative min-h-0 flex-1 overflow-auto"
        onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      >
        <div className="flex min-h-full w-full items-center justify-center p-2 sm:p-4">
          <div
            className="relative aspect-[3/4.5] w-full max-w-[720px] origin-center overflow-hidden border border-[#b98a43]/60 bg-[#fffdf7] shadow-[0_10px_35px_rgba(85,65,35,0.18)] transition-transform duration-150"
            style={{ transform: `scale(${zoom})` }}
          >
            {!imageError ? (
              <>
                <Image
                  key={page}
                  src={pagePath(page)}
                  alt={`صفحة القرآن رقم ${page}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className={`object-contain transition-opacity duration-150 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                  priority={page === 1}
                  loading={page === 1 ? "eager" : "lazy"}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => {
                    setIsImageLoading(false);
                    setImageError(true);
                  }}
                />
                {isImageLoading && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-[#fffdf7]" role="status" aria-label={`جاري تحميل صفحة القرآن رقم ${page}`}>
                    <div className="flex flex-col items-center gap-3 text-[#8a642c]">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#d8c49a] border-t-[#9b783d]" />
                      <span className="text-xs font-bold">جاري تحميل الصفحة {page}</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-sm font-bold text-[#7a5d35]">
                <div>
                  <p>صورة صفحة القرآن غير متوفرة.</p>
                  <p dir="ltr" className="mt-2 text-xs">Place {String(page).padStart(3, "0")}.webp in public/quran/pages/</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="z-20 flex min-h-14 items-center justify-between gap-2 border-t border-[#d0b98a] bg-[#fffaf0] px-3 py-2 sm:px-5">
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.25))} disabled={zoom === 1} className="grid h-9 w-9 place-items-center rounded-lg border border-[#d8c49a] disabled:opacity-35" aria-label="تصغير"><Minus size={18} /></button>
          <span className="min-w-12 text-center text-xs font-bold text-[var(--emerald-deep)]">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => setZoom((value) => Math.min(LAST_ALLOWED_ZOOM, value + 0.25))} disabled={zoom >= LAST_ALLOWED_ZOOM} className="grid h-9 w-9 place-items-center rounded-lg border border-[#d8c49a] disabled:opacity-35" aria-label="تكبير"><Plus size={18} /></button>
          <button type="button" onClick={() => setZoom(1)} className="ml-1 grid h-9 w-9 place-items-center rounded-lg border border-[#d8c49a]" aria-label="إعادة ضبط التكبير"><RotateCcw size={16} /></button>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex max-w-[55vw] items-center gap-1 overflow-x-auto" aria-label="العلامات المرجعية">
            {bookmarks.map((savedPage) => (
              <button key={savedPage} type="button" onClick={() => navigate(savedPage)} className={`h-8 min-w-9 rounded-lg px-2 text-xs font-bold ${savedPage === page ? "bg-[var(--emerald)] text-white" : "border border-[#d8c49a] bg-white text-[var(--emerald-deep)]"}`}>
                {savedPage}
              </button>
            ))}
          </div>
        )}
      </footer>
    </main>
  );
}
