"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { UserRoundPlus, X } from "lucide-react";

const DISMISS_KEY = "fatawa-account-prompt-dismissed";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export default function AccountPrompt({ loggedIn, fullName }: { loggedIn: boolean; fullName?: string | null }) {
  const dismissedFromStorage = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissedThisSession, setDismissedThisSession] = useState(false);
  const dismissed = dismissedFromStorage || dismissedThisSession;

  function dismiss() {
    setDismissedThisSession(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore — dismissal just won't persist across visits.
    }
  }

  if (loggedIn) {
    return (
      <p className="mb-4 rounded-xl bg-[#e5f0ea] px-4 py-3 text-sm text-[var(--emerald-deep)]">
        مرحبًا{fullName ? ` ${fullName}` : ""}، يمكنك متابعة حالة أسئلتك من{" "}
        <Link href="/account" className="font-bold text-[var(--emerald)]">
          صفحة أسئلتي
        </Link>
        .
      </p>
    );
  }

  if (dismissed) {
    return (
      <p className="mb-4 text-sm text-[var(--muted)]">
        لديك حساب؟{" "}
        <Link href="/account/login" className="font-bold text-[var(--emerald)]">
          تسجيل الدخول
        </Link>{" "}
        · ليس لديك حساب؟{" "}
        <Link href="/account/signup" className="font-bold text-[var(--emerald)]">
          إنشاء حساب
        </Link>
      </p>
    );
  }

  return (
    <div className="mb-4 rounded-2xl border border-[var(--line)] bg-[#fbf6e9] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[var(--emerald-deep)]">
          <UserRoundPlus size={18} />
          <strong className="text-sm">أنشئ حسابًا لمتابعة سؤالك بسهولة</strong>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="إغلاق"
          className="shrink-0 rounded-lg p-1 text-[var(--muted)] hover:bg-black/5"
        >
          <X size={16} />
        </button>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        بحساب مجاني تقدر ترجع لأسئلتك وتشوف حالتها (قيد المراجعة / تمت الإجابة) والإجابة نفسها في أي وقت، دون الحاجة للبحث يدويًا بين الإجابات.
        بدون حساب، سؤالك يُرسل بشكل طبيعي، لكن للعثور عليه لاحقًا ستحتاج للبحث عنه يدويًا ضمن قسم الإجابات العامة.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          href="/account/signup"
          className="rounded-xl bg-[var(--emerald)] px-4 py-2 text-sm font-bold text-white"
        >
          تسجيل حساب
        </Link>
        <Link
          href="/account/login"
          className="rounded-xl border border-[var(--line)] bg-white px-4 py-2 text-sm font-bold text-[var(--emerald-deep)]"
        >
          لديّ حساب بالفعل
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="px-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--emerald-deep)]"
        >
          المتابعة كزائر
        </button>
      </div>
    </div>
  );
}
