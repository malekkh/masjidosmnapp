import Link from "next/link";
import { BookOpen } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
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
        <div className="mt-8 grid gap-3 pb-16 sm:grid-cols-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-[66px]" />
          ))}
        </div>
      </div>
    </main>
  );
}
