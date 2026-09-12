import Link from "next/link";
import { BookOpen, ChevronLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSurahList } from "@/lib/quran";

export default async function QuranPage() {
  const surahs = await getSurahList();

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة للرئيسية
        </Link>
        <div className="mt-8 flex items-center justify-between">
          <h1 className="text-4xl font-black text-[var(--emerald-deep)]">القرآن الكريم</h1>
          <BookOpen className="text-[var(--emerald)]" size={40} />
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
                    {surah.numberOfAyahs} آية · {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
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
