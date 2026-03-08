"use client";
import { useState } from "react";
import { removeTashkeel, removeTatweel, removeAll, countTashkeel } from "@/lib/arabic/tashkeel";

export default function TashkeelRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"tashkeel" | "tatweel" | "all">("tashkeel");

  const process = () => {
    switch (mode) {
      case "tashkeel":
        setOutput(removeTashkeel(input));
        break;
      case "tatweel":
        setOutput(removeTatweel(input));
        break;
      case "all":
        setOutput(removeAll(input));
        break;
    }
  };

  const tashkeelCount = countTashkeel(input);

  return (
    <div className="space-y-4" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">النص المُشَكَّل</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="أدخل النص المُشَكَّل هنا..."
          rows={5}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
        />
        {input && (
          <p className="text-sm text-gray-500 mt-2">عدد علامات التشكيل: {tashkeelCount}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="tashkeel"
            checked={mode === "tashkeel"}
            onChange={() => setMode("tashkeel")}
            className="text-primary"
          />
          <span>إزالة التشكيل فقط</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="tatweel"
            checked={mode === "tatweel"}
            onChange={() => setMode("tatweel")}
            className="text-primary"
          />
          <span>إزالة التطويل (الكشيدة)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="all"
            checked={mode === "all"}
            onChange={() => setMode("all")}
            className="text-primary"
          />
          <span>إزالة الكل</span>
        </label>
      </div>

      <button
        onClick={process}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        إزالة
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">النتيجة</label>
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
    </div>
  );
}
