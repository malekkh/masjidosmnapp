import LoginForm from "@/components/LoginForm";

export default function DashboardLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf3ef] px-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <p className="text-sm font-bold text-[var(--emerald)]">لوحة التحكم</p>
        <h1 className="mt-2 text-2xl font-black text-[var(--emerald-deep)]">تسجيل دخول الإدارة</h1>
        <LoginForm />
      </div>
    </main>
  );
}
