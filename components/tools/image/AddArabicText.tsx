"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function AddArabicText() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [text, setText] = useState("نص تجريبي");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
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

  const addText = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = preview;
      await new Promise((resolve) => (img.onload = resolve));

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      if (ctx) {
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.direction = "rtl";
        ctx.textAlign = "right";
        ctx.fillText(text, canvas.width * (position.x / 100), canvas.height * (position.y / 100));
      }

      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `text-added-${file.name}`);
      });
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء إضافة النص");
    }
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

      {file && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">النص</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">حجم الخط: {fontSize}</label>
              <input type="range" min="12" max="200" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">لون النص</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer" />
            </div>
          </div>
        </div>
      )}

      <button onClick={addText} disabled={!file || processing} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
        {processing ? "جاري الإضافة..." : "إضافة النص"}
      </button>
    </div>
  );
}
