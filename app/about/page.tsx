import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن الموقع",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">عن أدوات عربية</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">من نحن</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            «أدوات عربية» هو موقع متخصص يقدم أكثر من 65 أداة مجانية مصممة خصيصًا للمستخدمين العرب. نؤمن بأن الجميع يستحق الوصول إلى أدوات رقمية عالية الجودة دون الحاجة إلى الدفع أو التسجيل. بدأنا رحلتنا في عام 2024 بهدف وحيد: توفير أدوات رقمية موثوقة ومجانية للمجتمع العربي، واليوم نخدم آلاف المستخدمين يوميًا من جميع أنحاء العالم العربي.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">رسالتنا</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            تمكين المستخدمين العرب من أدوات رقمية متقدمة ومجانية تعمل مباشرة في المتصفح دون الحاجة إلى تسجيل أو تثبيت برامج. نسعى لأن نكون المصدر الأول للأدوات العربية على الإنترنت، ونلتزم بتقديم تجربة مستخدم سلسة وآمنة. رسالتنا هي سد الفجوة الرقمية وتوفير حلول عملية للتحديات اليومية التي يواجهها المستخدمون العرب في حياتهم الشخصية والمهنية.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">لماذا أدوات عربية؟</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">مجانية 100%</h3>
              <p className="text-gray-600 dark:text-gray-400">
                جميع أدواتنا مجانية بالكامل بدون رسوم خفية أو اشتراكات. نؤمن بأن الأدوات الأساسية يجب أن تكون متاحة للجميع.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">بدون تسجيل</h3>
              <p className="text-gray-600 dark:text-gray-400">
                استخدم الأدوات مباشرة دون إنشاء حساب أو تقديم معلومات شخصية. نحترم خصوصيتك ووقتك.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">معالجة محلية</h3>
              <p className="text-gray-600 dark:text-gray-400">
                جميع المعالجات تتم في متصفحك، مما يعني أن ملفاتك لا تغادر جهازك أبدًا. خصوصيتك وأمان بياناتك أولويتنا القصوى.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">دعم اللغة العربية</h3>
              <p className="text-gray-600 dark:text-gray-400">
                واجهة عربية كاملة مع دعم للاتجاه من اليمين لليسار (RTL) وخطوط عربية محسنة لتجربة قراءة مثالية.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">فئات الأدوات</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            نقدم مجموعة واسعة من الأدوات المصنفة في عدة فئات لتلبية احتياجاتك المختلفة:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 pe-4">
            <li><strong>أدوات النصوص العربية:</strong> عداد الكلمات، إزالة التشكيل، تحويل الأرقام إلى كلمات، وغيرها</li>
            <li><strong>الحاسبات:</strong> حاسبة الزكاة، مواقيت الصلاة، حاسبة ضريبة القيمة المضافة، ومؤشر كتلة الجسم</li>
            <li><strong>أدوات PDF:</strong> دمج وتقسيم وضغط ملفات PDF وتحويلها إلى صور</li>
            <li><strong>أدوات الصور:</strong> ضغط وتغيير حجم وتحويل الصور بين الصيغ المختلفة</li>
            <li><strong>مولد QR كود:</strong> إنشاء رموز QR للروابط وواتساب والواي فاي</li>
            <li><strong>أدوات المطورين:</strong> منسق JSON، ترميز Base64، ومولد كلمات المرور</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">التزامنا بالجودة</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            نعمل باستمرار على تحسين أدواتنا وإضافة ميزات جديدة بناءً على ملاحظات المستخدمين. فريقنا من المطورين والمصممين يعملون على تحسين الأداء وإضافة أدوات جديدة بانتظام. نلتزم بأعلى معايير الجودة في تطوير أدواتنا، ونختبر كل أداة بدقة قبل نشرها لضمان عملها بشكل صحيح على مختلف الأجهزة والمتصفحات.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">الخصوصية والأمان</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            نأخذ خصوصيتك على محمل الجد. جميع أدواتنا تعمل محليًا في متصفحك، مما يعني أن بياناتك لا تغادر جهازك أبدًا. لا نخزن أي ملفات أو معلومات شخصية على خوادمنا. موقعنا متوافق مع نظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية ولائحة حماية البيانات في الإمارات. لمزيد من المعلومات، يرجى مراجعة{" "}
            <a href="/privacy" className="text-primary hover:underline">سياسة الخصوصية</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">تواصل معنا</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            نسعد بتلقي ملاحظاتك واقتراحاتك. إذا كان لديك أي سؤال أو اقتراح لأداة جديدة، لا تتردد في{" "}
            <a href="/contact" className="text-primary hover:underline">التواصل معنا</a>. نحن نقرأ كل رسالة ونأخذ ملاحظاتكم بعين الاعتبار عند تطوير الموقع.
          </p>
        </section>
      </div>
    </div>
  );
}
