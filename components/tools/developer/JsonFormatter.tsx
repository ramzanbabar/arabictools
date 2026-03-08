"use client";
import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError("خطأ في صيغة JSON");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError("خطأ في صيغة JSON");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">JSON للتنسيق</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          rows={8}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none font-mono ltr-output"
          dir="ltr"
        />
      </div>

      <div className="flex gap-4">
        <button onClick={format} className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
          تنسيق
        </button>
        <button onClick={minify} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
          تصغير
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">النتيجة</label>
          <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 overflow-auto ltr-output text-sm">
            {output}
          </pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="mt-2 text-sm text-primary hover:underline">
            نسخ
          </button>
        </div>
      )}
    </div>
  );
}
