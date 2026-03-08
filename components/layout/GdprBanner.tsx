"use client";
import { useState, useEffect } from "react";

const KEY = "consent_arabictools_v1";

export function GdprBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = (() => { try { return localStorage.getItem(KEY); } catch { return null; } })();
    if (!v) setShow(true);
  }, []);

  const accept = (advertising: boolean) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ analytics: true, advertising, timestamp: Date.now() }));
    } catch {}
    if (advertising && process.env.NEXT_PUBLIC_GA4_ID) {
      const s = document.createElement("script");
      s.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`;
      s.async = true;
      document.head.appendChild(s);
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 shadow-2xl" dir="rtl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
          🍪 نستخدم ملفات تعريف الارتباط وفق{" "}
          <a href="/privacy" className="underline text-primary">سياسة الخصوصية</a>.
        </p>
        <div className="flex gap-2">
          <button onClick={() => accept(false)} className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">الضروري فقط</button>
          <button onClick={() => accept(true)}  className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold">قبول الكل</button>
        </div>
      </div>
    </div>
  );
}
