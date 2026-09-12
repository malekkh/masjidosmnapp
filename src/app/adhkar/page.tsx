import Link from "next/link";
import { ChevronLeft, MoonStar } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAdhkarCategories } from "@/lib/adhkar";

export default async function AdhkarPage() {
  const categories = await getAdhkarCategories();

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة للرئيسية
        </Link>
        <div className="mt-8 text-center">
          <MoonStar className="mx-auto text-[var(--emerald)]" size={40} />
          <h1 className="mt-4 text-4xl font-black text-[var(--emerald-deep)]">الأذكار</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">من حصن المسلم — للتصفح والقراءة</p>
        </div>

        {categories.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
            تعذّر جلب الأذكار حاليًا، يرجى المحاولة لاحقًا.
          </p>
        ) : (
          <div className="mt-10 space-y-3 pb-16">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/adhkar/${category.id}`}
                className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white p-5"
              >
                <strong className="text-base text-[var(--emerald-deep)]">{category.title}</strong>
                <ChevronLeft className="text-[var(--muted)]" size={18} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
