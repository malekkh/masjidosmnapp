import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CopyLinkButton from "@/components/CopyLinkButton";
import AnswerText from "@/components/AnswerText";
import { createClient } from "@/lib/supabase/server";
import type { Question } from "@/lib/types";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ar", { dateStyle: "long" }).format(new Date(iso));
}

export default async function FatwaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data } = await supabase.from("questions").select("*").eq("id", id).eq("status", "answered").maybeSingle();

  if (!data) notFound();
  const item = data as Question;

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/fatawa" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة إلى الفتاوى
        </Link>

        <article className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-[#e7f1eb] px-3 py-1 text-xs font-bold text-[var(--emerald)]">
              {item.category}
            </span>
            <CopyLinkButton
              path={`/fatawa/${item.id}`}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-bold text-[var(--muted)] hover:text-[var(--emerald)]"
            />
          </div>

          <h1 className="mt-5 text-xl font-black leading-8 text-[var(--emerald-deep)] sm:text-2xl">
            {item.question}
          </h1>

          <div className="mt-6 border-t border-[var(--line)] pt-6">
            <AnswerText
              text={item.answer ?? ""}
              className="whitespace-pre-line text-sm leading-7 text-[var(--muted)] sm:text-base"
            />
          </div>

          {item.answered_at && (
            <p className="mt-6 flex items-center gap-2 text-xs text-[var(--muted)]">
              <CalendarDays size={14} /> {formatDate(item.answered_at)}
            </p>
          )}
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
