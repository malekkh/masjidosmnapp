import type { Announcement } from "@/lib/types";

export function toDateInput(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function AnnouncementFields({ announcement }: { announcement?: Announcement }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-bold text-[var(--emerald-deep)]">
        العنوان
        <input
          required
          name="title"
          defaultValue={announcement?.title}
          className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none"
        />
      </label>
      <label className="text-sm font-bold text-[var(--emerald-deep)]">
        التاريخ والوقت
        <input
          required
          type="datetime-local"
          name="startsAt"
          defaultValue={announcement ? toDateInput(announcement.starts_at) : undefined}
          className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none"
        />
      </label>
      <label className="text-sm font-bold text-[var(--emerald-deep)]">
        المتحدث
        <input
          name="speaker"
          defaultValue={announcement?.speaker ?? ""}
          className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none"
        />
      </label>
      <label className="text-sm font-bold text-[var(--emerald-deep)]">
        المكان
        <input
          name="location"
          defaultValue={announcement?.location ?? ""}
          className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none"
        />
      </label>
      <label className="text-sm font-bold text-[var(--emerald-deep)] sm:col-span-2">
        الوصف
        <textarea
          name="description"
          defaultValue={announcement?.description ?? ""}
          className="mt-2 h-28 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none"
        />
      </label>
      <label className="flex items-center gap-2 text-sm font-bold text-[var(--emerald-deep)] sm:col-span-2">
        <input type="checkbox" name="published" defaultChecked={announcement?.published ?? true} /> نشر الإعلان للعامة
      </label>
    </div>
  );
}
