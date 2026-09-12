"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type AuthState = { error?: string };

export async function signUp(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email) {
    return { error: "الاسم والبريد الإلكتروني مطلوبان." };
  }
  if (password.length < 6) {
    return { error: "كلمة المرور يجب ألا تقل عن 6 أحرف." };
  }

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

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) {
    return { error: "تم إنشاء الحساب، لكن تعذّر تسجيل الدخول تلقائيًا. جرّب تسجيل الدخول يدويًا." };
  }

  redirect("/account");
}

export async function signInVisitor(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "بيانات الدخول غير صحيحة." };
  }

  redirect("/account");
}

export async function signOutVisitor() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/fatawa");
}
