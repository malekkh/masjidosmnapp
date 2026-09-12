"use client";

import { useActionState } from "react";
import { signUp, type AuthState } from "@/app/account/actions";
import SubmitButton from "@/components/SubmitButton";

const initialState: AuthState = {};

export default function SignupForm() {
  const [state, formAction] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input
        name="fullName"
        required
        autoComplete="name"
        placeholder="الاسم الكامل"
        suppressHydrationWarning
        className="w-full rounded-xl border border-[var(--line)] p-3"
      />
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="البريد الإلكتروني"
        suppressHydrationWarning
        className="w-full rounded-xl border border-[var(--line)] p-3"
      />
      <input
        type="password"
        name="password"
        required
        minLength={6}
        autoComplete="new-password"
        placeholder="كلمة المرور"
        suppressHydrationWarning
        className="w-full rounded-xl border border-[var(--line)] p-3"
      />
      {state.error && <p className="text-sm font-bold text-red-600">{state.error}</p>}
      <SubmitButton
        pendingText="جارٍ إنشاء الحساب..."
        className="w-full rounded-xl bg-[var(--emerald)] py-3 font-bold text-white disabled:opacity-60"
      >
        إنشاء حساب
      </SubmitButton>
    </form>
  );
}
