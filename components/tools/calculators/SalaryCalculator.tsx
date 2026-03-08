"use client";
import { useState } from "react";

export default function SalaryCalculator() {
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");
  const [result, setResult] = useState<{
    gross: number;
    net: number;
    totalDeductions: number;
  } | null>(null);

  const calculate = () => {
    const basic = parseFloat(basicSalary) || 0;
    const allow = parseFloat(allowances) || 0;
    const deduct = parseFloat(deductions) || 0;

    const gross = basic + allow;
    const net = gross - deduct;

    setResult({
      gross,
      net,
      totalDeductions: deduct,
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">الراتب الأساسي</label>
        <input
          type="number"
          value={basicSalary}
          onChange={(e) => setBasicSalary(e.target.value)}
          placeholder="أدخل الراتب الأساسي"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">البدلات والحوافز</label>
        <input
          type="number"
          value={allowances}
          onChange={(e) => setAllowances(e.target.value)}
          placeholder="سكن، نقل، إلخ..."
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الاستقطاعات</label>
        <input
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          placeholder="تأمينات، غياب، إلخ..."
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        حساب صافي الراتب
      </button>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">الراتب الإجمالي</p>
              <p className="text-xl font-bold">{result.gross.toLocaleString("ar-SA")}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">الاستقطاعات</p>
              <p className="text-xl font-bold text-red-600">-{result.totalDeductions.toLocaleString("ar-SA")}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">صافي الراتب</p>
              <p className="text-xl font-bold text-green-600">{result.net.toLocaleString("ar-SA")}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span>الراتب اليومي:</span>
              <span className="font-bold">{(result.net / 30).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>الراتب بالساعة:</span>
              <span className="font-bold">{(result.net / 240).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
