import { redirect } from "next/navigation";
import Link from "next/link";
import { CalendarDays, ClipboardList, LogOut, ShieldCheck, UserRoundPlus } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";
import { signOut } from "@/app/dashboard/actions";
import SubmitButton from "@/components/SubmitButton";

const navItems = [
  { href: "/dashboard", label: "نظرة عامة", icon: ShieldCheck },
  { href: "/dashboard/questions", label: "الأسئلة والفتاوى", icon: ClipboardList },
  { href: "/dashboard/announcements", label: "إعلانات المسجد", icon: CalendarDays },
  { href: "/dashboard/sheikhs", label: "حسابات المشايخ", icon: UserRoundPlus },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/dashboard/login");
  if (profile.role !== "admin" && profile.role !== "sheikh") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#edf3ef] px-5 text-center">
        <div>
          <h1 className="text-2xl font-black text-[var(--emerald-deep)]">غير مصرح بالدخول</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">هذا الحساب لا يملك صلاحية الوصول إلى لوحة التحكم.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf3ef] lg:flex">
      <aside className="border-b border-[var(--line)] bg-white p-5 lg:w-64 lg:border-b-0 lg:border-l lg:p-6">
        <p className="text-sm font-bold text-[var(--emerald)]">لوحة التحكم</p>
        <p className="mt-1 text-xs text-[var(--muted)]">{profile.full_name ?? "مسؤول"} · {profile.role === "admin" ? "إدارة" : "شيخ"}</p>
        <nav className="mt-6 flex flex-col gap-1">
          {navItems
            .filter((item) => (item.href !== "/dashboard/sheikhs" && item.href !== "/dashboard/announcements") || profile.role === "admin")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--muted)] hover:bg-[#e7f1eb] hover:text-[var(--emerald-deep)]"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
        </nav>
        <form action={signOut} className="mt-6">
          <SubmitButton
            pendingText="جارٍ الخروج..."
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </SubmitButton>
        </form>
      </aside>
      <div className="flex-1 px-5 py-10 lg:px-10">{children}</div>
    </div>
  );
}
