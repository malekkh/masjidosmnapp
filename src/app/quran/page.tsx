import Link from "next/link";
import { BookOpen, ChevronLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SURAH_AYAHS, SURAH_NAMES } from "@/lib/quran-pages";

export default async function QuranPage() {
  const surahs = SURAH_NAMES.map((name, index) => ({
    number: index + 1,
    name,
    numberOfAyahs: SURAH_AYAHS[index],
  }));

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة للرئيسية
        </Link>
        <div className="mt-8 flex items-center justify-between gap-4">
          <h1 className="text-4xl font-black text-[var(--emerald-deep)]">القرآن الكريم</h1>
          <Link href="/quran/reader" className="flex shrink-0 items-center gap-2 rounded-xl bg-[var(--emerald)] px-4 py-3 text-sm font-bold text-white">
            <BookOpen size={18} /> قراءة المصحف
          </Link>
        </div>

        {surahs.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
            تعذّر جلب قائمة السور حاليًا، يرجى المحاولة لاحقًا.
          </p>
        ) : (
          <div className="mt-8 grid gap-3 pb-16 sm:grid-cols-2">
            {surahs.map((surah) => (
              <Link
                key={surah.number}
                href={`/quran/${surah.number}`}
                className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white p-5"
              >
                <span>
                  <strong className="block text-lg text-[var(--emerald-deep)]">
                    {surah.number}.  {surah.name}
                  </strong>
                  <small className="text-xs text-[var(--muted)]">
                    {surah.numberOfAyahs} آية
                  </small>
                </span>
                <ChevronLeft className="text-[var(--muted)]" size={18} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
