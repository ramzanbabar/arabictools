"use client";
import { useState } from "react";
import { genLoremArabic } from "@/lib/arabic/lorem";

export default function LoremArabic() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(4);
  const [output, setOutput] = useState("");

  const generate = () => {
    setOutput(genLoremArabic(paragraphs, sentences));
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">عدد الفقرات</label>
          <input
            type="number"
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
            min="1"
            max="20"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">الجمل لكل فقرة</label>
          <input
            type="number"
            value={sentences}
            onChange={(e) => setSentences(parseInt(e.target.value) || 1)}
            min="1"
            max="10"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
            dir="ltr"
          />
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        توليد نص تجريبي
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">النص التجريبي</label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 whitespace-pre-wrap leading-relaxed">
            {output}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-sm text-primary hover:underline"
            >
              نسخ النص
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={generate}
              className="text-sm text-primary hover:underline"
            >
              توليد جديد
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
