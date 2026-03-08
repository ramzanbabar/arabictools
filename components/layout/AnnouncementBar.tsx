"use client";
import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="bg-primary text-white text-center text-sm py-2 px-4 relative" dir="rtl">
      <span>🌙 أكثر من 65 أداة عربية مجانية — بدون تسجيل، 100% في متصفحك</span>
      <button onClick={() => setVisible(false)} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
