"use client";
import { useState } from "react";

const CURRENCIES = [
  { code: "SAR", name: "ريال سعودي", symbol: "ر.س" },
  { code: "AED", name: "درهم إماراتي", symbol: "د.إ" },
  { code: "USD", name: "دولار أمريكي", symbol: "$" },
  { code: "EUR", name: "يورو", symbol: "€" },
  { code: "GBP", name: "جنيه إسترليني", symbol: "£" },
  { code: "KWD", name: "دينار كويتي", symbol: "د.ك" },
  { code: "QAR", name: "ريال قطري", symbol: "ر.ق" },
  { code: "BHD", name: "دينار بحريني", symbol: "د.ب" },
  { code: "EGP", name: "جنيه مصري", symbol: "ج.م" },
  { code: "JOD", name: "دينار أردني", symbol: "د.أ" },
];

// Approximate rates (for demo)
const RATES: Record<string, number> = {
  SAR: 1,
  AED: 0.98,
  USD: 3.75,
  EUR: 4.10,
  GBP: 4.80,
  KWD: 12.25,
  QAR: 1.03,
  BHD: 9.95,
  EGP: 0.12,
  JOD: 5.29,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("SAR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const num = parseFloat(amount) || 0;
    const fromRate = RATES[from] || 1;
    const toRate = RATES[to] || 1;

    const inSAR = num * fromRate;
    const converted = inSAR / toRate;

    setResult(converted);
  };

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setResult(null);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-sm text-center">
        ⚠️ الأسعار تقريبية وللتداول الفعلي يرجى مراجعة البنوك
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">المبلغ</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="أدخل المبلغ"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-2xl"
          dir="ltr"
        />
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">من</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={swap}
          className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          ⇄
        </button>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">إلى</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={convert}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        تحويل
      </button>

      {result !== null && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">النتيجة</p>
          <p className="text-4xl font-bold">{result.toFixed(2)}</p>
          <p className="text-lg text-gray-500">
            {CURRENCIES.find((c) => c.code === to)?.symbol} {CURRENCIES.find((c) => c.code === to)?.name}
          </p>
        </div>
      )}
    </div>
  );
}
