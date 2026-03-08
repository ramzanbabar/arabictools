export const NISAB_GOLD_G    = 85;
export const NISAB_SILVER_G  = 595;
export const ZAKAT_RATE      = 0.025;
export const GOLD_SAR_GRAM   = 320;   // approximate 2026
export const SILVER_SAR_GRAM = 4;

export function getNisab(std: "gold" | "silver") {
  return std === "gold" ? NISAB_GOLD_G * GOLD_SAR_GRAM : NISAB_SILVER_G * SILVER_SAR_GRAM;
}

export function calcZakat(
  a: { cash:number; gold:number; silver:number; stocks:number;
       business:number; receivables:number; liabilities:number },
  std: "gold" | "silver" = "gold"
) {
  const total = a.cash + a.gold + a.silver + a.stocks + a.business + a.receivables - a.liabilities;
  const nisab = getNisab(std);
  const eligible = total >= nisab;
  return { total, nisab, eligible, zakatDue: eligible ? total * ZAKAT_RATE : 0 };
}
