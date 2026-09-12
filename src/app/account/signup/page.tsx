import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf3ef] px-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <p className="text-sm font-bold text-[var(--emerald)]">حسابي</p>
        <h1 className="mt-2 text-2xl font-black text-[var(--emerald-deep)]">إنشاء حساب</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          لمتابعة أسئلتك وحالتها والإجابات عليها في مكان واحد.
        </p>
        <SignupForm />
        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          لديك حساب بالفعل؟{" "}
          <Link href="/account/login" className="font-bold text-[var(--emerald)]">
            تسجيل الدخول
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-[var(--muted)]">
          <Link href="/fatawa" className="font-bold text-[var(--emerald)]">
            المتابعة كزائر
          </Link>
        </p>
      </div>
    </main>
  );
}
