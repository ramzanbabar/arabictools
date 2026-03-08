"use client";
import { useState } from "react";
import { gregorianToHijri, hijriToGregorian, getTodayHijri, HIJRI_MONTHS } from "@/lib/arabic/hijri";

export default function HijriConverter() {
  const today = new Date();
  const [gregorianDate, setGregorianDate] = useState(today.toISOString().split("T")[0]);
  const [hijriDay, setHijriDay] = useState("1");
  const [hijriMonth, setHijriMonth] = useState("1");
  const [hijriYear, setHijriYear] = useState("1446");
  const [mode, setMode] = useState<"g2h" | "h2g">("g2h");
  const [result, setResult] = useState<{ type: string; value: string } | null>(null);

  const todayHijri = getTodayHijri();

  const convertGregorianToHijri = () => {
    const date = new Date(gregorianDate);
    const hijri = gregorianToHijri(date);
    setResult({
      type: "hijri",
      value: `${hijri.day} ${HIJRI_MONTHS[hijri.month - 1]} ${hijri.year} هـ`,
    });
  };

  const convertHijriToGregorian = () => {
    const gregorian = hijriToGregorian(parseInt(hijriYear), parseInt(hijriMonth), parseInt(hijriDay));
    const formatted = gregorian.toLocaleDateString("ar-SA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setResult({
      type: "gregorian",
      value: formatted,
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="bg-primary/10 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">التاريخ اليوم</p>
        <p className="text-lg font-bold text-primary">{todayHijri}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMode("g2h")}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
            mode === "g2h"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          ميلادي → هجري
        </button>
        <button
          onClick={() => setMode("h2g")}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
            mode === "h2g"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          هجري → ميلادي
        </button>
      </div>

      {mode === "g2h" ? (
        <div>
          <label className="block text-sm font-medium mb-2">التاريخ الميلادي</label>
          <input
            type="date"
            value={gregorianDate}
            onChange={(e) => setGregorianDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
            dir="ltr"
          />
          <button
            onClick={convertGregorianToHijri}
            className="w-full mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
          >
            تحويل إلى هجري
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">اليوم</label>
              <input
                type="number"
                value={hijriDay}
                onChange={(e) => setHijriDay(e.target.value)}
                min="1"
                max="30"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الشهر</label>
              <select
                value={hijriMonth}
                onChange={(e) => setHijriMonth(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
              >
                {HIJRI_MONTHS.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">السنة</label>
              <input
                type="number"
                value={hijriYear}
                onChange={(e) => setHijriYear(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
                dir="ltr"
              />
            </div>
          </div>
          <button
            onClick={convertHijriToGregorian}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
          >
            تحويل إلى ميلادي
          </button>
        </div>
      )}

      {result && (
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">
            {result.type === "hijri" ? "التاريخ الهجري" : "التاريخ الميلادي"}
          </p>
          <p className="text-2xl font-bold">{result.value}</p>
        </div>
      )}
    </div>
  );
}
