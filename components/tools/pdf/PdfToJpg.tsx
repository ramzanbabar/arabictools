"use client";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setImages([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const convert = async () => {
    if (!file) return;

    setConverting(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");

      // Set worker inside useEffect or async function only
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const newImages: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 2;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        if (!context) continue;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        newImages.push(canvas.toDataURL("image/jpeg", 0.9));
      }

      setImages(newImages);
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء التحويل");
    }
    setConverting(false);
  };

  const downloadImage = (dataUrl: string, index: number) => {
    saveAs(dataUrl, `page-${index + 1}.jpg`);
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
        </div>
      )}

      <button
        onClick={convert}
        disabled={!file || converting}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {converting ? "جاري التحويل..." : "تحويل إلى صور"}
      </button>

      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold">الصور ({images.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={index} className="space-y-2">
                <img src={img} alt={`صفحة ${index + 1}`} className="rounded-lg border" />
                <button
                  onClick={() => downloadImage(img, index)}
                  className="w-full text-sm bg-gray-100 dark:bg-gray-800 rounded-lg py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  تحميل الصفحة {index + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
