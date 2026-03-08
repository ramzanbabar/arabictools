"use client";
import { useState } from "react";
import { calcZakat, getNisab, GOLD_SAR_GRAM, SILVER_SAR_GRAM, NISAB_GOLD_G, NISAB_SILVER_G } from "@/lib/arabic/zakat";
import { numberToArabicWords } from "@/lib/arabic/numberToWords";

export default function ZakatCalculator() {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    stocks: 0,
    business: 0,
    receivables: 0,
    liabilities: 0,
  });
  const [standard, setStandard] = useState<"gold" | "silver">("gold");
  const [result, setResult] = useState<ReturnType<typeof calcZakat> | null>(null);

  const calculate = () => {
    setResult(calcZakat(assets, standard));
  };

  const updateAsset = (key: keyof typeof assets, value: string) => {
    setAssets((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="bg-primary/10 rounded-xl p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          حاسبة الزكاة تحسب زكاة مالك وفق الشريعة الإسلامية. النصاب بالذهب: {NISAB_GOLD_G} جرام (~{getNisab("gold").toLocaleString("ar-SA")} ريال).
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">النقد والودائع البنكية (ريال)</label>
          <input
            type="number"
            value={assets.cash || ""}
            onChange={(e) => updateAsset("cash", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الذهب (جرام)</label>
          <input
            type="number"
            value={assets.gold || ""}
            onChange={(e) => updateAsset("gold", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
          <p className="text-xs text-gray-500 mt-1">السعر التقريبي: {GOLD_SAR_GRAM} ريال/جرام</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الفضة (جرام)</label>
          <input
            type="number"
            value={assets.silver || ""}
            onChange={(e) => updateAsset("silver", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
          <p className="text-xs text-gray-500 mt-1">السعر التقريبي: {SILVER_SAR_GRAM} ريال/جرام</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الأسهم والاستثمارات (ريال)</label>
          <input
            type="number"
            value={assets.stocks || ""}
            onChange={(e) => updateAsset("stocks", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">رأس مال التجارة (ريال)</label>
          <input
            type="number"
            value={assets.business || ""}
            onChange={(e) => updateAsset("business", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">المبالغ المستحقة لك (ريال)</label>
          <input
            type="number"
            value={assets.receivables || ""}
            onChange={(e) => updateAsset("receivables", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الديون والالتزامات (ريال)</label>
          <input
            type="number"
            value={assets.liabilities || ""}
            onChange={(e) => updateAsset("liabilities", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">معيار النصاب</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="standard"
              checked={standard === "gold"}
              onChange={() => setStandard("gold")}
              className="text-primary"
            />
            <span>الذهب ({NISAB_GOLD_G} جرام)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="standard"
              checked={standard === "silver"}
              onChange={() => setStandard("silver")}
              className="text-primary"
            />
            <span>الفضة ({NISAB_SILVER_G} جرام)</span>
          </label>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        حساب الزكاة
      </button>

      {result && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">إجمالي المال الزكوي</p>
            <p className="text-3xl font-bold">{result.total.toLocaleString("ar-SA")} ريال</p>
          </div>

          <div className={`rounded-xl p-6 text-center ${result.eligible ? "bg-green-50 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-800"}`}>
            {result.eligible ? (
              <>
                <p className="text-sm text-gray-500 mb-2">الزكاة الواجبة (2.5%)</p>
                <p className="text-4xl font-bold text-green-600">{result.zakatDue.toLocaleString("ar-SA")} ريال</p>
                <p className="text-sm text-gray-500 mt-2">{numberToArabicWords(Math.round(result.zakatDue))} ريال</p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold">لا تجب الزكاة</p>
                <p className="text-sm text-gray-500">مالك أقل من النصاب ({result.nisab.toLocaleString("ar-SA")} ريال)</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
