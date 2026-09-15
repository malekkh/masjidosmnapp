import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CopyLinkButton from "@/components/CopyLinkButton";
import { createClient } from "@/lib/supabase/server";
import type { IbadahCategory, IbadahRuling } from "@/lib/types";

export default async function IbadahRulingPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;

  const supabase = await createClient();
  const { data: category } = await supabase
    .from("ibadah_categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!category) notFound();
  const currentCategory = category as IbadahCategory;

  const { data: ruling } = await supabase
    .from("ibadah_rulings")
    .select("id, category_id, title, definition, question, answer, source_name, source_url, scholar, madhhab, verified, sort_order, created_at, updated_at")
    .eq("id", id)
    .eq("category_id", currentCategory.id)
    .eq("verified", true)
    .maybeSingle();

  if (!ruling) notFound();
  const item = ruling as IbadahRuling;

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href={`/ibadah/${currentCategory.slug}`} className="text-sm font-bold text-[var(--emerald)]">
          ← العودة إلى {currentCategory.name}
        </Link>

        <article className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-[#e7f1eb] px-3 py-1 text-xs font-bold text-[var(--emerald)]">
              {currentCategory.name}
            </span>
            <CopyLinkButton
              path={`/ibadah/${currentCategory.slug}/${item.id}`}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-bold text-[var(--muted)] hover:text-[var(--emerald)]"
            />
          </div>

          <h1 className="mt-5 text-xl font-black leading-8 text-[var(--emerald-deep)] sm:text-2xl">
            {item.title}
          </h1>

          <p className="mt-4 rounded-xl border border-[var(--emerald)]/20 bg-[#f2f7f4] p-4 text-sm leading-7 text-[var(--emerald-deep)]">
            <strong>التعريف: </strong>
            {item.definition}
          </p>

          {item.question && (
            <p className="mt-4 rounded-xl bg-[#f6f8f6] p-4 text-sm leading-7 text-[var(--muted)]">
              <strong className="text-[var(--emerald-deep)]">السؤال: </strong>
              {item.question}
            </p>
          )}

          <div className="mt-6 whitespace-pre-line border-t border-[var(--line)] pt-6 text-sm leading-8 text-[var(--emerald-deep)] sm:text-base">
            {item.answer}
          </div>

          {item.madhhab && (
            <p className="mt-5 text-xs font-bold text-[var(--amber)]">المذهب: {item.madhhab}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-5 text-xs text-[var(--muted)]">
            <span>{item.scholar ?? item.source_name}</span>
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-bold text-[var(--emerald)] hover:underline"
            >
              <ExternalLink size={14} /> عرض الفتوى كاملة في {item.source_name}
            </a>
          </div>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
