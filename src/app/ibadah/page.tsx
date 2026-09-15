import Link from "next/link";
import {
  BookOpenCheck,
  ChevronLeft,
  Droplets,
  Flower2,
  HeartHandshake,
  Landmark,
  Moon,
  Plane,
  Scale,
  type LucideIcon,
} from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { createClient } from "@/lib/supabase/server";
import type { IbadahCategory } from "@/lib/types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Droplets,
  Landmark,
  Moon,
  Scale,
  Plane,
  Flower2,
  BookOpenCheck,
};

export default async function IbadahPage() {
  const supabase = await createClient();
  const [{ data: categories, error: categoriesError }, { data: rulingCounts, error: rulingsError }] =
    await Promise.all([
      supabase.from("ibadah_categories").select("*").order("sort_order"),
      supabase.from("ibadah_rulings").select("category_id").eq("verified", true),
    ]);

  if (categoriesError) throw new Error(`Ibadah categories fetch failed: ${categoriesError.message}`);
  if (rulingsError) throw new Error(`Ibadah rulings count fetch failed: ${rulingsError.message}`);

  const counts = new Map<string, number>();
  for (const row of rulingCounts ?? []) {
    counts.set(row.category_id, (counts.get(row.category_id) ?? 0) + 1);
  }

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">← العودة للرئيسية</Link>
        <section className="mt-10 max-w-3xl">
          <HeartHandshake className="text-[var(--emerald)]" size={42} />
          <h1 className="mt-4 text-4xl font-black text-[var(--emerald-deep)]">أحكام العبادات</h1>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            أحكام فقهية موثّقة من مصادر سنّية معتمدة، مع رابط المصدر الأصلي لكل حكم للرجوع إليه والتحقق منه. للمسائل التفصيلية، اسأل أهل العلم.
          </p>
        </section>

        <section className="mt-10 grid gap-5 pb-16 sm:grid-cols-2">
          {((categories as IbadahCategory[]) ?? []).map((category) => {
            const Icon = CATEGORY_ICONS[category.icon] ?? HeartHandshake;
            const count = counts.get(category.id) ?? 0;
            return (
              <Link
                key={category.id}
                href={`/ibadah/${category.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-6 transition hover:border-[var(--emerald)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e7f1eb] text-[var(--emerald)]">
                  <Icon size={22} />
                </span>
                <span className="flex-1">
                  <strong className="block text-lg font-black text-[var(--emerald-deep)]">{category.name}</strong>
                  <small className="text-xs text-[var(--muted)]">{count} حكمًا</small>
                </span>
                <ChevronLeft className="text-[var(--muted)] transition group-hover:text-[var(--emerald)]" size={18} />
              </Link>
            );
          })}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
