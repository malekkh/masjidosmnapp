import Link from "next/link";
import { BookOpenCheck, CalendarDays, CheckCircle2, HeartHandshake, MoonStar, Scale, Sparkles } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const worshipSections = [
  {
    title: "الصلاة",
    icon: MoonStar,
    description: "عمود الدين وأقرب ما يكون العبد من ربه وهو ساجد.",
    points: ["حافظ على الصلوات في أوقاتها", "أتمم الوضوء واستحضر النية", "أكثر من الدعاء في السجود"],
  },
  {
    title: "الصيام",
    icon: CalendarDays,
    description: "عبادة تزكي النفس وتدرّبها على التقوى والصبر.",
    points: ["استحضر نية الصيام", "احفظ لسانك وجوارحك", "عجّل الفطر عند تحقق الغروب"],
  },
  {
    title: "الزكاة والصدقة",
    icon: Scale,
    description: "طهارة للمال ونماء للخير وتكافل بين أفراد المجتمع.",
    points: ["تحرَّ المال المستحق للزكاة", "اسأل أهل العلم عن النصاب والحول", "اجعل لك صدقة جارية"],
  },
  {
    title: "الحج والعمرة",
    icon: BookOpenCheck,
    description: "رحلة إيمانية عظيمة تُبنى على الإخلاص واتباع الهدي.",
    points: ["تعلّم المناسك قبل السفر", "استفتِ فيما يشكل عليك", "أخلص النية لله وحده"],
  },
];

export default function IbadahPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">← العودة للرئيسية</Link>
        <section className="mt-10 max-w-3xl">
          <HeartHandshake className="text-[var(--emerald)]" size={42} />
          <h1 className="mt-4 text-4xl font-black text-[var(--emerald-deep)]">العبادات</h1>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            دليل مختصر يساعدك على تنظيم عباداتك اليومية وفهم أبواب الطاعة الأساسية. للمسائل التفصيلية، اسأل أهل العلم.
          </p>
        </section>

        <section className="mt-10 grid gap-5 pb-16 sm:grid-cols-2">
          {worshipSections.map(({ title, icon: Icon, description, points }) => (
            <article key={title} className="rounded-2xl border border-[var(--line)] bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f1eb] text-[var(--emerald)]"><Icon size={22} /></span>
                <h2 className="text-xl font-black text-[var(--emerald-deep)]">{title}</h2>
              </div>
              <p className="mt-5 leading-7 text-[var(--muted)]">{description}</p>
              <ul className="mt-5 space-y-3 border-t border-[var(--line)] pt-5 text-sm text-[var(--emerald-deep)]">
                {points.map((point) => <li key={point} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-[var(--emerald)]" size={16} />{point}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <aside className="mb-16 flex items-start gap-3 rounded-2xl bg-[#e5f0ea] p-5 text-sm leading-7 text-[var(--emerald-deep)]">
          <Sparkles className="mt-1 shrink-0 text-[var(--amber)]" size={18} />
          اجعل القليل الدائم أحب إليك من الكثير المنقطع، وابدأ بخطوة عملية واحدة اليوم.
        </aside>
      </div>
      <SiteFooter />
    </main>
  );
}
