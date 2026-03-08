"use client";
import { useState, useEffect, useCallback } from "react";
import { ARAB_CITIES, getPrayerTimes } from "@/lib/arabic/prayerTimes";

type City = typeof ARAB_CITIES[number];

export default function PrayerTimes() {
  const [city, setCity] = useState<City>(ARAB_CITIES[0]);
  const [times, setTimes] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  const loadTimes = useCallback(async () => {
    setLoading(true);
    try {
      const t = await getPrayerTimes(city.lat, city.lng, date);
      setTimes(t);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [city, date]);

  useEffect(() => {
    loadTimes();
  }, [loadTimes]);

  const prayers = times ? [
    { name: "الفجر", time: times.fajr, icon: "🌅" },
    { name: "الشروق", time: times.sunrise, icon: "🌄" },
    { name: "الظهر", time: times.dhuhr, icon: "☀️" },
    { name: "العصر", time: times.asr, icon: "🌤️" },
    { name: "المغرب", time: times.maghrib, icon: "🌅" },
    { name: "العشاء", time: times.isha, icon: "🌙" },
  ] : [];

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">اختر المدينة</label>
        <select
          value={city.name}
          onChange={(e) => {
            const c = ARAB_CITIES.find((c) => c.name === e.target.value);
            if (c) setCity(c);
          }}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
        >
          {ARAB_CITIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">التاريخ</label>
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">جاري تحميل المواقيت...</p>
        </div>
      ) : times ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center"
            >
              <div className="text-2xl mb-2">{prayer.icon}</div>
              <div className="font-bold">{prayer.name}</div>
              <div className="text-xl text-primary font-bold mt-1">{prayer.time}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="text-center text-sm text-gray-500">
        <p>الموقع: {city.name}</p>
        <p>خط العرض: {city.lat.toFixed(4)} | خط الطول: {city.lng.toFixed(4)}</p>
      </div>
    </div>
  );
}
