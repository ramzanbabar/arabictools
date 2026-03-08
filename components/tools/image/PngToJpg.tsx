"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function PngToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [converting, setConverting] = useState(false);

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
    accept: { "image/png": [".png"] },
    maxFiles: 1,
  });

  const convert = async () => {
    if (!file) return;

    setConverting(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = preview;
      await new Promise((resolve) => (img.onload = resolve));

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, file.name.replace(".png", ".jpg"));
      }, "image/jpeg", 0.9);
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء التحويل");
    }
    setConverting(false);
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
        <p className="text-lg">اسحب صورة PNG هنا أو انقر للاختيار</p>
      </div>

      {preview && <img src={preview} alt="معاينة" className="max-h-48 mx-auto rounded-lg" />}

      <button
        onClick={convert}
        disabled={!file || converting}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {converting ? "جاري التحويل..." : "تحويل إلى JPG"}
      </button>
    </div>
  );
}
