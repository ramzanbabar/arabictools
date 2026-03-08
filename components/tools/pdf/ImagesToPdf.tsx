"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export default function ImagesToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const convert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;

        if (file.type === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          image = await pdfDoc.embedJpg(arrayBuffer);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "images.pdf");
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
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-lg">اسحب الصور هنا أو انقر للاختيار</p>
        <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG, WebP</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-bold">الصور ({files.length})</h3>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
            >
              <span>{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={convert}
        disabled={files.length === 0 || converting}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {converting ? "جاري التحويل..." : "تحويل إلى PDF"}
      </button>
    </div>
  );
}
