"use client";
import { useState } from "react";

export default function MarkdownPreview() {
  const [input, setInput] = useState("# عنوان\n\nهذا **نص عريض** و *نص مائل*.\n\n- عنصر 1\n- عنصر 2\n\n```javascript\nconsole.log('Hello');\n```");

  const getHtml = () => {
    // Simple markdown to HTML conversion
    let html = input
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">$1</code>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/\n/gim, '<br>');

    return html;
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Markdown</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب Markdown هنا..."
            rows={15}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none font-mono ltr-output"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">معاينة</label>
          <div
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 min-h-[300px] overflow-auto prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: getHtml() }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">HTML الناتج</label>
        <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 overflow-auto ltr-output text-sm">
          {getHtml()}
        </pre>
        <button onClick={() => navigator.clipboard.writeText(getHtml())} className="mt-2 text-sm text-primary hover:underline">
          نسخ HTML
        </button>
      </div>
    </div>
  );
}
