import { MOSQUE_COORDINATES, PRAYER_TIMES_METHOD, PRAYER_TIMES_TUNE } from "@/lib/constants";

export type PrayerTimes = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export type PrayerTimesResult = {
  timings: PrayerTimes;
  hijriDate: string;
  gregorianDate: string;
};

const PRAYER_LABELS_AR: Record<keyof PrayerTimes, string> = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

export async function getTodayPrayerTimes(): Promise<PrayerTimesResult | null> {
  const { latitude, longitude } = MOSQUE_COORDINATES;
  const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${PRAYER_TIMES_METHOD}&tune=${PRAYER_TIMES_TUNE}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return null;

    const payload = await response.json();
    const timings = payload?.data?.timings;
    if (!timings) return null;

    return {
      timings: {
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      },
      hijriDate: `${payload.data.date.hijri.weekday.ar}، ${payload.data.date.hijri.day} ${payload.data.date.hijri.month.ar} ${payload.data.date.hijri.year}`,
      gregorianDate: payload.data.date.readable,
    };
  } catch {
    return null;
  }
}

export function prayerLabel(key: keyof PrayerTimes) {
  return PRAYER_LABELS_AR[key];
}

export function formatPrayerTime(time: string): string {
  const match = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i.exec(time.trim());
  if (!match) return time;

  const hour = Number(match[1]);
  const minute = match[2];
  const existingPeriod = match[3]?.toUpperCase();

  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return time;

  const hour12 = hour % 12 || 12;
  if (existingPeriod === "PM") {
    return `${hour === 12 ? 12 : hour % 12}:${minute}`;
  }
  if (existingPeriod === "AM") {
    return `${hour === 0 ? 12 : hour}:${minute}`;
  }

  return `${hour12}:${minute}`;
}
