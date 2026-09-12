import { redirect } from "next/navigation";
import { CalendarDays, Trash2 } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Announcement } from "@/lib/types";
import SubmitButton from "@/components/SubmitButton";
import { createAnnouncement, deleteAnnouncement, updateAnnouncement } from "./actions";

function toDateInput(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function AnnouncementFields({ announcement }: { announcement?: Announcement }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-bold text-[var(--emerald-deep)]">العنوان<input required name="title" defaultValue={announcement?.title} className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none" /></label>
      <label className="text-sm font-bold text-[var(--emerald-deep)]">التاريخ والوقت<input required type="datetime-local" name="startsAt" defaultValue={announcement ? toDateInput(announcement.starts_at) : undefined} className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none" /></label>
      <label className="text-sm font-bold text-[var(--emerald-deep)]">المتحدث<input name="speaker" defaultValue={announcement?.speaker ?? ""} className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none" /></label>
      <label className="text-sm font-bold text-[var(--emerald-deep)]">المكان<input name="location" defaultValue={announcement?.location ?? ""} className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none" /></label>
      <label className="text-sm font-bold text-[var(--emerald-deep)] sm:col-span-2">رابط الصورة (اختياري)<input type="url" name="imageUrl" defaultValue={announcement?.image_url ?? ""} className="mt-2 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none" /></label>
      <label className="text-sm font-bold text-[var(--emerald-deep)] sm:col-span-2">الوصف<textarea name="description" defaultValue={announcement?.description ?? ""} className="mt-2 h-28 w-full rounded-xl border border-[var(--line)] p-3 font-normal outline-none" /></label>
      <label className="flex items-center gap-2 text-sm font-bold text-[var(--emerald-deep)] sm:col-span-2"><input type="checkbox" name="published" defaultChecked={announcement?.published ?? true} /> نشر الإعلان للعامة</label>
    </div>
  );
}

export default async function AdminAnnouncementsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/dashboard/login");
  if (profile.role !== "admin") {
    return <p className="mx-auto max-w-4xl rounded-2xl bg-white p-8 text-center font-bold text-red-600">إدارة الإعلانات متاحة للمسؤول فقط.</p>;
  }

  const supabase = await createClient();
  const { data } = await supabase.from("announcements").select("*").order("starts_at", { ascending: false });
  const announcements = (data as Announcement[]) ?? [];

  return <div className="mx-auto max-w-5xl"><div className="flex items-center gap-3"><CalendarDays className="text-[var(--emerald)]" size={32} /><div><p className="text-sm font-bold text-[var(--emerald)]">إدارة المحتوى</p><h1 className="text-3xl font-black text-[var(--emerald-deep)]">إعلانات المسجد</h1></div></div><form action={createAnnouncement} className="mt-8 rounded-2xl bg-white p-6"><h2 className="mb-5 text-xl font-black text-[var(--emerald-deep)]">إضافة إعلان</h2><AnnouncementFields /><SubmitButton pendingText="جارٍ الحفظ..." className="mt-5 rounded-xl bg-[var(--emerald)] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">حفظ الإعلان</SubmitButton></form><div className="mt-8 space-y-5 pb-12">{announcements.map((announcement) => <article key={announcement.id} className="rounded-2xl bg-white p-6"><div className="mb-5 flex items-start justify-between gap-4"><div><span className={`text-xs font-bold ${announcement.published ? "text-[var(--emerald)]" : "text-[var(--muted)]"}`}>{announcement.published ? "منشور" : "مسودة"}</span><h2 className="mt-1 text-xl font-black text-[var(--emerald-deep)]">{announcement.title}</h2></div><form action={deleteAnnouncement}><input type="hidden" name="id" value={announcement.id} /><SubmitButton pendingText="..." className="rounded-xl p-2 text-red-600 hover:bg-red-50"><Trash2 size={18} /></SubmitButton></form></div><form action={updateAnnouncement}><input type="hidden" name="id" value={announcement.id} /><AnnouncementFields announcement={announcement} /><SubmitButton pendingText="جارٍ التحديث..." className="mt-5 rounded-xl border border-[var(--emerald)] px-5 py-3 text-sm font-bold text-[var(--emerald)] disabled:opacity-60">تحديث الإعلان</SubmitButton></form></article>)}</div></div>;
}
