"use client";

import { useActionState, useEffect, useRef } from "react";
import { createAnnouncement, type AnnouncementActionState } from "@/app/dashboard/(admin)/announcements/actions";
import SubmitButton from "@/components/SubmitButton";
import AnnouncementFields from "@/components/AnnouncementFields";

const initialState: AnnouncementActionState = {};

export default function CreateAnnouncementForm() {
  const [state, formAction] = useActionState(createAnnouncement, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="mt-8 rounded-2xl bg-white p-6">
      <h2 className="mb-5 text-xl font-black text-[var(--emerald-deep)]">إضافة إعلان</h2>
      <AnnouncementFields />
      {state.error && <p className="mt-4 text-sm font-bold text-red-600">{state.error}</p>}
      {state.success && <p className="mt-4 text-sm font-bold text-[var(--emerald)]">تم حفظ الإعلان بنجاح.</p>}
      <SubmitButton
        pendingText="جارٍ الحفظ..."
        className="mt-5 rounded-xl bg-[var(--emerald)] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        حفظ الإعلان
      </SubmitButton>
    </form>
  );
}
