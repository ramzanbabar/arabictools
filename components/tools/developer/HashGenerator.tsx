"use client";
import { useState } from "react";
import CryptoJS from "crypto-js";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{ md5: string; sha1: string; sha256: string; sha512: string } | null>(null);

  const generate = () => {
    setHashes({
      md5: CryptoJS.MD5(input).toString(),
      sha1: CryptoJS.SHA1(input).toString(),
      sha256: CryptoJS.SHA256(input).toString(),
      sha512: CryptoJS.SHA512(input).toString(),
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">النص</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="أدخل النص لحساب الهاش..."
          rows={5}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 resize-none focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <button onClick={generate} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors">
        حساب الهاش
      </button>

      {hashes && (
        <div className="space-y-4">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold uppercase">{algo}</span>
                <button onClick={() => navigator.clipboard.writeText(hash)} className="text-sm text-primary hover:underline">
                  نسخ
                </button>
              </div>
              <p className="font-mono text-xs break-all ltr-output">{hash}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
