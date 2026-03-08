"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const merge = async () => {
    if (files.length < 2) return;

    setMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "merged.pdf");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء دمج الملفات");
    }
    setMerging(false);
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
        <p className="text-lg">اسحب ملفات PDF هنا أو انقر للاختيار</p>
        <p className="text-sm text-gray-500 mt-2">يمكنك إضافة عدة ملفات</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-bold">الملفات ({files.length})</h3>
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
        onClick={merge}
        disabled={files.length < 2 || merging}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {merging ? "جاري الدمج..." : "دمج الملفات"}
      </button>
    </div>
  );
}
