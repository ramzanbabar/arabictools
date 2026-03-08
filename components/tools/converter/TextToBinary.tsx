"use client";
import { useState } from "react";

export default function TextToBinary() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"text2bin" | "bin2text">("text2bin");

  const textToBinary = (text: string) => {
    return text.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
  };

  const binaryToText = (binary: string) => {
    return binary.split(" ").filter(b => b).map(bin => String.fromCharCode(parseInt(bin, 2))).join("");
  };

  const convert = () => {
    setOutput(mode === "text2bin" ? textToBinary(input) : binaryToText(input));
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-4">
        <button onClick={() => setMode("text2bin")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "text2bin" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          نص → ثنائي
        </button>
        <button onClick={() => setMode("bin2text")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "bin2text" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          ثنائي → نص
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{mode === "text2bin" ? "النص" : "الثنائي"}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "text2bin" ? "أدخل النص..." : "أدخل الثنائي (مفصول بمسافات)..."}
          rows={6}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none font-mono ltr-output"
          dir="ltr"
        />
      </div>

      <button onClick={convert} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
        تحويل
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">{mode === "text2bin" ? "الثنائي" : "النص"}</label>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 whitespace-pre-wrap ltr-output break-all font-mono text-sm">
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
