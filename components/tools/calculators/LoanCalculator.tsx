"use client";
import { useState } from "react";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;

    if (P <= 0 || r <= 0 || n <= 0) return;

    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">مبلغ القرض</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="أدخل مبلغ القرض"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">نسبة الفائدة السنوية (%)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="مثال: 5"
          step="0.1"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">مدة القرض (سنوات)</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="مثال: 5"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        حساب الأقساط
      </button>

      {result && (
        <div className="space-y-4">
          <div className="bg-primary/10 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">القسط الشهري</p>
            <p className="text-4xl font-bold text-primary">{result.monthlyPayment.toFixed(2)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">إجمالي السداد</p>
              <p className="text-xl font-bold">{result.totalPayment.toFixed(2)}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">إجمالي الفائدة</p>
              <p className="text-xl font-bold text-red-600">{result.totalInterest.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
