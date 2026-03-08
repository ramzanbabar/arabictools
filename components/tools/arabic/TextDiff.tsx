"use client";
import { useState } from "react";

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<{ added: string[]; removed: string[]; unchanged: number } | null>(null);

  const compare = () => {
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);

    const added = words2.filter(w => !words1.includes(w) && w.trim());
    const removed = words1.filter(w => !words2.includes(w) && w.trim());
    const unchanged = words1.filter(w => words2.includes(w)).length;

    setDiff({ added, removed, unchanged });
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">النص الأول</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="أدخل النص الأول..."
            rows={6}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">النص الثاني</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="أدخل النص الثاني..."
            rows={6}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <button
        onClick={compare}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        مقارنة النصوص
      </button>

      {diff && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{diff.added.length}</div>
              <div className="text-sm text-gray-500">كلمات مضافة</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600">{diff.removed.length}</div>
              <div className="text-sm text-gray-500">كلمات محذوفة</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold">{diff.unchanged}</div>
              <div className="text-sm text-gray-500">كلمات مشتركة</div>
            </div>
          </div>

          {diff.added.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2 text-green-600">الكلمات المضافة:</label>
              <div className="flex flex-wrap gap-2">
                {diff.added.map((word, i) => (
                  <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-sm">{word}</span>
                ))}
              </div>
            </div>
          )}

          {diff.removed.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2 text-red-600">الكلمات المحذوفة:</label>
              <div className="flex flex-wrap gap-2">
                {diff.removed.map((word, i) => (
                  <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-sm line-through">{word}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
