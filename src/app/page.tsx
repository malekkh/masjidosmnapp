import { ArrowLeft, BookOpen, CalendarDays, ChevronLeft, Clock3, HeartHandshake, MapPin, MessageCircleQuestion, MoonStar } from "lucide-react";
import Link from "next/link";
import HonorificSuffix from "@/components/HonorificSuffix";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getTodayPrayerTimes, prayerLabel, type PrayerTimes } from "@/lib/prayer-times";
import { MOSQUE_LOCATION_NAME, PRAYER_TIMES_SOURCE_NAME } from "@/lib/constants";

const quickLinks = [
  ["القرآن الكريم", "تلاوة وتدبر", BookOpen, "/quran"],
  ["أذكار", "حصن المسلم", MoonStar, "/adhkar"],
  ["العبادات", "دليل الطاعات", HeartHandshake, "/ibadah"],
  ["اسأل عن دينك", "إجابة موثوقة", MessageCircleQuestion, "/fatawa"],
  ["إعلانات المسجد", "آخر المستجدات", CalendarDays, "/announcements"],
] as const;

const PRAYER_ORDER: (keyof PrayerTimes)[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default async function Home() {
  const prayerTimes = await getTodayPrayerTimes();

  return (
    <main className="min-h-screen overflow-hidden">
      <SiteHeader />

      <section id="prayer" className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-20 lg:pt-16">
        <div className="flex flex-col justify-center">
          <p className="mb-5 flex items-center gap-2 text-sm font-bold text-[var(--amber)]">
            <span className="h-px w-8 bg-[var(--amber)]" /> السلام عليكم ورحمة الله وبركاته
          </p>
          <h1 className="max-w-xl text-4xl font-black leading-[1.25] tracking-tight text-[var(--emerald-deep)] sm:text-5xl">
            مسجد عثمان بن عفان
            <HonorificSuffix sizeClassName="text-[0.5em]" />
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-[var(--muted)]">
            نقرّب إليكم المسجد، ونشارككم مواقيت الصلاة والدروس والذكر في كل يوم.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quran" className="flex items-center gap-2 rounded-xl bg-[var(--emerald)] px-5 py-3 text-sm font-bold text-white">
              ابدأ التلاوة <ArrowLeft size={17} />
            </Link>
          </div>
        </div>

        <div className="relative rounded-[2rem] bg-[var(--emerald-deep)] p-6 text-white shadow-2xl sm:p-9">
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm text-emerald-100/70">{prayerTimes?.hijriDate ?? "مواقيت اليوم"}</p>
              <h2 className="mt-2 text-2xl font-extrabold">مواقيت الصلاة اليوم</h2>
            </div>
            <Clock3 className="text-[var(--amber)]" size={27} />
          </div>

          {prayerTimes ? (
            <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {PRAYER_ORDER.map((key) => (
                <div key={key} className="rounded-xl bg-white/7 px-1 py-3 text-center">
                  <p className="text-xs opacity-75">{prayerLabel(key)}</p>
                  <p className="mt-1 text-lg font-bold">{prayerTimes.timings[key]}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-xl bg-white/7 p-4 text-center text-sm text-emerald-100/70">
              تعذّر جلب مواقيت الصلاة حاليًا، يرجى المحاولة لاحقًا.
            </p>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-emerald-100/70">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> {MOSQUE_LOCATION_NAME}
            </span>
            <span>{PRAYER_TIMES_SOURCE_NAME}</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[var(--line)] px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5 lg:px-10">
          {quickLinks.map(([title, detail, Icon, href]) => (
            <Link href={href} key={title} className="group flex items-center gap-4 px-2 py-5 sm:px-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f1eb] text-[var(--emerald)]">
                <Icon size={22} />
              </span>
              <span>
                <strong className="block text-sm text-[var(--emerald-deep)]">{title}</strong>
                <small className="text-xs text-[var(--muted)]">{detail}</small>
              </span>
              <ChevronLeft className="mr-auto text-[var(--muted)]" size={17} />
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
