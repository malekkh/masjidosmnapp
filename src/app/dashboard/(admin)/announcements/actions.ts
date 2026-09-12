"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";

export type AnnouncementActionState = { error?: string; success?: boolean };

function readAnnouncement(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const speaker = String(formData.get("speaker") ?? "").trim() || null;
  const location = String(formData.get("location") ?? "").trim() || null;
  const startsAt = String(formData.get("startsAt") ?? "");
  const published = formData.get("published") === "on";
  const date = new Date(startsAt);

  if (!title || Number.isNaN(date.getTime())) return null;
  return {
    title,
    description,
    speaker,
    location,
    starts_at: date.toISOString(),
    published,
  };
}

async function requireAdmin() {
  const profile = await getCurrentProfile();
  return profile?.role === "admin" ? profile : null;
}

export async function createAnnouncement(
  _prevState: AnnouncementActionState,
  formData: FormData,
): Promise<AnnouncementActionState> {
  const profile = await requireAdmin();
  if (!profile) return { error: "هذا الإجراء متاح للمسؤول فقط." };

  const announcement = readAnnouncement(formData);
  if (!announcement) return { error: "يرجى إدخال العنوان والتاريخ بشكل صحيح." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .insert({ ...announcement, created_by: profile.id })
    .select()
    .single();

  if (error) return { error: `تعذّر حفظ الإعلان: ${error.message}` };
  if (!data)
    return {
      error: "تعذّر حفظ الإعلان: لم يتم إرجاع أي بيانات من قاعدة البيانات.",
    };

  revalidatePath("/announcements");
  revalidatePath("/dashboard/announcements");
  return { success: true };
}

export async function updateAnnouncement(
  _prevState: AnnouncementActionState,
  formData: FormData,
): Promise<AnnouncementActionState> {
  const profile = await requireAdmin();
  if (!profile) return { error: "هذا الإجراء متاح للمسؤول فقط." };

  const announcement = readAnnouncement(formData);
  const id = String(formData.get("id") ?? "");
  if (!announcement || !id) return { error: "بيانات الإعلان غير مكتملة." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .update(announcement)
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: `تعذّر تحديث الإعلان: ${error.message}` };
  if (!data)
    return {
      error: "تعذّر تحديث الإعلان: لم يتم إرجاع أي بيانات من قاعدة البيانات.",
    };

  revalidatePath("/announcements");
  revalidatePath("/dashboard/announcements");
  return { success: true };
}

export async function deleteAnnouncement(
  _prevState: AnnouncementActionState,
  formData: FormData,
): Promise<AnnouncementActionState> {
  const profile = await requireAdmin();
  if (!profile) return { error: "هذا الإجراء متاح للمسؤول فقط." };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "معرّف الإعلان مطلوب." };

  const supabase = await createClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) return { error: `تعذّر حذف الإعلان: ${error.message}` };

  revalidatePath("/announcements");
  revalidatePath("/dashboard/announcements");
  return { success: true };
}
