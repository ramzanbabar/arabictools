import Link from "next/link";
import { TOOLS, TOOL_CATEGORIES, getPopularTools } from "@/lib/tools";
import { getTodayHijri } from "@/lib/arabic/hijri";

export default function HomePage() {
  const popularTools = getPopularTools();
  const hijriDate = getTodayHijri();

  return (
    <div dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">65+</span> أداة عربية مجانية
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            حاسبة الزكاة، تحويل الهجري، مواقيت الصلاة، أدوات PDF والصور ومولد QR كود — جميعها تعمل في متصفحك بدون تسجيل
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools/haasibat-alzakat"
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
            >
              حاسبة الزكاة
            </Link>
            <Link
              href="/tools/tahweel-altaareekh"
              className="px-6 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-colors"
            >
              تحويل الهجري
            </Link>
          </div>
          <p className="mt-8 text-gray-500 dark:text-gray-400">
            📅 {hijriDate}
          </p>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            الأدوات الأكثر استخداماً
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.slice(0, 8).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all group"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {tool.nameAr}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {tool.descriptionAr}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            جميع الأقسام
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => {
              const categoryTools = TOOLS.filter(t => t.category === key);
              return (
                <div
                  key={key}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-bold text-xl mb-4">{cat.nameAr}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {categoryTools.length} أداة
                  </p>
                  <ul className="space-y-2">
                    {categoryTools.slice(0, 5).map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                        >
                          {tool.nameAr}
                        </Link>
                      </li>
                    ))}
                    {categoryTools.length > 5 && (
                      <li>
                        <Link
                          href={`/?category=${key}`}
                          className="text-sm text-primary hover:underline"
                        >
                          +{categoryTools.length - 5} المزيد
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            لماذا أدوات عربية؟
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">مجانية 100%</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                جميع الأدوات مجانية بدون رسوم أو اشتراكات
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">بدون تسجيل</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                استخدم مباشرة دون إنشاء حساب
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">معالجة محلية</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ملفاتك لا تغادر جهازك أبدًا
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">عربي بالكامل</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                واجهة عربية مع دعم RTL كامل
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            جميع الأدوات
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all"
              >
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {tool.nameAr}
                  {tool.isNew && (
                    <span className="ms-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                      جديد
                    </span>
                  )}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
