"use client";
import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState("");

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const result = input.match(regex);
      setMatches(result);
      setError("");
    } catch (e) {
      setError("خطأ في نمط Regex");
      setMatches(null);
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">نمط Regex</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder=".*"
            className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none font-mono ltr-output"
            dir="ltr"
          />
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="flags"
            className="w-24 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none font-mono text-center ltr-output"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">النص للاختبار</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="أدخل النص للاختبار..."
          rows={6}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none ltr-output"
          dir="ltr"
        />
      </div>

      <button onClick={test} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
        اختبار
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {matches && (
        <div>
          <label className="block text-sm font-medium mb-2">النتائج ({matches.length})</label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2 ltr-output">
            {matches.map((match, i) => (
              <div key={i} className="font-mono text-sm bg-white dark:bg-gray-700 p-2 rounded">{match}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
