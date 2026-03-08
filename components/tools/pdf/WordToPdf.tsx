"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxFiles: 1,
  });

  const convert = async () => {
    if (!file) return;

    setConverting(true);
    // Note: Actual Word to PDF conversion requires server-side processing
    alert("تحويل Word إلى PDF يتطلب معالجة على الخادم. هذه الميزة قيد التطوير.");
    setConverting(false);
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
        <p className="text-lg">اسحب ملف Word هنا أو انقر للاختيار</p>
        <p className="text-sm text-gray-500 mt-2">.doc أو .docx</p>
      </div>

      {file && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <p><strong>الملف:</strong> {file.name}</p>
        </div>
      )}

      <button
        onClick={convert}
        disabled={!file || converting}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {converting ? "جاري التحويل..." : "تحويل إلى PDF"}
      </button>
    </div>
  );
}
