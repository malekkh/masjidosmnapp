import { CheckCircle2, ClipboardList } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();

  const [{ count: pendingCount }, { count: answeredCount }] = await Promise.all([
    supabase.from("questions").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("questions").select("*", { count: "exact", head: true }).eq("status", "answered"),
  ]);

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-bold text-[var(--emerald)]">لوحة التحكم</p>
      <h1 className="mt-2 text-3xl font-black text-[var(--emerald-deep)]">مرحبًا بك في إدارة المسجد</h1>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6">
          <ClipboardList className="text-[var(--emerald)]" />
          <p className="mt-6 text-sm text-[var(--muted)]">أسئلة قيد المراجعة</p>
          <strong className="text-3xl text-[var(--emerald-deep)]">{pendingCount ?? 0}</strong>
        </div>
        <div className="rounded-2xl bg-white p-6">
          <CheckCircle2 className="text-[var(--emerald)]" />
          <p className="mt-6 text-sm text-[var(--muted)]">إجابات منشورة</p>
          <strong className="text-3xl text-[var(--emerald-deep)]">{answeredCount ?? 0}</strong>
        </div>
      </div>
    </div>
  );
}
