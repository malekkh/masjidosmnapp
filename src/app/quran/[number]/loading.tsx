import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f7f3ea]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/quran" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة إلى فهرس السور
        </Link>
        <div className="mt-8 rounded-2xl border-2 border-[var(--amber)]/30 bg-white/60 px-6 py-8 text-center">
          <Skeleton className="mx-auto h-3 w-32" />
          <Skeleton className="mx-auto mt-4 h-10 w-48" />
          <Skeleton className="mx-auto mt-2 h-3 w-40" />
        </div>
        <div className="mt-8 space-y-3 rounded-[1.75rem] border border-[var(--amber)]/20 bg-white/60 px-6 py-10 sm:px-12 sm:py-14">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
