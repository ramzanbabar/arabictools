"use client";
import { useState } from "react";

export default function TextDirectionFixer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const fix = () => {
    // Add RTL markers and fix direction issues
    let result = input;

    // Add RTL mark at the beginning
    result = "\u200F" + result;

    // Fix mixed text by adding proper markers
    result = result.replace(/([a-zA-Z0-9]+)/g, "\u200E$1\u200F");

    setOutput(result);
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">النص المُشوَّه</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="أدخل النص الذي يعاني من مشاكل في الاتجاه..."
          rows={5}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
        />
      </div>

      <button
        onClick={fix}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        إصلاح الاتجاه
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">النص المُصحَّح</label>
          <div
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 whitespace-pre-wrap"
            dir="rtl"
          >
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
        <h3 className="font-bold mb-2">متى تستخدم هذه الأداة؟</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>عند ظهور النص العربي معكوساً</li>
          <li>عندما تظهر الأرقام الإنجليزية بالترتيب الخاطئ</li>
          <li>عند خلط النص العربي مع الإنجليزي</li>
        </ul>
      </div>
    </div>
  );
}
