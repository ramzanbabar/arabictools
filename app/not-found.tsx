import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" dir="rtl">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. قد يكون الرابط قديماً أو تمت كتابته بشكل خاطئ.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
          >
            العودة للرئيسية
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            الإبلاغ عن مشكلة
          </Link>
        </div>
      </div>
    </div>
  );
}
