import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Question } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const category = searchParams.get("category")?.trim() ?? "";

  const supabase = await createClient();
  let query = supabase
    .from("questions")
    .select("*")
    .eq("status", "answered")
    .order("answered_at", { ascending: false })
    .limit(30);

  if (category) query = query.eq("category", category);
  if (q) query = query.ilike("question", `%${q}%`);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: "تعذّر جلب الإجابات" }, { status: 500 });
  }

  return NextResponse.json((data as Question[]) ?? [], {
    headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=120" },
  });
}
