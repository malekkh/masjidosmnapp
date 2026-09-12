"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { getCurrentProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export type CreateSheikhState = {
  error?: string;
  success?: { email: string; password: string };
};

function generatePassword() {
  return randomBytes(9).toString("base64url");
}

export async function createSheikhAccount(
  _prevState: CreateSheikhState,
  formData: FormData
): Promise<CreateSheikhState> {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    return { error: "غير مصرح لك بتنفيذ هذا الإجراء." };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const providedPassword = String(formData.get("password") ?? "").trim();

  if (!fullName || !email) {
    return { error: "الاسم والبريد الإلكتروني مطلوبان." };
  }
  if (providedPassword && providedPassword.length < 6) {
    return { error: "كلمة المرور يجب ألا تقل عن 6 أحرف." };
  }

  const password = providedPassword || generatePassword();
  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (error || !data.user) {
    const message = error?.message.toLowerCase() ?? "";
    if (message.includes("already") || message.includes("registered")) {
      return { error: "هذا البريد الإلكتروني مسجّل مسبقًا." };
    }
    return { error: "تعذّر إنشاء الحساب، تحقق من صحة البيانات." };
  }

  const { error: roleError } = await admin.from("profiles").update({ role: "sheikh" }).eq("id", data.user.id);
  if (roleError) {
    return { error: "تم إنشاء الحساب لكن تعذّر تعيين صلاحية الشيخ. راجع لوحة Supabase." };
  }

  revalidatePath("/dashboard/sheikhs");
  return { success: { email, password } };
}
