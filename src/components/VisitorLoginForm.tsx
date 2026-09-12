"use client";

import { useActionState } from "react";
import { signInVisitor, type AuthState } from "@/app/account/actions";
import SubmitButton from "@/components/SubmitButton";

const initialState: AuthState = {};

export default function VisitorLoginForm() {
  const [state, formAction] = useActionState(signInVisitor, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
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
        autoComplete="current-password"
        placeholder="كلمة المرور"
        suppressHydrationWarning
        className="w-full rounded-xl border border-[var(--line)] p-3"
      />
      {state.error && <p className="text-sm font-bold text-red-600">{state.error}</p>}
      <SubmitButton
        pendingText="جارٍ الدخول..."
        className="w-full rounded-xl bg-[var(--emerald)] py-3 font-bold text-white disabled:opacity-60"
      >
        دخول
      </SubmitButton>
    </form>
  );
}
