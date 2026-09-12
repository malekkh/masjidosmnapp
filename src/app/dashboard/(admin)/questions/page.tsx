import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Question, QuestionStatus } from "@/lib/types";
import SubmitButton from "@/components/SubmitButton";
import AnswerEditor from "@/components/AnswerEditor";
import AnswerText from "@/components/AnswerText";
import CopyLinkButton from "@/components/CopyLinkButton";
import { rejectQuestion } from "./actions";

const TABS: { value: QuestionStatus; label: string }[] = [
  { value: "pending", label: "قيد المراجعة" },
  { value: "answered", label: "منشورة" },
  { value: "rejected", label: "مرفوضة" },
];

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus: QuestionStatus = (status as QuestionStatus) ?? "pending";

  const supabase = await createClient();
  const { data } = await supabase
    .from("questions")
    .select("*")
    .eq("status", activeStatus)
    .order("created_at", { ascending: false });

  const questions = (data as Question[]) ?? [];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-black text-[var(--emerald-deep)]">إدارة الأسئلة والفتاوى</h1>

      <div className="mt-6 flex gap-2">
        {TABS.map((tab) => (
          <Link
            key={tab.value}
            href={`/dashboard/questions?status=${tab.value}`}
            className={`rounded-xl px-4 py-2 text-sm font-bold ${
              activeStatus === tab.value ? "bg-[var(--emerald)] text-white" : "bg-white text-[var(--muted)]"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {questions.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
          لا توجد أسئلة في هذا القسم حاليًا.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {questions.map((item) => (
            <article key={item.id} className="rounded-2xl bg-white p-6">
              <span className="text-xs font-bold text-[var(--emerald)]">{item.category}</span>
              <p className="mt-2 font-bold text-[var(--emerald-deep)]">{item.question}</p>

              {activeStatus === "pending" ? (
                <div className="mt-4 space-y-3">
                  <AnswerEditor questionId={item.id} />
                  <form action={rejectQuestion}>
                    <input type="hidden" name="questionId" value={item.id} />
                    <SubmitButton
                      pendingText="جارٍ الرفض..."
                      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-600 disabled:opacity-60"
                    >
                      رفض السؤال
                    </SubmitButton>
                  </form>
                </div>
              ) : (
                <>
                  {item.answer && (
                    <AnswerText
                      text={item.answer}
                      className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--muted)]"
                    />
                  )}
                  {activeStatus === "answered" && (
                    <div className="mt-3">
                      <CopyLinkButton
                        path={`/fatawa/${item.id}`}
                        className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-bold text-[var(--muted)] hover:text-[var(--emerald)]"
                      />
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
