const E2W: Record<string, string> = {
  "٠":"0","١":"1","٢":"2","٣":"3","٤":"4",
  "٥":"5","٦":"6","٧":"7","٨":"8","٩":"9",
};
const W2E: Record<string, string> = {
  "0":"٠","1":"١","2":"٢","3":"٣","4":"٤",
  "5":"٥","6":"٦","7":"٧","8":"٨","9":"٩",
};

export const easternToWestern = (t: string) => t.replace(/[٠-٩]/g, d => E2W[d] ?? d);
export const westernToEastern = (t: string) => t.replace(/[0-9]/g, d => W2E[d] ?? d);
export const formatAR = (n: number) => new Intl.NumberFormat("ar-SA").format(n);
