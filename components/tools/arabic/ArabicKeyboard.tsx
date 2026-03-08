"use client";
import { useState } from "react";

const ARABIC_KEYS = [
  ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
  ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
  ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"],
];

const EXTRA_KEYS = [".", "،", "؛", ":", "؟", "!", "ـ", " "];

export default function ArabicKeyboard() {
  const [text, setText] = useState("");

  const addChar = (char: string) => {
    setText((prev) => prev + char);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      setText((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      setText((prev) => prev + "\n");
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">النص</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اضغط على الأزرار أو اكتب مباشرة..."
          rows={5}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100 text-lg"
        />
      </div>

      <div className="space-y-2">
        {ARABIC_KEYS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => addChar(key)}
                className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-bold text-lg hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-1 flex-wrap">
          {EXTRA_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => addChar(key)}
              className={`bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-bold hover:bg-primary hover:text-white hover:border-primary transition-colors ${
                key === " " ? "w-48 h-10" : "w-10 h-10"
              }`}
            >
              {key === " " ? "مسافة" : key}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setText("")}
          className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          مسح الكل
        </button>
        <button
          onClick={() => setText((prev) => prev.slice(0, -1))}
          className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          مسح حرف
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(text)}
          disabled={!text}
          className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          نسخ
        </button>
      </div>
    </div>
  );
}
