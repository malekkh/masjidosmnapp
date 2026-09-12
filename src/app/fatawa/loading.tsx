import Link from "next/link";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
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
        <div className="mt-8 grid gap-10 pb-16 lg:grid-cols-2">
          <section>
            <MessageCircleQuestion className="text-[var(--emerald)]" size={40} />
            <h1 className="mt-4 text-4xl font-black text-[var(--emerald-deep)]">اسأل أهل الذكر</h1>
            <div className="mt-8 space-y-4 rounded-2xl bg-white p-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-[var(--emerald-deep)]">إجابات مختارة</h2>
              <ChevronDown className="text-[var(--muted)]" size={20} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
