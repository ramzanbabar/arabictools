"use client";
import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("اختر نوعاً واحداً على الأقل");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: "ضعيف", color: "text-red-500" };
    if (length < 12) return { label: "متوسط", color: "text-yellow-500" };
    if (length < 16) return { label: "جيد", color: "text-blue-500" };
    return { label: "قوي جداً", color: "text-green-500" };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">طول كلمة المرور: {length}</label>
        <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full" />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="text-primary" />
          <span>أحرف كبيرة (A-Z)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} className="text-primary" />
          <span>أحرف صغيرة (a-z)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="text-primary" />
          <span>أرقام (0-9)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="text-primary" />
          <span>رموز خاصة (!@#$...)</span>
        </label>
      </div>

      <button onClick={generate} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
        توليد كلمة مرور
      </button>

      {password && (
        <div className="space-y-2">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-xl font-mono text-center ltr-output break-all">{password}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm font-bold ${strength.color}`}>{strength.label}</span>
            <button onClick={copy} className="text-sm text-primary hover:underline">
              {copied ? "تم النسخ!" : "نسخ"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
