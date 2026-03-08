"use client";
import { useState } from "react";

const VAT_RATE = 0.05; // 5% for UAE

export default function VatCalculatorUAE() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [result, setResult] = useState<{
    netAmount: number;
    vat: number;
    total: number;
  } | null>(null);

  const calculate = () => {
    const num = parseFloat(amount);
    if (isNaN(num)) return;

    if (mode === "exclusive") {
      const vat = num * VAT_RATE;
      setResult({
        netAmount: num,
        vat,
        total: num + vat,
      });
    } else {
      const netAmount = num / (1 + VAT_RATE);
      const vat = num - netAmount;
      setResult({
        netAmount,
        vat,
        total: num,
      });
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="bg-primary/10 rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-primary">5%</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">نسبة ضريبة القيمة المضافة في الإمارات</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">المبلغ (درهم إماراتي)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="أدخل المبلغ"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMode("exclusive")}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
            mode === "exclusive"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          بدون ضريبة
        </button>
        <button
          onClick={() => setMode("inclusive")}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
            mode === "inclusive"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          شامل الضريبة
        </button>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        حساب الضريبة
      </button>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">المبلغ الأساسي</p>
              <p className="text-xl font-bold">{result.netAmount.toFixed(2)}</p>
              <p className="text-xs text-gray-400">درهم</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">الضريبة (5%)</p>
              <p className="text-xl font-bold text-primary">{result.vat.toFixed(2)}</p>
              <p className="text-xs text-gray-400">درهم</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">المبلغ الإجمالي</p>
              <p className="text-xl font-bold text-green-600">{result.total.toFixed(2)}</p>
              <p className="text-xs text-gray-400">درهم</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
