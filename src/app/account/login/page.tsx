import Link from "next/link";
import VisitorLoginForm from "@/components/VisitorLoginForm";

export default function VisitorLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf3ef] px-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <p className="text-sm font-bold text-[var(--emerald)]">حسابي</p>
        <h1 className="mt-2 text-2xl font-black text-[var(--emerald-deep)]">تسجيل الدخول</h1>
        <VisitorLoginForm />
        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          ليس لديك حساب؟{" "}
          <Link href="/account/signup" className="font-bold text-[var(--emerald)]">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </main>
  );
}
