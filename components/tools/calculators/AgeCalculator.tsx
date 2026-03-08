"use client";
import { useState } from "react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: daysUntilBirthday,
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">تاريخ الميلاد</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        حساب العمر
      </button>

      {result && (
        <div className="space-y-4">
          <div className="bg-primary/10 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">عمرك</p>
            <p className="text-4xl font-bold text-primary">
              {result.years} سنة
            </p>
            <p className="text-lg text-gray-500">
              و {result.months} شهر و {result.days} يوم
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{result.totalDays.toLocaleString("ar-SA")}</p>
              <p className="text-xs text-gray-500">يوم</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{result.totalWeeks.toLocaleString("ar-SA")}</p>
              <p className="text-xs text-gray-500">أسبوع</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{result.totalMonths}</p>
              <p className="text-xs text-gray-500">شهر</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{Math.floor(result.totalDays / 365)}</p>
              <p className="text-xs text-gray-500">سنة</p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">عيد ميلادك القادم بعد</p>
            <p className="text-2xl font-bold text-green-600">{result.nextBirthday} يوم</p>
          </div>
        </div>
      )}
    </div>
  );
}
