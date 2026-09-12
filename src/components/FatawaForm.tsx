"use client";

import { useActionState, useState } from "react";
import { submitQuestion, type SubmitQuestionState } from "@/app/fatawa/actions";
import SubmitButton from "@/components/SubmitButton";
import QuestionGuidelines from "@/components/QuestionGuidelines";

const CATEGORIES = ["عام", "عقيدة", "عبادات", "معاملات", "أسرة"];

const initialState: SubmitQuestionState = {};

export default function FatawaForm({ canSubmitAnonymously = false }: { canSubmitAnonymously?: boolean }) {
  const [state, formAction] = useActionState(submitQuestion, initialState);
  const [agreed, setAgreed] = useState(false);

  if (state.success) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-6 text-center">
        <p className="font-bold text-[var(--emerald-deep)]">تم إرسال سؤالك بنجاح.</p>
        <p className="mt-2 text-sm text-[var(--muted)]">سيصلك الرد ضمن قائمة الإجابات بعد مراجعته من قبل أهل العلم.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <QuestionGuidelines agreed={agreed} onAgreedChange={setAgreed} />

      <form action={formAction} className="space-y-4 rounded-2xl bg-white p-6">
        <select name="category" className="w-full rounded-xl border border-[var(--line)] p-3" defaultValue="عام">
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <textarea
          name="question"
          required
          minLength={10}
          aria-label="السؤال"
          className="h-32 w-full rounded-xl border border-[var(--line)] p-3"
          placeholder="اكتب سؤالك هنا..."
        />
        {canSubmitAnonymously && (
          <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <input type="checkbox" name="is_anonymous" className="h-4 w-4" />
            إرسال دون ذكر اسمي
          </label>
        )}
        {state.error && <p className="text-sm font-bold text-red-600">{state.error}</p>}
        <SubmitButton
          disabled={!agreed}
          pendingText="جارٍ الإرسال..."
          className="w-full rounded-xl bg-[var(--emerald)] py-3 font-bold text-white disabled:opacity-60"
        >
          إرسال السؤال
        </SubmitButton>
        {!agreed && (
          <p className="text-center text-xs text-[var(--muted)]">
            يرجى الموافقة على شروط وضوابط طرح السؤال أعلاه لتفعيل زر الإرسال.
          </p>
        )}
      </form>
    </div>
  );
}
