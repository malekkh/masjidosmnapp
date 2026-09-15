import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { createClient } from "@/lib/supabase/server";
import type { IbadahCategory, IbadahRuling } from "@/lib/types";

export default async function IbadahCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: category } = await supabase
    .from("ibadah_categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!category) notFound();
  const currentCategory = category as IbadahCategory;

  const { data, error } = await supabase
    .from("ibadah_rulings")
    .select("id, category_id, title, definition, question, answer, source_name, source_url, scholar, madhhab, verified, sort_order, created_at, updated_at")
    .eq("category_id", currentCategory.id)
    .eq("verified", true)
    .order("sort_order");

  if (error) throw new Error(`Ibadah rulings fetch failed: ${error.message}`);
  const rulings = (data as IbadahRuling[]) ?? [];

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-5 py-6">
        <Link href="/ibadah" className="text-sm font-bold text-[var(--emerald)]">← العودة إلى أحكام العبادات</Link>
        <h1 className="mt-8 text-3xl font-black text-[var(--emerald-deep)] sm:text-4xl">{currentCategory.name}</h1>

        {rulings.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-[var(--line)] p-10 text-center text-sm text-[var(--muted)]">
            لا توجد أحكام منشورة في هذا القسم حاليًا.
          </p>
        ) : (
          <div className="mt-8 space-y-3 pb-16">
            {rulings.map((ruling) => (
              <Link
                key={ruling.id}
                href={`/ibadah/${currentCategory.slug}/${ruling.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-5 transition hover:border-[var(--emerald)]"
              >
                <span className="flex-1">
                  <strong className="block text-base font-bold text-[var(--emerald-deep)]">{ruling.title}</strong>
                  <small className="mt-1 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                    <ExternalLink size={12} /> {ruling.source_name}
                    {ruling.scholar ? ` · ${ruling.scholar}` : ""}
                  </small>
                </span>
                <ChevronLeft className="shrink-0 text-[var(--muted)] transition group-hover:text-[var(--emerald)]" size={18} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
