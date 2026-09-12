import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAdhkarCategory } from "@/lib/adhkar";

export default async function AdhkarCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categoryId = Number(id);
  if (!Number.isInteger(categoryId)) notFound();

  const category = await getAdhkarCategory(categoryId);
  if (!category) notFound();

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/adhkar" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة إلى الأذكار
        </Link>
        <h1 className="mt-8 text-3xl font-black text-[var(--emerald-deep)]">{category.title}</h1>

        <div className="mt-8 space-y-4 pb-16">
          {category.items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[var(--line)] bg-white p-6">
              <p className="text-lg leading-9 text-[var(--emerald-deep)]" dir="rtl">
                {item.text}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3 text-sm text-[var(--muted)]">
                <span>التكرار: {item.repeat}</span>
                {item.audio && (
                  <audio controls src={item.audio} className="h-8 max-w-[180px]">
                    متصفحك لا يدعم تشغيل الصوت
                  </audio>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
