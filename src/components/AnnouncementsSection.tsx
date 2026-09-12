import { CalendarDays, ChevronLeft, MapPin } from "lucide-react";

const announcements = [
  {
    label: "درس أسبوعي",
    title: "شرح كتاب رياض الصالحين",
    detail: "كل خميس · بعد العشاء",
    speaker: "الشيخ محمد العتيبي",
    className: "bg-[#e5f0ea] text-[var(--emerald-deep)]",
  },
  {
    label: "محاضرة قادمة",
    title: "فقه الصيام وأحكامه",
    detail: "السبت ٢١ ربيع الآخر · ٨:٣٠ م",
    speaker: "مصلى الرجال",
    className: "bg-[var(--amber)] text-[var(--emerald-deep)]",
  },
];

export default function AnnouncementsSection() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-bold text-[var(--amber)]">نعيش الخير معًا</p>
          <h2 className="text-3xl font-black text-[var(--emerald-deep)]">أحدث الأنشطة والدروس</h2>
        </div>
        <a href="#events" className="hidden items-center gap-1 text-sm font-bold text-[var(--emerald)] sm:flex">
          عرض الكل <ChevronLeft size={17} />
        </a>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {announcements.map((announcement) => (
          <article key={announcement.title} className={`rounded-2xl p-6 ${announcement.className}`}>
            <span className="text-xs font-bold">{announcement.label}</span>
            <h3 className="mt-12 text-xl font-extrabold">{announcement.title}</h3>
            <p className="mt-3 flex items-center gap-2 text-sm opacity-75">
              <CalendarDays size={15} /> {announcement.detail}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm opacity-75">
              <MapPin size={15} /> {announcement.speaker}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
