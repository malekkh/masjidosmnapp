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
