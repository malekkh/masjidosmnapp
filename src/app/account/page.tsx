import Link from "next/link";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SubmitButton from "@/components/SubmitButton";
import AnswerText from "@/components/AnswerText";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import type { Question, QuestionStatus } from "@/lib/types";
import { signOutVisitor } from "./actions";

const STATUS_LABELS: Record<QuestionStatus, string> = {
  pending: "قيد المراجعة",
  answered: "تمت الإجابة",
  rejected: "مرفوض",
};

const STATUS_STYLES: Record<QuestionStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  answered: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default async function AccountPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/account/login");

  const supabase = await createClient();
  const { data } = await supabase
    .from("questions")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  const questions = (data as Question[]) ?? [];

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/fatawa" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة إلى الفتاوى
        </Link>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[var(--emerald)]">حسابي</p>
            <h1 className="mt-1 text-3xl font-black text-[var(--emerald-deep)]">
              أسئلتي{profile.full_name ? ` — ${profile.full_name}` : ""}
            </h1>
          </div>
          <form action={signOutVisitor}>
            <SubmitButton
              pendingText="جارٍ الخروج..."
              className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-bold text-red-600 disabled:opacity-60"
            >
              تسجيل الخروج
            </SubmitButton>
          </form>
        </div>

        {questions.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
            لم ترسل أي سؤال بعد.{" "}
            <Link href="/fatawa" className="font-bold text-[var(--emerald)]">
              اطرح سؤالك الآن
            </Link>
          </p>
        ) : (
          <div className="mt-8 space-y-4 pb-16">
            {questions.map((item) => (
              <article key={item.id} className="rounded-2xl border border-[var(--line)] bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-[var(--emerald)]">{item.category}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[item.status]}`}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>
                <p className="mt-3 font-bold text-[var(--emerald-deep)]">{item.question}</p>
                {item.answer && (
                  <AnswerText
                    text={item.answer}
                    className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--muted)]"
                  />
                )}
              </article>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
