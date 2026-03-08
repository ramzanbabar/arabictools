import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";                        // ← FIRST IMPORT
import { Providers }       from "@/components/providers/Providers";
import { Header }          from "@/components/layout/Header";
import { Footer }          from "@/components/layout/Footer";
import { GdprBanner }      from "@/components/layout/GdprBanner";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default:  "أدوات عربية 2026 – 65+ أداة مجانية",
    template: "%s | أدوات عربية 2026",
  },
  description: "أكبر موقع عربي للأدوات المجانية: تحويل التاريخ الهجري، حاسبة الزكاة، مواقيت الصلاة، أدوات PDF والصور ومولد QR كود — 65+ أداة بدون تسجيل.",
  keywords:    ["أدوات عربية","حاسبة الزكاة","تحويل التاريخ الهجري","مواقيت الصلاة","pdf عربي","arabic tools online"],
  metadataBase: new URL("https://arabictools.online"),
  openGraph: {
    siteName: "أدوات عربية",
    locale:   "ar_SA",
    type:     "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      dir="rtl"
      lang="ar"
      suppressHydrationWarning
      className={cairo.variable}
    >
      <body className="font-cairo bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <GdprBanner />
        </Providers>
      </body>
    </html>
  );
}
