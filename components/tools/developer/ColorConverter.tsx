"use client";
import { useState } from "react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#1B4FCC");
  const [rgb, setRgb] = useState({ r: 27, g: 79, b: 204 });
  const [hsl, setHsl] = useState({ h: 223, s: 77, l: 45 });

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const updateFromHex = (h: string) => {
    setHex(h);
    const rgbVal = hexToRgb(h);
    setRgb(rgbVal);
    setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex("#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join(""));
    setHsl(rgbToHsl(r, g, b));
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-center">
        <input
          type="color"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          className="w-32 h-32 rounded-xl cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">HEX</label>
        <input
          type="text"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none font-mono ltr-output"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">RGB</label>
        <div className="grid grid-cols-3 gap-2">
          {["r", "g", "b"].map((c) => (
            <input
              key={c}
              type="number"
              min="0"
              max="255"
              value={rgb[c as "r" | "g" | "b"]}
              onChange={(e) => updateFromRgb(
                c === "r" ? parseInt(e.target.value) || 0 : rgb.r,
                c === "g" ? parseInt(e.target.value) || 0 : rgb.g,
                c === "b" ? parseInt(e.target.value) || 0 : rgb.b
              )}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none ltr-output"
              dir="ltr"
            />
          ))}
        </div>
        <p className="mt-2 text-sm font-mono ltr-output">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">HSL</label>
        <p className="font-mono ltr-output">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
      </div>
    </div>
  );
}
