import Link from "next/link";
import { ExternalLink, MapPin, Share2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase/server";
import type { SocialLink } from "@/lib/types";
import { FacebookIcon, InstagramIcon, TiktokIcon, WhatsappIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import { MOSQUE_LOCATION_NAME, MOSQUE_MAPS_URL } from "@/lib/constants";

const PLATFORM_META: Record<string, { label: string; handle: string; Icon: (props: { size?: number; className?: string }) => React.JSX.Element }> = {
  whatsapp: { label: "واتساب", handle: "قناة إعلانات المسجد", Icon: WhatsappIcon },
  facebook: { label: "فيسبوك", handle: "صفحتنا الرسمية", Icon: FacebookIcon },
  instagram: { label: "إنستغرام", handle: "@masjid_osman_bn_affan", Icon: InstagramIcon },
  youtube: { label: "يوتيوب", handle: "خطب ومحاضرات", Icon: YoutubeIcon },
  tiktok: { label: "تيك توك", handle: "@masjid_osman_bn_affan", Icon: TiktokIcon },
};

export default async function SocialPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });

  const links = (data as SocialLink[]) ?? [];

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة للرئيسية
        </Link>

        <div className="mt-8 text-center">
          <Share2 className="mx-auto text-[var(--emerald)]" size={40} />
          <h1 className="mt-4 text-4xl font-black text-[var(--emerald-deep)]">حسابات التواصل الاجتماعي</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">تابعوا مسجد عثمان بن عفان على منصاتنا الرسمية</p>
        </div>

        <a
          href={MOSQUE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-5 transition hover:border-[var(--amber)]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5ecd9] text-[var(--amber)]">
            <MapPin size={22} />
          </span>
          <span className="flex-1">
            <strong className="block text-base text-[var(--emerald-deep)]">الموقع على الخرائط</strong>
            <small className="text-xs text-[var(--muted)]">{MOSQUE_LOCATION_NAME}</small>
          </span>
          <ExternalLink className="shrink-0 text-[var(--muted)]" size={18} />
        </a>

        {links.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
            لا توجد حسابات تواصل اجتماعي متاحة حاليًا.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 pb-16 sm:grid-cols-2">
            {links.map((link) => {
              const meta = PLATFORM_META[link.platform];
              const Icon = meta?.Icon ?? ExternalLink;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-5 transition hover:border-[var(--emerald)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e7f1eb] text-[var(--emerald)]">
                    <Icon size={22} />
                  </span>
                  <span className="flex-1">
                    <strong className="block text-base text-[var(--emerald-deep)]">
                      {meta?.label ?? link.platform}
                    </strong>
                    <small className="text-xs text-[var(--muted)]">{meta?.handle ?? link.url}</small>
                  </span>
                  <ExternalLink className="shrink-0 text-[var(--muted)]" size={18} />
                </a>
              );
            })}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
