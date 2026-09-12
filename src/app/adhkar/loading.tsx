import Link from "next/link";
import { MoonStar } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة للرئيسية
        </Link>
        <div className="mt-8 text-center">
          <MoonStar className="mx-auto text-[var(--emerald)]" size={40} />
          <h1 className="mt-4 text-4xl font-black text-[var(--emerald-deep)]">الأذكار</h1>
        </div>
        <div className="mt-10 space-y-3 pb-16">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-[68px]" />
          ))}
        </div>
      </div>
    </main>
  );
}
