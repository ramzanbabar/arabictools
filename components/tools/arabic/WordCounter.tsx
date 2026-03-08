"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? (text.match(/[.!?؟。]+/g) || []).length + (text.trim() && !/[.!?؟。]$/.test(text.trim()) ? 1 : 0) : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    lines: text ? text.split("\n").length : 0,
    arabicChars: (text.match(/[\u0600-\u06FF]/g) || []).length,
    numbers: (text.match(/[0-9٠-٩]/g) || []).length,
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">أدخل النص</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب أو الصق النص هنا..."
          rows={8}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.chars}</div>
          <div className="text-sm text-gray-500">حرف</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.charsNoSpace}</div>
          <div className="text-sm text-gray-500">بدون مسافات</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.words}</div>
          <div className="text-sm text-gray-500">كلمة</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.sentences}</div>
          <div className="text-sm text-gray-500">جملة</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.paragraphs}</div>
          <div className="text-sm text-gray-500">فقرة</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.lines}</div>
          <div className="text-sm text-gray-500">سطر</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.arabicChars}</div>
          <div className="text-sm text-gray-500">حرف عربي</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary">{stats.numbers}</div>
          <div className="text-sm text-gray-500">رقم</div>
        </div>
      </div>
    </div>
  );
}
