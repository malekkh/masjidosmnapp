import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AyahMarker from "@/components/AyahMarker";
import { getQuranPage, getSurah } from "@/lib/quran";
import { amiriQuran, toEasternArabicNumerals } from "@/lib/fonts";

function MushafOrnament({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={`h-14 w-[4.5rem] text-[#20235c] sm:h-16 sm:w-[5.5rem] ${mirrored ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M4 40h18l10-10 8 10 8-10 12 10-12 10-8-10-8 10-10-10H4" />
        <path d="M60 4v72M48 40h24l-12-12zm0 0 12 12zm24 0L60 28zm0 0L60 52z" />
        <circle cx="60" cy="40" r="5" />
        <path d="M60 4c8 8 8 14 0 22M60 76c-8-8-8-14 0-22M48 40c-8-8-14-8-22 0M72 40c8 8 14 8 22 0" />
        <circle cx="22" cy="40" r="2" fill="currentColor" />
        <circle cx="98" cy="40" r="2" fill="currentColor" />
      </g>
    </svg>
  );
}

export default async function SurahPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const surahNumber = Number(number);

  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  const surah = await getSurah(surahNumber);
  if (!surah) notFound();

  const pageNumbers = [...new Set(surah.ayahs.map((ayah) => ayah.page).filter((page): page is number => Number.isInteger(page)))]
    .sort((a, b) => a - b);

  const pages = pageNumbers.length
    ? (await Promise.all(pageNumbers.map((page) => getQuranPage(page)))).filter((page) => page !== null)
    : [];

  const firstGlobalAyah = surah.ayahs[0]?.number;
  const lastGlobalAyah = surah.ayahs[surah.ayahs.length - 1]?.number;

  return (
    <main className="min-h-screen bg-[#f2eddf]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-3 py-5 sm:px-5">
        <Link href="/quran" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة إلى فهرس السور
        </Link>

        <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-16 [scrollbar-width:none] sm:block sm:space-y-6 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {pages.map((quranPage) => {
            const surahAyahs = quranPage.ayahs.filter((ayah) =>
              ayah.surah?.number === surahNumber &&
              ayah.number >= firstGlobalAyah && ayah.number <= lastGlobalAyah
            );

            if (!surahAyahs.length) return null;

            return (
              <article key={quranPage.number} className="relative w-[calc(100vw-24px)] shrink-0 snap-center overflow-hidden border-[3px] border-[#b98a43] bg-[#fffdf7] px-5 py-8 shadow-[0_12px_35px_rgba(85,65,35,0.16)] sm:w-full sm:px-10 sm:py-10">
                <div className="pointer-events-none absolute inset-2 border border-[#b98a43]/45" />
                <div className="pointer-events-none absolute inset-[0.7rem] border border-[#d4b982]/35" />

                {surahAyahs[0]?.numberInSurah === 1 && (
                  <header className="relative mb-6 text-center">
                    <div className="mb-3 flex items-center justify-center gap-1 sm:gap-3">
                      <MushafOrnament />
                      <h1 className={`${amiriQuran.className} text-[#20235c] text-[2rem] leading-[1.45] sm:text-[3rem]`}>
                        {surah.name.replace(/^سُورَةُ\s*/, "")}
                      </h1>
                      <MushafOrnament mirrored />
                    </div>
                    <div className="mx-auto h-px w-4/5 bg-gradient-to-r from-transparent via-[#20235c]/35 to-transparent" />
                    <p className="mt-3 font-sans text-[0.9rem] font-black tracking-[0.38em] text-[#20235c] sm:text-[1.05rem]">
                      SURAH {surah.englishName.toUpperCase()}
                    </p>
                  </header>
                )}

                <p
                  dir="rtl"
                  className={`${amiriQuran.className} relative min-h-[420px] text-justify text-[1.75rem] leading-[3.35rem] text-[#111] sm:text-[2.05rem] sm:leading-[4rem]`}
                  style={{ textAlignLast: "justify" }}
                >
                  {surahAyahs.map((ayah) => (
                    <span key={ayah.number}>
                      {ayah.text.replace(/^\s+/, "")}
                      <AyahMarker number={ayah.numberInSurah} />{" "}
                    </span>
                  ))}
                </p>

                <div className="relative mt-7 border-t border-[#b98a43]/45 pt-4 text-center text-lg font-bold text-[#9a7035]">
                  {toEasternArabicNumerals(quranPage.number)}
                </div>
              </article>
            );
          })}

          {pages.length === 0 && (
            <article className="relative w-[calc(100vw-24px)] shrink-0 snap-center overflow-hidden border-[3px] border-[#b98a43] bg-[#fffdf7] px-5 py-8 shadow-[0_12px_35px_rgba(85,65,35,0.16)] sm:w-full sm:px-10 sm:py-10">
              <div className="pointer-events-none absolute inset-2 border border-[#b98a43]/45" />
              <header className="relative mb-6 text-center">
                <div className="mb-3 flex items-center justify-center gap-1 sm:gap-3">
                  <MushafOrnament />
                  <h1 className={`${amiriQuran.className} text-[2rem] leading-[1.45] text-[#20235c] sm:text-[3rem]`}>{surah.name.replace(/^سُورَةُ\s*/, "")}</h1>
                  <MushafOrnament mirrored />
                </div>
                <div className="mx-auto h-px w-4/5 bg-gradient-to-r from-transparent via-[#20235c]/35 to-transparent" />
                <p className="mt-3 font-sans text-[0.9rem] font-black tracking-[0.38em] text-[#20235c] sm:text-[1.05rem]">SURAH {surah.englishName.toUpperCase()}</p>
              </header>
              <p dir="rtl" className={`${amiriQuran.className} relative text-justify text-[1.75rem] leading-[3.35rem] text-[#111] sm:text-[2.05rem] sm:leading-[4rem]`}>
                {surah.ayahs.map((ayah) => (
                  <span key={ayah.number}>{ayah.text}<AyahMarker number={ayah.numberInSurah} />{" "}</span>
                ))}
              </p>
            </article>
          )}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
