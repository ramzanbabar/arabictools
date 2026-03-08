"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function RemoveBg() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });

  const remove = async () => {
    if (!file) return;

    setProcessing(true);
    alert("إزالة الخلفية تتطلب خدمة خارجية أو معالجة متقدمة. هذه الميزة قيد التطوير.");
    setProcessing(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-lg">اسحب صورة هنا أو انقر للاختيار</p>
      </div>

      {preview && <img src={preview} alt="معاينة" className="max-h-48 mx-auto rounded-lg" />}

      <button onClick={remove} disabled={!file || processing} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
        {processing ? "جاري المعالجة..." : "إزالة الخلفية"}
      </button>
    </div>
  );
}
