import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-5 py-6">
        <Link href="/ibadah" className="text-sm font-bold text-[var(--emerald)]">← العودة إلى أحكام العبادات</Link>
        <Skeleton className="mt-8 h-10 w-56" />
        <div className="mt-8 space-y-3 pb-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
