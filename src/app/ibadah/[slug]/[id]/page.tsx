import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CopyLinkButton from "@/components/CopyLinkButton";
import { createClient } from "@/lib/supabase/server";
import type { IbadahCategory, IbadahRuling } from "@/lib/types";

function formatInlineText(text: string) {
  return text.split(/(\([^()]*\))/g).map((part, index) =>
    part.startsWith("(") && part.endsWith(")") ? (
      <span
        key={`${index}-${part.slice(0, 20)}`}
        className="mx-0.5 rounded-md bg-[#eef4f1] px-1.5 py-0.5 text-[0.95em] text-[var(--emerald-deep)]"
      >
        {part}
      </span>
    ) : <span key={`${index}-${part.slice(0, 20)}`}>{part}</span>,
  );
}

function cleanDescriptionText(text: string) {
  return text
    .replace(/\u200b/g, "")
    .replace(/[{}[\]]/g, "")
    .replace(/\s+([،؛,:.])/g, "$1")
    .replace(/([،؛:])\s*/g, "$1 ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

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
  const isGeneratedDefinition = !item.definition?.trim() ||
    item.definition.trim() === `${currentCategory.name}: ${item.title}`;
  const isGeneratedQuestion = !item.question?.trim() ||
    item.question.trim().startsWith("ما حكم/تفصيل ");
  const descriptionLines = cleanDescriptionText(item.answer)
    .split(/\n+/)
    .map((line) => line.replace(/^\s*[·•*-]\s*/, "").trim())
    .filter(Boolean);

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

          {!isGeneratedDefinition && (
            <p className="mt-4 rounded-xl border border-[var(--emerald)]/20 bg-[#f2f7f4] p-4 text-sm leading-7 text-[var(--emerald-deep)]">
              <strong>التعريف: </strong>
              {item.definition}
            </p>
          )}

          {!isGeneratedQuestion && (
            <p className="mt-4 rounded-xl bg-[#f6f8f6] p-4 text-sm leading-7 text-[var(--muted)]">
              <strong className="text-[var(--emerald-deep)]">السؤال: </strong>
              {item.question}
            </p>
          )}

          <div className="mt-6 border-t border-[var(--line)] pt-6">
            <div className="space-y-3">
              {descriptionLines.map((line, index) => {
                const colonIndex = line.indexOf(":");
                const separatorIndex = colonIndex >= 0 && colonIndex <= 40 ? colonIndex : -1;
                const label = separatorIndex > 0 ? line.slice(0, separatorIndex + 1).trim() : null;
                const content = separatorIndex > 0 ? line.slice(separatorIndex + 1).trim() : line;

                return (
                  <p
                    key={`${index}-${line.slice(0, 30)}`}
                    className="relative rounded-xl border border-[var(--line)] bg-[#f9fbfa] px-4 py-3 pr-5 text-sm leading-8 text-[var(--emerald-deep)] sm:text-base"
                  >
                    <span className="absolute right-0 top-3 h-6 w-1 rounded-l-full bg-[var(--emerald)]/70" />
                    {label && (
                      <strong className="ml-1 text-[var(--emerald-deep)]">
                        {formatInlineText(label)}
                      </strong>
                    )}
                    {formatInlineText(content)}
                  </p>
                );
              })}
            </div>
          </div>

          {item.madhhab && (
            <p className="mt-5 text-xs font-bold text-[var(--amber)]">المذهب: {item.madhhab}</p>
          )}
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
