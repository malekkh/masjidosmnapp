import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">← العودة للرئيسية</Link>
        <section className="mt-10 max-w-3xl">
          <HeartHandshake className="text-[var(--emerald)]" size={42} />
          <Skeleton className="mt-4 h-10 w-64" />
          <Skeleton className="mt-4 h-4 w-full max-w-lg" />
        </section>
        <section className="mt-10 grid gap-5 pb-16 sm:grid-cols-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </section>
      </div>
    </main>
  );
}
