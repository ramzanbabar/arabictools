"use client";
import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e) {
      setOutput("خطأ في التحويل");
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-4">
        <button onClick={() => setMode("encode")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "encode" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          ترميز
        </button>
        <button onClick={() => setMode("decode")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "decode" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          فك الترميز
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{mode === "encode" ? "النص الأصلي" : "النص المُرمَّز"}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "أدخل النص..." : "أدخل النص المُرمَّز..."}
          rows={5}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <button onClick={process} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
        {mode === "encode" ? "ترميز" : "فك الترميز"}
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">{mode === "encode" ? "النتيجة المُرمَّزة" : "النص المُفكَّك"}</label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 whitespace-pre-wrap ltr-output break-all">
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
