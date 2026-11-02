import MushafReader from "@/components/MushafReader";

export default async function ReaderPage({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const params = await searchParams;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number(rawPage);
  const initialPage = Number.isInteger(parsedPage) ? Math.min(604, Math.max(1, parsedPage)) : 1;

  return <MushafReader initialPage={initialPage} restoreProgress={!rawPage} />;
}
