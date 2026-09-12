import { redirect } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Announcement } from "@/lib/types";
import CreateAnnouncementForm from "@/components/CreateAnnouncementForm";
import AnnouncementItemForm from "@/components/AnnouncementItemForm";

export default async function AdminAnnouncementsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/dashboard/login");
  if (profile.role !== "admin") {
    return (
      <p className="mx-auto max-w-4xl rounded-2xl bg-white p-8 text-center font-bold text-red-600">
        إدارة الإعلانات متاحة للمسؤول فقط.
      </p>
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("announcements").select("*").order("starts_at", { ascending: false });
  if (error) throw new Error(`Announcement list failed: ${error.message}`);
  const announcements = (data as Announcement[]) ?? [];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center gap-3">
        <CalendarDays className="text-[var(--emerald)]" size={32} />
        <div>
          <p className="text-sm font-bold text-[var(--emerald)]">إدارة المحتوى</p>
          <h1 className="text-3xl font-black text-[var(--emerald-deep)]">إعلانات المسجد</h1>
        </div>
      </div>

      <CreateAnnouncementForm />

      <div className="mt-8 space-y-5 pb-12">
        {announcements.map((announcement) => (
          <AnnouncementItemForm key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  );
}
