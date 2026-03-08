"use client";
import { useState } from "react";

export default function CalorieCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;
    const act = parseFloat(activity) || 1.55;

    if (w <= 0 || h <= 0 || a <= 0) return;

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const maintenance = bmr * act;

    setResult({
      bmr,
      maintenance,
      weightLoss: maintenance - 500,
      weightGain: maintenance + 500,
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">الوزن (كجم)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="الوزن"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">الطول (سم)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="الطول"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">العمر</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="العمر"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">الجنس</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">مستوى النشاط</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="1.2">خامل (لا تمرين)</option>
          <option value="1.375">خفيف (1-3 أيام/أسبوع)</option>
          <option value="1.55">متوسط (3-5 أيام/أسبوع)</option>
          <option value="1.725">نشيط (6-7 أيام/أسبوع)</option>
          <option value="1.9">شديد النشاط</option>
        </select>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        حساب السعرات
      </button>

      {result && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">معدل الأيض الأساسي (BMR)</p>
            <p className="text-3xl font-bold">{Math.round(result.bmr)}</p>
            <p className="text-xs text-gray-400">سعرة/يوم</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">للإنقاص</p>
              <p className="text-xl font-bold text-blue-600">{Math.round(result.weightLoss)}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">للمحافظة</p>
              <p className="text-xl font-bold text-green-600">{Math.round(result.maintenance)}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">للزيادة</p>
              <p className="text-xl font-bold text-orange-600">{Math.round(result.weightGain)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
