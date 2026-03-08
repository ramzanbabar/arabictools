"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UnlockPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const unlock = async () => {
    if (!file) return;

    setUnlocking(true);
    alert("فك تشفير PDF يتطلب معالجة على الخادم. هذه الميزة قيد التطوير.");
    setUnlocking(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-lg">اسحب ملف PDF المحمي هنا</p>
      </div>

      {file && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <p><strong>الملف:</strong> {file.name}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">كلمة المرور (إن وجدت)</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="أدخل كلمة المرور إن كانت موجودة"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
          dir="ltr"
        />
      </div>

      <button
        onClick={unlock}
        disabled={!file || unlocking}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {unlocking ? "جاري فك التشفير..." : "فك التشفير"}
      </button>
    </div>
  );
}
