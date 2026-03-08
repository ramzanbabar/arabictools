"use client";
import { useState } from "react";
import { easternToWestern, westernToEastern } from "@/lib/arabic/numerals";

export default function NumeralConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [direction, setDirection] = useState<"e2w" | "w2e">("e2w");

  const convert = () => {
    if (direction === "e2w") {
      setOutput(easternToWestern(input));
    } else {
      setOutput(westernToEastern(input));
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-4">
        <button
          onClick={() => setDirection("e2w")}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
            direction === "e2w"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          هندي (٠١٢٣) → إنجليزي (0123)
        </button>
        <button
          onClick={() => setDirection("w2e")}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
            direction === "w2e"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          إنجليزي (0123) → هندي (٠١٢٣)
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">أدخل النص</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={direction === "e2w" ? "أدخل النص بأرقام هندية: ٠١٢٣٤٥٦٧٨٩" : "Enter text with western numbers: 0123456789"}
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
          <label className="block text-sm font-medium mb-2">النتيجة</label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 whitespace-pre-wrap text-lg">
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
        <h3 className="font-bold mb-2">جدول المقارنة:</h3>
        <div className="grid grid-cols-10 gap-2 text-center">
          {["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"].map((eastern, index) => (
            <div key={index} className="space-y-1">
              <div className="text-lg font-bold">{eastern}</div>
              <div className="text-sm text-gray-500">{index}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
