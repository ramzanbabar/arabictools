export const ARAB_CITIES = [
  { name:"الرياض",        lat:24.6877, lng:46.7219 },
  { name:"جدة",           lat:21.5433, lng:39.1728 },
  { name:"مكة المكرمة",   lat:21.3891, lng:39.8579 },
  { name:"دبي",           lat:25.2048, lng:55.2708 },
  { name:"أبوظبي",        lat:24.4539, lng:54.3773 },
  { name:"القاهرة",       lat:30.0444, lng:31.2357 },
  { name:"بغداد",         lat:33.3152, lng:44.3661 },
  { name:"الكويت",        lat:29.3759, lng:47.9774 },
  { name:"الدوحة",        lat:25.2854, lng:51.5310 },
  { name:"عمّان",         lat:31.9454, lng:35.9284 },
  { name:"بيروت",         lat:33.8938, lng:35.5018 },
  { name:"المنامة",       lat:26.2235, lng:50.5876 },
] as const;

function fmt(d: Date) {
  return new Intl.DateTimeFormat("ar-SA", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(d);
}

// NOTE: call this inside useEffect ONLY
export async function getPrayerTimes(lat: number, lng: number, date = new Date()) {
  const { Coordinates, CalculationMethod, PrayerTimes } = await import("adhan");
  const coords = new Coordinates(lat, lng);
  const params = CalculationMethod.MuslimWorldLeague();
  const pt = new PrayerTimes(coords, date, params);
  return {
    fajr:    fmt(pt.fajr),
    sunrise: fmt(pt.sunrise),
    dhuhr:   fmt(pt.dhuhr),
    asr:     fmt(pt.asr),
    maghrib: fmt(pt.maghrib),
    isha:    fmt(pt.isha),
  };
}
