export const MOSQUE_NAME = "مسجد عثمان بن عفان";
export const MOSQUE_LOCATION_NAME = "برقايل - عكار";

// Berqayel (Berkail), Akkar Governorate, Lebanon
export const MOSQUE_COORDINATES = {
  latitude: 34.4775,
  longitude: 36.03389,
};

// Same official Google Maps link published on the mosque's own site
// (https://masjid-osman-bn-affan-berqayel.netlify.app/).
export const MOSQUE_MAPS_URL = "https://maps.google.com/?q=مسجد+عثمان+بن+عفان+برقايل+عكار";

// Aladhan calculation method: 5 = Egyptian General Authority of Survey (Fajr 19.5°, Isha 17.5°)
// Used across Lebanon/Syria/Egypt — Aladhan has no dedicated Lebanese Dar al-Fatwa preset.
export const PRAYER_TIMES_METHOD = 5;

// Per-prayer minute offsets calibrated against the "tripoli_2021" timetable (Assalatu Noor app)
// to match local Tripoli/Akkar timings. Order: Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight.
export const PRAYER_TIMES_TUNE = "0,8,1,3,1,5,0,3,0";

export const PRAYER_TIMES_SOURCE_NAME = "دار الفتوى اللبنانية";
