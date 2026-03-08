"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [resizing, setResizing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
        };
      };
      reader.readAsDataURL(f);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  const resize = async () => {
    if (!file) return;

    setResizing(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = preview;
      await new Promise((resolve) => (img.onload = resolve));

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `resized-${file.name}`);
      });
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء تغيير الحجم");
    }
    setResizing(false);
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

      {file && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">العرض (بكسل)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الارتفاع (بكسل)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
              dir="ltr"
            />
          </div>
        </div>
      )}

      <button
        onClick={resize}
        disabled={!file || resizing}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {resizing ? "جاري التغيير..." : "تغيير الحجم"}
      </button>
    </div>
  );
}
