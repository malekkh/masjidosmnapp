import MushafReader from "@/components/MushafReader";
import { notFound } from "next/navigation";
import { getSurahStartPage } from "@/lib/quran-pages";

export default async function SurahPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const surahNumber = Number(number);

  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  return <MushafReader initialPage={getSurahStartPage(surahNumber)} restoreProgress={false} />;
}
