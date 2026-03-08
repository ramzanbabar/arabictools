"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function CompressImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [quality, setQuality] = useState(0.7);
  const [compressing, setCompressing] = useState(false);
  const [result, setResult] = useState<{ originalSize: number; newSize: number } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    setFile(f);
    setResult(null);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  const compress = async () => {
    if (!file) return;

    setCompressing(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new window.Image();

      img.src = preview;
      await new Promise((resolve) => (img.onload = resolve));

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const newSize = blob.size;
            setResult({ originalSize: file.size, newSize });
            saveAs(blob, `compressed-${file.name}`);
          }
        },
        "image/jpeg",
        quality
      );
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء الضغط");
    }
    setCompressing(false);
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

      {preview && (
        <div className="space-y-4">
          <img src={preview} alt="معاينة" className="max-h-48 mx-auto rounded-lg" />
          <div>
            <label className="block text-sm font-medium mb-2">جودة الضغط: {Math.round(quality * 100)}%</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      <button
        onClick={compress}
        disabled={!file || compressing}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {compressing ? "جاري الضغط..." : "ضغط الصورة"}
      </button>

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
          <p>الحجم الأصلي: {(result.originalSize / 1024).toFixed(2)} كيلوبايت</p>
          <p>الحجم الجديد: {(result.newSize / 1024).toFixed(2)} كيلوبايت</p>
          <p className="text-green-600 font-bold">
            توفير: {((1 - result.newSize / result.originalSize) * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
