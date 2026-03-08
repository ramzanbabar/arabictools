import Link from "next/link";
import { TOOL_CATEGORIES } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-primary">أدوات</span>
              <span className="text-gray-900 dark:text-white">عربية</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              أكثر من 65 أداة عربية مجانية بدون تسجيل. جميع المعالجات تتم في متصفحك.
            </p>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-bold mb-4">أدوات شائعة</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/tools/haasibat-alzakat" className="hover:text-primary">حاسبة الزكاة</Link></li>
              <li><Link href="/tools/mawaqeet-assalah" className="hover:text-primary">مواقيت الصلاة</Link></li>
              <li><Link href="/tools/tahweel-altaareekh" className="hover:text-primary">تحويل الهجري</Link></li>
              <li><Link href="/tools/qr-rabat-mawqie" className="hover:text-primary">مولد QR كود</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">الأقسام</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {Object.entries(TOOL_CATEGORIES).slice(0, 5).map(([key, cat]) => (
                <li key={key}>
                  <Link href={`/?category=${key}`} className="hover:text-primary">{cat.nameAr}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">روابط</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/about" className="hover:text-primary">عن الموقع</Link></li>
              <li><Link href="/contact" className="hover:text-primary">اتصل بنا</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="hover:text-primary">الشروط والأحكام</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} أدوات عربية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
