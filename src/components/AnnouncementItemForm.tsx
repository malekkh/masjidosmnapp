"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteAnnouncement,
  updateAnnouncement,
  type AnnouncementActionState,
} from "@/app/dashboard/(admin)/announcements/actions";
import SubmitButton from "@/components/SubmitButton";
import AnnouncementFields from "@/components/AnnouncementFields";
import type { Announcement } from "@/lib/types";

const initialState: AnnouncementActionState = {};

export default function AnnouncementItemForm({ announcement }: { announcement: Announcement }) {
  const [updateState, updateFormAction] = useActionState(updateAnnouncement, initialState);
  const [deleteState, deleteFormAction] = useActionState(deleteAnnouncement, initialState);

  return (
    <article className="rounded-2xl bg-white p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <span className={`text-xs font-bold ${announcement.published ? "text-[var(--emerald)]" : "text-[var(--muted)]"}`}>
            {announcement.published ? "منشور" : "مسودة"}
          </span>
          <h2 className="mt-1 text-xl font-black text-[var(--emerald-deep)]">{announcement.title}</h2>
        </div>
        <form action={deleteFormAction}>
          <input type="hidden" name="id" value={announcement.id} />
          <SubmitButton pendingText="..." className="rounded-xl p-2 text-red-600 hover:bg-red-50">
            <Trash2 size={18} />
          </SubmitButton>
        </form>
      </div>
      {deleteState.error && <p className="mb-4 text-sm font-bold text-red-600">{deleteState.error}</p>}

      <form action={updateFormAction}>
        <input type="hidden" name="id" value={announcement.id} />
        <AnnouncementFields announcement={announcement} />
        {updateState.error && <p className="mt-4 text-sm font-bold text-red-600">{updateState.error}</p>}
        {updateState.success && <p className="mt-4 text-sm font-bold text-[var(--emerald)]">تم تحديث الإعلان بنجاح.</p>}
        <SubmitButton
          pendingText="جارٍ التحديث..."
          className="mt-5 rounded-xl border border-[var(--emerald)] px-5 py-3 text-sm font-bold text-[var(--emerald)] disabled:opacity-60"
        >
          تحديث الإعلان
        </SubmitButton>
      </form>
    </article>
  );
}
