"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";

function readAnnouncement(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const speaker = String(formData.get("speaker") ?? "").trim() || null;
  const location = String(formData.get("location") ?? "").trim() || null;
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const startsAt = String(formData.get("startsAt") ?? "");
  const published = formData.get("published") === "on";
  const date = new Date(startsAt);

  if (!title || Number.isNaN(date.getTime())) return null;
  return { title, description, speaker, location, image_url: imageUrl, starts_at: date.toISOString(), published };
}

async function requireAdmin() {
  const profile = await getCurrentProfile();
  return profile?.role === "admin" ? profile : null;
}

export async function createAnnouncement(formData: FormData) {
  const profile = await requireAdmin();
  const announcement = readAnnouncement(formData);
  if (!profile || !announcement) return;

  const supabase = await createClient();
  await supabase.from("announcements").insert({ ...announcement, created_by: profile.id });
  revalidatePath("/announcements");
  revalidatePath("/dashboard/announcements");
}

export async function updateAnnouncement(formData: FormData) {
  const profile = await requireAdmin();
  const announcement = readAnnouncement(formData);
  const id = String(formData.get("id") ?? "");
  if (!profile || !announcement || !id) return;

  const supabase = await createClient();
  await supabase.from("announcements").update(announcement).eq("id", id);
  revalidatePath("/announcements");
  revalidatePath("/dashboard/announcements");
}

export async function deleteAnnouncement(formData: FormData) {
  const profile = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!profile || !id) return;

  const supabase = await createClient();
  await supabase.from("announcements").delete().eq("id", id);
  revalidatePath("/announcements");
  revalidatePath("/dashboard/announcements");
}
