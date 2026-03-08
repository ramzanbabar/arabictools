"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const compress = async () => {
    if (!file) return;

    setCompressing(true);
    // Note: Actual compression requires server-side processing
    // This is a placeholder that downloads the original file
    alert("ضغط PDF يتطلب معالجة على الخادم. هذه الميزة قيد التطوير.");
    setCompressing(false);
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
        <p className="text-lg">اسحب ملف PDF هنا أو انقر للاختيار</p>
      </div>

      {file && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <p><strong>الملف:</strong> {file.name}</p>
          <p><strong>الحجم:</strong> {(file.size / 1024).toFixed(2)} كيلوبايت</p>
        </div>
      )}

      <button
        onClick={compress}
        disabled={!file || compressing}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {compressing ? "جاري الضغط..." : "ضغط الملف"}
      </button>
    </div>
  );
}
