import { ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { SocialLink } from "@/lib/types";
import { FacebookIcon, InstagramIcon, TiktokIcon, WhatsappIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

const ICONS: Record<string, (props: { size?: number; className?: string }) => React.JSX.Element> = {
  whatsapp: WhatsappIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
};

export default async function SocialLinks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });

  const links = (data as SocialLink[]) ?? [];
  if (links.length === 0) return null;

  return (
    <div className="flex gap-3 text-emerald-100/70">
      {links.map((link) => {
        const Icon = ICONS[link.platform] ?? ExternalLink;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="hover:text-white"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
