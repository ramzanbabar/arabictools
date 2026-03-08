"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("");
  const [splitting, setSplitting] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    setFile(f);
    if (f) {
      const arrayBuffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const split = async () => {
    if (!file || !range) return;

    setSplitting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Parse range like "1-3, 5, 7-9"
      const ranges = range.split(",").map((r) => r.trim());
      const pageIndices: number[] = [];

      for (const r of ranges) {
        if (r.includes("-")) {
          const [start, end] = r.split("-").map((n) => parseInt(n.trim()));
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= pageCount) pageIndices.push(i - 1);
          }
        } else {
          const page = parseInt(r);
          if (page >= 1 && page <= pageCount) pageIndices.push(page - 1);
        }
      }

      const pages = await newPdf.copyPages(pdf, pageIndices);
      pages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "split.pdf");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء تقسيم الملف");
    }
    setSplitting(false);
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
          <p><strong>عدد الصفحات:</strong> {pageCount}</p>
        </div>
      )}

      {file && (
        <div>
          <label className="block text-sm font-medium mb-2">نطاق الصفحات</label>
          <input
            type="text"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder="مثال: 1-3, 5, 7-9"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
            dir="ltr"
          />
          <p className="text-sm text-gray-500 mt-2">أدخل أرقام الصفحات المطلوبة مفصولة بفواصل</p>
        </div>
      )}

      <button
        onClick={split}
        disabled={!file || !range || splitting}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {splitting ? "جاري التقسيم..." : "تقسيم الملف"}
      </button>
    </div>
  );
}
