"use client";
import { useState } from "react";
import { normalizeArabic } from "@/lib/arabic/normalizer";

export default function TextNormalizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const normalize = () => {
    setOutput(normalizeArabic(input));
  };

  const changes = [
    { from: "أ إ آ ٱ", to: "ا", desc: "توحيد أحرف الألف" },
    { from: "ة", to: "ه", desc: "تحويل التاء المربوطة" },
    { from: "ى", to: "ي", desc: "تحويل الألف المقصورة" },
    { from: "ؤ", to: "و", desc: "تحويل الهمزة على واو" },
    { from: "ـ", to: "(حذف)", desc: "حذف الكشيدة" },
  ];

  return (
    <div className="space-y-4" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">النص الأصلي</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="أدخل النص هنا..."
          rows={5}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
        />
      </div>

      <button
        onClick={normalize}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        تطبيع النص
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">النص المُطَبَّع</label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 whitespace-pre-wrap">
            {output}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-2 text-sm text-primary hover:underline"
          >
            نسخ النتيجة
          </button>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <h3 className="font-bold mb-3">التغييرات التي يقوم بها التطبيع:</h3>
        <ul className="space-y-2 text-sm">
          {changes.map((change, index) => (
            <li key={index} className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{change.desc}</span>
              <span>
                <span className="font-bold">{change.from}</span> → <span className="text-primary font-bold">{change.to}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
