"use client";
import { useState } from "react";
import { numberToArabicWords } from "@/lib/arabic/numberToWords";

export default function NumberToWords() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    const num = parseFloat(number);
    if (isNaN(num)) {
      setResult("الرجاء إدخال رقم صحيح");
      return;
    }
    setResult(numberToArabicWords(num));
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">أدخل الرقم</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="مثال: 12345"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
          dir="ltr"
        />
        <p className="text-sm text-gray-500 mt-2">يدعم الأرقام الصحيحة والسالبة حتى المليارات</p>
      </div>

      <button
        onClick={convert}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        تحويل إلى كلمات
      </button>

      {result && (
        <div>
          <label className="block text-sm font-medium mb-2">النتيجة</label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-2xl font-bold text-center">
            {result}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="mt-2 text-sm text-primary hover:underline"
          >
            نسخ النتيجة
          </button>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <h3 className="font-bold mb-2">أمثلة:</h3>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>• 0 → صفر</li>
          <li>• 15 → خمسة عشر</li>
          <li>• 100 → مئة</li>
          <li>• 1234 → ألف ومئتان وأربعة وثلاثون</li>
          <li>• 1000000 → مليون</li>
        </ul>
      </div>
    </div>
  );
}
