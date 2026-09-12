import HonorificSuffix from "@/components/HonorificSuffix";
import SocialLinks from "@/components/SocialLinks";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--emerald-deep)] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="text-sm text-emerald-100/70">
          مسجد عثمان بن عفان
          <HonorificSuffix />· برقايل - عكار
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
