import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import type { Profile } from "@/lib/types";
import CreateSheikhForm from "@/components/CreateSheikhForm";

export default async function SheikhsPage() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") redirect("/dashboard");

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "sheikh")
    .order("created_at", { ascending: false });

  const sheikhs = (data as Profile[]) ?? [];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-black text-[var(--emerald-deep)]">حسابات المشايخ</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">أنشئ حسابات للمشايخ لإدارة الأسئلة والفتاوى الواردة.</p>

      <CreateSheikhForm />

      <h2 className="mt-10 text-xl font-black text-[var(--emerald-deep)]">المشايخ الحاليون</h2>
      {sheikhs.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
          لا يوجد حسابات مشايخ بعد.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {sheikhs.map((sheikh) => (
            <div key={sheikh.id} className="flex items-center gap-3 rounded-2xl bg-white p-4">
              <UserRound className="text-[var(--emerald)]" size={18} />
              <span className="font-bold text-[var(--emerald-deep)]">{sheikh.full_name ?? "بدون اسم"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
