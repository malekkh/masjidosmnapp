"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type SubmitQuestionState = { error?: string; success?: boolean };

export async function submitQuestion(_prevState: SubmitQuestionState, formData: FormData): Promise<SubmitQuestionState> {
  const question = String(formData.get("question") ?? "").trim();
  const category = String(formData.get("category") ?? "عام");
  const isAnonymous = formData.get("is_anonymous") === "on";

  if (question.length < 10) {
    return { error: "يرجى كتابة سؤال لا يقل عن 10 أحرف." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("questions").insert({
    question,
    category,
    is_anonymous: isAnonymous,
    user_id: user && !isAnonymous ? user.id : null,
  });

  if (error) {
    return { error: "تعذّر إرسال السؤال، يرجى المحاولة مرة أخرى." };
  }

  revalidatePath("/fatawa");
  return { success: true };
}
