import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">اتصل بنا</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">نحن هنا لمساعدتك</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نسعد بتلقي ملاحظاتك واستفساراتك. سواء كان لديك سؤال عن إحدى أدواتنا، أو اقتراح لأداة جديدة، أو تريد الإبلاغ عن مشكلة، فنحن هنا للمساعدة. فريق الدعم لديه متابعة يومية لجميع الرسائل الواردة، ونسعى للرد على جميع الاستفسارات في أقرب وقت ممكن.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">طرق التواصل</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">البريد الإلكتروني</h3>
                  <p className="text-gray-600 dark:text-gray-400">contact@arabictools.online</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">الموقع</h3>
                  <p className="text-gray-600 dark:text-gray-400">المنطقة العربية والخليج</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">أوقات الرد</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نسعى للرد على جميع الرسائل خلال 24-48 ساعة عمل. في حالة الاستفسارات العاجلة، يرجى ذكر ذلك في عنوان الرسالة. فريقنا يعمل من الأحد إلى الخميس، من الساعة 9 صباحًا حتى 5 مساءً بتوقيت الرياض.
            </p>
          </section>
        </div>

        <div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">أرسل لنا رسالة</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">الاسم</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="أدخل بريدك الإلكتروني"
                  dir="ltr"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">الموضوع</label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">اختر الموضوع</option>
                  <option value="question">استفسار عام</option>
                  <option value="suggestion">اقتراح أداة جديدة</option>
                  <option value="bug">الإبلاغ عن مشكلة</option>
                  <option value="business">شراكة تجارية</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">الرسالة</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
