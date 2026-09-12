import Image from "next/image";
import Link from "next/link";
import HonorificSuffix from "@/components/HonorificSuffix";
import MobileMenu from "@/components/MobileMenu";
import logo from "../../public/logo.jpg";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/quran", label: "القرآن" },
  { href: "/adhkar", label: "الأذكار" },
  { href: "/fatawa", label: "الفتاوى" },
  { href: "/social", label: "تواصل معنا" },
];

export default function SiteHeader() {
  return (
    <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
      <Link href="/" className="flex items-center gap-3">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-[var(--line)]">
          <Image src={logo} alt="شعار المسجد" fill sizes="44px" className="object-cover" priority />
        </span>
        <span>
          <strong className="block text-base font-bold text-[var(--emerald-deep)]">
            مسجد عثمان بن عفان
            <HonorificSuffix />
          </strong>
          <small className="text-xs text-[var(--muted)]">برقايل - عكار</small>
        </span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-semibold text-[var(--muted)] md:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-[var(--emerald)]">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}
