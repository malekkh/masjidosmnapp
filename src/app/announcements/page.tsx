import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Announcement } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ar-LB", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 7);
  const untilDate = new Date();
  untilDate.setDate(untilDate.getDate() + 7);
  const { data, error } = await supabase
    .from("announcements")
    .select(
      "id, title, description, speaker, starts_at, location, published, created_by, created_at",
    )
    .eq("published", true)
    .gte("starts_at", sinceDate.toISOString())
    .lte("starts_at", untilDate.toISOString())
    .order("starts_at", { ascending: false })
    .limit(20);

  if (error) throw new Error(`Announcements list failed: ${error.message}`);
  const announcements = (data as Announcement[]) ?? [];

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة للرئيسية
        </Link>
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--amber)]">
              آخر المستجدات
            </p>
            <h1 className="mt-2 text-4xl font-black text-[var(--emerald-deep)]">
              إعلانات المسجد
            </h1>
          </div>
          <CalendarDays className="text-[var(--emerald)]" size={40} />
        </div>

        {announcements.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-[var(--line)] p-10 text-center text-sm text-[var(--muted)]">
            لا توجد إعلانات منشورة حاليًا.
          </p>
        ) : (
          <div className="mt-10 space-y-5 pb-16">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
              >
                <div className="p-6">
                  <p className="flex items-center gap-2 text-xs font-bold text-[var(--amber)]">
                    <CalendarDays size={15} />{" "}
                    {formatDate(announcement.starts_at)}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-[var(--emerald-deep)]">
                    {announcement.title}
                  </h2>
                  {announcement.description && (
                    <p className="mt-4 whitespace-pre-line leading-8 text-[var(--muted)]">
                      {announcement.description}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                    {announcement.speaker && (
                      <span>مع {announcement.speaker}</span>
                    )}
                    {announcement.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} /> {announcement.location}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
