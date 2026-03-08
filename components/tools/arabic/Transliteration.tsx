"use client";
import { useState } from "react";
import { arabicToLatin } from "@/lib/arabic/transliteration";

export default function Transliteration() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [direction, setDirection] = useState<"ar2en" | "en2ar">("ar2en");

  const convert = () => {
    if (direction === "ar2en") {
      setOutput(arabicToLatin(input));
    } else {
      // Simple reverse mapping for demo
      const EN2AR: Record<string, string> = {
        "a": "ا", "b": "ب", "t": "ت", "th": "ث", "j": "ج", "h": "ه", "kh": "خ",
        "d": "د", "dh": "ذ", "r": "ر", "z": "ز", "s": "س", "sh": "ش",
        "q": "ق", "k": "ك", "l": "ل", "m": "م", "n": "ن", "w": "و", "y": "ي",
        "f": "ف", "gh": "غ", "aa": "آ", "i": "إ",
      };
      let result = input;
      for (const [en, ar] of Object.entries(EN2AR)) {
        result = result.replace(new RegExp(en, "g"), ar);
      }
      setOutput(result);
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-4">
        <button
          onClick={() => setDirection("ar2en")}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
            direction === "ar2en"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          عربي → فرنكو
        </button>
        <button
          onClick={() => setDirection("en2ar")}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
            direction === "en2ar"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          فرنكو → عربي
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {direction === "ar2en" ? "النص العربي" : "النص الفرنكو"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={direction === "ar2en" ? "أدخل النص العربي..." : "Enter Franco text..."}
          rows={5}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
        />
      </div>

      <button
        onClick={convert}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        تحويل
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">
            {direction === "ar2en" ? "النتيجة (فرنكو)" : "النتيجة (عربي)"}
          </label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 whitespace-pre-wrap ltr-output">
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
    </div>
  );
}
