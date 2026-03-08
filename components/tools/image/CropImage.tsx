"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function CropImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [cropping, setCropping] = useState(false);

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

  const crop = async () => {
    if (!file) return;

    setCropping(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = preview;
      await new Promise((resolve) => (img.onload = resolve));

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, x, y, width, height, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `cropped-${file.name}`);
      });
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء القص");
    }
    setCropping(false);
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
            <label className="block text-sm font-medium mb-2">X</label>
            <input type="number" value={x} onChange={(e) => setX(parseInt(e.target.value) || 0)} className="w-full border rounded-xl p-3 bg-white dark:bg-gray-800" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Y</label>
            <input type="number" value={y} onChange={(e) => setY(parseInt(e.target.value) || 0)} className="w-full border rounded-xl p-3 bg-white dark:bg-gray-800" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">العرض</label>
            <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)} className="w-full border rounded-xl p-3 bg-white dark:bg-gray-800" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الارتفاع</label>
            <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)} className="w-full border rounded-xl p-3 bg-white dark:bg-gray-800" dir="ltr" />
          </div>
        </div>
      )}

      <button onClick={crop} disabled={!file || cropping} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
        {cropping ? "جاري القص..." : "قص الصورة"}
      </button>
    </div>
  );
}
