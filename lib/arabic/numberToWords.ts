const ONES = ["","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة",
  "عشرة","أحد عشر","اثنا عشر","ثلاثة عشر","أربعة عشر","خمسة عشر",
  "ستة عشر","سبعة عشر","ثمانية عشر","تسعة عشر"];
const TENS  = ["","عشرة","عشرون","ثلاثون","أربعون","خمسون","ستون","سبعون","ثمانون","تسعون"];
const HUNDS = ["","مئة","مئتان","ثلاثمئة","أربعمئة","خمسمئة","ستمئة","سبعمئة","ثمانمئة","تسعمئة"];

function chunk(n: number): string {
  if (n === 0) return "";
  const h = Math.floor(n / 100), rem = n % 100;
  const parts: string[] = [];
  if (h)       parts.push(HUNDS[h]);
  if (rem < 20 && rem > 0) parts.push(ONES[rem]);
  else {
    if (Math.floor(rem / 10)) parts.push(TENS[Math.floor(rem / 10)]);
    if (rem % 10)             parts.push(ONES[rem % 10]);
  }
  return parts.join(" و");
}

export function numberToArabicWords(n: number): string {
  if (n === 0) return "صفر";
  if (n < 0)   return "سالب " + numberToArabicWords(-n);
  const B = Math.floor(n / 1e9), M = Math.floor((n % 1e9) / 1e6);
  const K = Math.floor((n % 1e6) / 1e3), R = n % 1e3;
  const parts: string[] = [];
  if (B) parts.push(chunk(B) + " مليار");
  if (M) parts.push(chunk(M) + " مليون");
  if (K) parts.push(chunk(K) + " ألف");
  if (R) parts.push(chunk(R));
  return parts.join(" و");
}
