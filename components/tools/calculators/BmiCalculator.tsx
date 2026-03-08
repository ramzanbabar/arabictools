"use client";
import { useState } from "react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    idealWeight: { min: number; max: number };
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const h = (parseFloat(height) || 0) / 100; // Convert cm to m

    if (w <= 0 || h <= 0) return;

    const bmi = w / (h * h);

    let category: string;
    let color: string;

    if (bmi < 18.5) {
      category = "نقص الوزن";
      color = "text-blue-600";
    } else if (bmi < 25) {
      category = "وزن طبيعي";
      color = "text-green-600";
    } else if (bmi < 30) {
      category = "زيادة وزن";
      color = "text-yellow-600";
    } else {
      category = "سمنة";
      color = "text-red-600";
    }

    const idealWeight = {
      min: 18.5 * h * h,
      max: 24.9 * h * h,
    };

    setResult({ bmi, category, color, idealWeight });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">الوزن (كجم)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="أدخل وزنك"
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
          placeholder="أدخل طولك"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        حساب مؤشر كتلة الجسم
      </button>

      {result && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">مؤشر كتلة الجسم</p>
            <p className="text-5xl font-bold">{result.bmi.toFixed(1)}</p>
            <p className={`text-xl font-bold mt-2 ${result.color}`}>{result.category}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-2">الوزن المثالي لطولك:</p>
            <p className="font-bold">
              {result.idealWeight.min.toFixed(1)} - {result.idealWeight.max.toFixed(1)} كجم
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2">
              <div className="font-bold">&lt;18.5</div>
              <div className="text-gray-500">نقص</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2">
              <div className="font-bold">18.5-24.9</div>
              <div className="text-gray-500">طبيعي</div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2">
              <div className="font-bold">25-29.9</div>
              <div className="text-gray-500">زيادة</div>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-2">
              <div className="font-bold">≥30</div>
              <div className="text-gray-500">سمنة</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
