"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

const GUIDELINES = [
  {
    title: "الالتزام بالأدب وحسن الخطاب",
    body: "يجب أن يكون السؤال مكتوبًا بأدب واحترام، بعيدًا عن الألفاظ المسيئة أو غير اللائقة.",
  },
  {
    title: "طرح السؤال بصيغة عامة",
    body: "يُرجى طرح المسألة بشكل عام دون السؤال عن أشخاص بأسمائهم، سواء كانوا مشايخ أو دعاة أو شخصيات عامة.",
  },
  {
    title: "عدم طلب الحكم على الأشخاص",
    body: "لا تستخدم المنصة للسؤال عن الحكم على شخص معيّن أو تقييمه، بل يُرجى طرح المسألة الشرعية نفسها بشكل عام.",
  },
  {
    title: "تجنب ذكر المعلومات الشخصية",
    body: "يُرجى عدم ذكر أسماء الأشخاص أو أرقام الهواتف أو العناوين أو أي معلومات شخصية غير ضرورية للسؤال.",
  },
  {
    title: "وضوح السؤال",
    body: "حاول كتابة السؤال بشكل واضح ومختصر، مع ذكر التفاصيل الضرورية التي تساعد الشيخ على فهم المسألة والإجابة عنها.",
  },
  {
    title: "تجنب تكرار السؤال",
    body: "قبل إرسال السؤال، يُفضّل البحث في الفتاوى المنشورة للتأكد من عدم وجود إجابة سابقة على نفس المسألة أو مسألة مشابهة.",
  },
  {
    title: "احترام الخصوصية",
    body: "إذا كانت المسألة تتعلق بمشكلة شخصية أو عائلية، تجنب ذكر أسماء الأشخاص واكتفِ بذكر التفاصيل اللازمة للحكم الشرعي.",
  },
  {
    title: "الأسئلة الشرعية فقط",
    body: "يجب أن تكون الأسئلة ضمن نطاق اختصاص المنصة والفتاوى الشرعية.",
  },
];

export default function QuestionGuidelines({
  agreed,
  onAgreedChange,
}: {
  agreed: boolean;
  onAgreedChange: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[#fbf6e9] p-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="question-guidelines-panel"
        className="flex w-full items-center justify-between gap-3 text-right"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-[var(--emerald-deep)]">
          <ShieldCheck size={17} className="shrink-0 text-[var(--amber)]" />
          شروط وضوابط طرح السؤال
        </span>
        {open ? (
          <ChevronUp className="shrink-0 text-[var(--muted)]" size={18} />
        ) : (
          <ChevronDown className="shrink-0 text-[var(--muted)]" size={18} />
        )}
      </button>

      {!open && (
        <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
          يرجى الاطلاع على الشروط والضوابط قبل إرسال سؤالك، فذلك يساعد على الحصول على إجابة أوضح وأسرع.
        </p>
      )}

      {open && (
        <ol id="question-guidelines-panel" className="mt-3 space-y-3">
          {GUIDELINES.map((item, index) => (
            <li key={item.title} className="flex gap-2 text-xs leading-6 text-[var(--muted)] sm:text-sm">
              <span className="shrink-0 font-bold text-[var(--emerald)]">{index + 1}.</span>
              <span>
                <strong className="block text-[var(--emerald-deep)]">{item.title}</strong>
                {item.body}
              </span>
            </li>
          ))}
        </ol>
      )}

      <label className="mt-4 flex items-start gap-2 border-t border-[var(--amber)]/25 pt-3 text-xs font-semibold text-[var(--emerald-deep)] sm:text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => onAgreedChange(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0"
        />
        أوافق على شروط وضوابط طرح السؤال
      </label>
    </div>
  );
}
