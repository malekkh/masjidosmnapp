"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function answerQuestion(formData: FormData) {
  const questionId = String(formData.get("questionId"));
  const answer = String(formData.get("answer") ?? "").trim();
  if (!answer) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("questions")
    .update({ answer, status: "answered", answered_by: user.id, answered_at: new Date().toISOString() })
    .eq("id", questionId);

  revalidatePath("/dashboard/questions");
  revalidatePath("/fatawa");
}

export async function rejectQuestion(formData: FormData) {
  const questionId = String(formData.get("questionId"));

  const supabase = await createClient();
  await supabase.from("questions").update({ status: "rejected" }).eq("id", questionId);

  revalidatePath("/dashboard/questions");
}
