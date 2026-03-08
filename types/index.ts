export type ToolCategory =
  | "arabic"
  | "calculators"
  | "pdf"
  | "image"
  | "qr"
  | "developer"
  | "converter";

export interface ArabicTool {
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
  component: string;
  popular?: boolean;
  isNew?: boolean;
  isUnique?: boolean;
}

export interface ZakatAssets {
  cash: number;
  gold: number;
  silver: number;
  stocks: number;
  business: number;
  receivables: number;
  liabilities: number;
}

export interface ConsentState {
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}
