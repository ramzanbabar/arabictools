"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

export default function WatermarkPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [watermark, setWatermark] = useState("");
  const [adding, setAdding] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const addWatermark = async () => {
    if (!file || !watermark) return;

    setAdding(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawText(watermark, {
          x: width / 2 - (watermark.length * 6),
          y: height / 2,
          size: 50,
          font,
          color: rgb(0.8, 0.8, 0.8),
          opacity: 0.5,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "watermarked.pdf");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء إضافة العلامة المائية");
    }
    setAdding(false);
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

      <div>
        <label className="block text-sm font-medium mb-2">نص العلامة المائية</label>
        <input
          type="text"
          value={watermark}
          onChange={(e) => setWatermark(e.target.value)}
          placeholder="أدخل نص العلامة المائية"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <button
        onClick={addWatermark}
        disabled={!file || !watermark || adding}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {adding ? "جاري الإضافة..." : "إضافة العلامة المائية"}
      </button>
    </div>
  );
}
