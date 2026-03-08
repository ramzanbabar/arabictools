"use client";
import { useState } from "react";

export default function LetterFrequency() {
  const [text, setText] = useState("");

  const getFrequency = (input: string) => {
    const freq: Record<string, number> = {};
    const arabicOnly = input.replace(/[^\u0600-\u06FF]/g, "");

    for (const char of arabicOnly) {
      freq[char] = (freq[char] || 0) + 1;
    }

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1]);

    const maxCount = sorted.length > 0 ? sorted[0][1] : 0;

    return { sorted, maxCount, totalChars: arabicOnly.length };
  };

  const { sorted, maxCount, totalChars } = getFrequency(text);

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">أدخل النص</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="أدخل النص العربي لتحليل تكرار الحروف..."
          rows={6}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
        />
        {text && (
          <p className="text-sm text-gray-500 mt-2">عدد الحروف العربية: {totalChars}</p>
        )}
      </div>

      {sorted.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold">تكرار الحروف:</h3>
          <div className="space-y-2">
            {sorted.map(([char, count]) => (
              <div key={char} className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-lg">
                  {char}
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${(count / (maxCount || 1)) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-left text-sm text-gray-500">{count}</span>
                <span className="w-16 text-left text-xs text-gray-400">
                  {((count / (totalChars || 1)) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
