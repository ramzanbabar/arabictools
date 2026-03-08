export function gregorianToHijri(date: Date) {
  const formatted = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
    day: "numeric", month: "long", year: "numeric",
  }).format(date);

  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
    day: "numeric", month: "numeric", year: "numeric",
  }).formatToParts(date);

  const get = (type: string) =>
    parseInt(parts.find(p => p.type === type)?.value ?? "1");

  return { day: get("day"), month: get("month"), year: get("year"), formatted };
}

export function getTodayHijri() {
  return new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).format(new Date());
}

export function hijriToGregorian(hY: number, hM: number, hD: number): Date {
  const approx = new Date();
  approx.setFullYear(hY - 579);
  for (let d = -60; d <= 60; d++) {
    const c = new Date(approx);
    c.setDate(c.getDate() + d);
    const p = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric", month: "numeric", year: "numeric",
    }).formatToParts(c);
    const get = (t: string) => parseInt(p.find(x => x.type === t)?.value ?? "0");
    if (get("day") === hD && get("month") === hM && get("year") === hY) return c;
  }
  return approx;
}

export const HIJRI_MONTHS = [
  "محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الآخرة",
  "رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",
];
