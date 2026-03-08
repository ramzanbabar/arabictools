"use client";
import { useState } from "react";

export default function CsvJsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"csv2json" | "json2csv">("csv2json");

  const csvToJson = () => {
    try {
      const lines = input.trim().split("\n");
      const headers = lines[0].split(",").map(h => h.trim());
      const result = lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => obj[h] = values[i] || "");
        return obj;
      });
      setOutput(JSON.stringify(result, null, 2));
    } catch {
      setOutput("خطأ في التحويل");
    }
  };

  const jsonToCsv = () => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data)) {
        setOutput("يجب أن يكون JSON مصفوفة");
        return;
      }
      const headers = Object.keys(data[0] || {});
      const csv = [
        headers.join(","),
        ...data.map(row => headers.map(h => row[h] || "").join(","))
      ].join("\n");
      setOutput(csv);
    } catch {
      setOutput("خطأ في التحويل");
    }
  };

  const convert = () => {
    mode === "csv2json" ? csvToJson() : jsonToCsv();
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-4">
        <button onClick={() => setMode("csv2json")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "csv2json" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          CSV → JSON
        </button>
        <button onClick={() => setMode("json2csv")} className={`flex-1 py-3 rounded-xl font-bold transition-colors ${mode === "json2csv" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>
          JSON → CSV
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{mode === "csv2json" ? "CSV" : "JSON"}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "csv2json" ? "name,age\nAhmed,30" : '[{"name":"Ahmed","age":30}]'}
          rows={8}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none font-mono ltr-output"
          dir="ltr"
        />
      </div>

      <button onClick={convert} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
        تحويل
      </button>

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">{mode === "csv2json" ? "JSON" : "CSV"}</label>
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
