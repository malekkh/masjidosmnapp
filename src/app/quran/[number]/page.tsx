import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AyahMarker from "@/components/AyahMarker";
import { getSurah } from "@/lib/quran";
import { amiriQuran, toEasternArabicNumerals } from "@/lib/fonts";

export default async function SurahPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const surahNumber = Number(number);

  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  const surah = await getSurah(surahNumber);
  if (!surah) notFound();

  return (
    <main className="min-h-screen bg-[#f7f3ea]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/quran" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة إلى فهرس السور
        </Link>

        {/* Surah header — Mushaf-style title cartouche */}
        <div className="relative mx-auto mt-8 overflow-hidden rounded-2xl border-2 border-[var(--amber)]/50 bg-gradient-to-b from-[#fbf3e2] to-[#fffdf8] px-6 py-8 text-center shadow-sm">
          <p className="text-xs font-bold tracking-[0.35em] text-[var(--amber)]">
            {surah.revelationType === "Meccan" ? "مكية" : "مدنية"} · {toEasternArabicNumerals(surah.numberOfAyahs)} آية
          </p>
          <h1 className={`${amiriQuran.className} mt-4 text-4xl leading-relaxed text-[var(--emerald-deep)] sm:text-5xl`}>
            ﴿  {surah.name} ﴾
          </h1>
          <p className="mt-2 text-xs text-[var(--muted)]">{surah.englishName} · {surah.englishNameTranslation}</p>
        </div>

        {/* Mushaf page — continuous justified ayah flow */}
        <div className="relative mx-auto mt-8 mb-16 rounded-[1.75rem] border border-[var(--amber)]/30 bg-[#fffdf8] px-6 py-10 shadow-sm sm:px-12 sm:py-14">
          <div className="mb-8 h-px bg-gradient-to-l from-transparent via-[var(--amber)]/50 to-transparent" />

          <p
            dir="rtl"
            className={`${amiriQuran.className} text-justify text-[1.9rem] leading-[3.4rem] tracking-normal text-[var(--emerald-deep)] sm:text-[2.2rem] sm:leading-[4rem]`}
          >
            {surah.ayahs.map((ayah) => (
              <span key={ayah.number}>
                {ayah.text}
                <AyahMarker number={ayah.numberInSurah} />{" "}
              </span>
            ))}
          </p>

          <div className="mt-8 h-px bg-gradient-to-l from-transparent via-[var(--amber)]/50 to-transparent" />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
