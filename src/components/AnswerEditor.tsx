"use client";

import { useRef, useState } from "react";
import { answerQuestion } from "@/app/dashboard/(admin)/questions/actions";
import SubmitButton from "@/components/SubmitButton";
import FatwaReferenceSearch from "@/components/FatwaReferenceSearch";

export default function AnswerEditor({ questionId }: { questionId: string }) {
  const [answer, setAnswer] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function insertReference(label: string, id: string) {
    const intro = "وقد سبق بيان هذه المسألة في الفتوى التالية:";
    const link = `[${label}](/fatawa/${id})`;
    const textarea = textareaRef.current;

    if (!textarea) {
      setAnswer((prev) => (prev ? `${prev}\n\n${intro}\n${link}` : `${intro}\n${link}`));
      return;
    }

    const { selectionStart, selectionEnd, value } = textarea;
    const before = value.slice(0, selectionStart);
    const after = value.slice(selectionEnd);
    const needsLeadingBreak = before.length > 0 && !before.endsWith("\n\n");
    const insertion = `${needsLeadingBreak ? "\n\n" : ""}${intro}\n${link}`;
    const next = `${before}${insertion}${after}`;
    setAnswer(next);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = before.length + insertion.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  }

  return (
    <div className="space-y-3">
      <FatwaReferenceSearch onInsert={insertReference} />
      <form action={answerQuestion} className="space-y-3">
        <input type="hidden" name="questionId" value={questionId} />
        <textarea
          ref={textareaRef}
          name="answer"
          required
          minLength={5}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="اكتب الإجابة هنا..."
          className="h-28 w-full rounded-xl border border-[var(--line)] p-3 text-sm"
        />
        <SubmitButton
          pendingText="جارٍ النشر..."
          className="rounded-xl bg-[var(--emerald)] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          نشر الإجابة
        </SubmitButton>
      </form>
    </div>
  );
}
