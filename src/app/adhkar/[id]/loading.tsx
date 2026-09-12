import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/adhkar" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة إلى الأذكار
        </Link>
        <Skeleton className="mt-8 h-9 w-56" />
        <div className="mt-8 space-y-4 pb-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    </main>
  );
}
