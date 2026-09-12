"use client";

import { useActionState } from "react";
import { createSheikhAccount, type CreateSheikhState } from "@/app/dashboard/(admin)/sheikhs/actions";
import SubmitButton from "@/components/SubmitButton";

const initialState: CreateSheikhState = {};

export default function CreateSheikhForm() {
  const [state, formAction] = useActionState(createSheikhAccount, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4 rounded-2xl bg-white p-6">
      <div>
        <label className="mb-1 block text-sm font-bold text-[var(--emerald-deep)]">الاسم الكامل</label>
        <input name="fullName" required className="w-full rounded-xl border border-[var(--line)] p-3 text-sm" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-bold text-[var(--emerald-deep)]">البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          required
          autoComplete="off"
          suppressHydrationWarning
          className="w-full rounded-xl border border-[var(--line)] p-3 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-bold text-[var(--emerald-deep)]">
          كلمة المرور <span className="font-normal text-[var(--muted)]">(اختياري — تُولَّد تلقائيًا إذا تُركت فارغة)</span>
        </label>
        <input
          name="password"
          minLength={6}
          autoComplete="off"
          suppressHydrationWarning
          className="w-full rounded-xl border border-[var(--line)] p-3 text-sm"
        />
      </div>

      {state.error && <p className="text-sm font-bold text-red-600">{state.error}</p>}
      {state.success && (
        <div className="rounded-xl bg-[#e5f0ea] p-4 text-sm text-[var(--emerald-deep)]">
          <p className="font-bold">تم إنشاء الحساب بنجاح. شارك هذه البيانات مع الشيخ:</p>
          <p className="mt-2">
            البريد الإلكتروني: <bdi dir="ltr">{state.success.email}</bdi>
          </p>
          <p>
            كلمة المرور: <bdi dir="ltr">{state.success.password}</bdi>
          </p>
        </div>
      )}

      <SubmitButton
        pendingText="جارٍ الإنشاء..."
        className="w-full rounded-xl bg-[var(--emerald)] py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        إنشاء حساب شيخ
      </SubmitButton>
    </form>
  );
}
