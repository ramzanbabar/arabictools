"use client";
import { useState } from "react";

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">عدد المعرفات</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          min="1"
          max="100"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <button onClick={generate} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
        توليد UUID
      </button>

      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 font-mono text-sm ltr-output">
            {uuids.map((uuid, i) => (
              <div key={i} className="py-1">{uuid}</div>
            ))}
          </div>
          <button onClick={copyAll} className="text-sm text-primary hover:underline">
            نسخ الكل
          </button>
        </div>
      )}
    </div>
  );
}
