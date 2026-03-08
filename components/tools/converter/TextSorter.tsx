"use client";
import { useState } from "react";

export default function TextSorter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"asc" | "desc" | "random">("asc");
  const [separator, setSeparator] = useState("\n");

  const sort = () => {
    const items = input.split(separator).filter(s => s.trim());
    let sorted: string[];

    switch (mode) {
      case "asc":
        sorted = items.sort((a, b) => a.localeCompare(b, "ar"));
        break;
      case "desc":
        sorted = items.sort((a, b) => b.localeCompare(a, "ar"));
        break;
      case "random":
        sorted = items.sort(() => Math.random() - 0.5);
        break;
    }

    setOutput(sorted.join(separator));
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">النصوص (كل سطر عنصر)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="أدخل العناصر، كل عنصر في سطر..."
          rows={8}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <div className="flex gap-4">
        <button onClick={() => setMode("asc")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "asc" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          أ-ي
        </button>
        <button onClick={() => setMode("desc")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "desc" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          ي-أ
        </button>
        <button onClick={() => setMode("random")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "random" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          عشوائي
        </button>
      </div>

      <button onClick={sort} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
        ترتيب
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">النتيجة</label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 whitespace-pre-wrap">
            {output}
          </div>
          <button onClick={() => navigator.clipboard.writeText(output)} className="mt-2 text-sm text-primary hover:underline">
            نسخ
          </button>
        </div>
      )}
    </div>
  );
}
