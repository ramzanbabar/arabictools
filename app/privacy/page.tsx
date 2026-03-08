import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">سياسة الخصوصية</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          آخر تحديث: يناير 2026
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">مقدمة</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            نحن في «أدوات عربية» نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام موقعنا الإلكتروني. نحن نؤمن بأن خصوصيتك مهمة، ونحن ملتزمون بحماية البيانات الشخصية وفقًا لأفضل الممارسات والقوانين المعمول بها، بما في ذلك نظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">المعلومات التي نجمعها</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            موقعنا مصمم للعمل محليًا في متصفحك، مما يعني أن معظم المعالجات تتم على جهازك دون إرسال بيانات إلى خوادمنا. ومع ذلك، قد نجمع بعض المعلومات المحدودة:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 pe-4">
            <li>بيانات الاستخدام المجهولة: مثل الصفحات التي تزورها والوقت الذي تقضيه على الموقع</li>
            <li>ملفات تعريف الارتباط (Cookies): لتحسين تجربة المستخدم وتذكر تفضيلاتك</li>
            <li>عنوان IP: لأغراض الأمان وتحليل حركة المرور</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">كيف نستخدم معلوماتك</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            نستخدم المعلومات التي نجمعها للأغراض التالية:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 pe-4">
            <li>تحسين خدماتنا وتجربة المستخدم</li>
            <li>تحليل استخدام الموقع لتحديد المجالات التي تحتاج إلى تحسين</li>
            <li>عرض الإعلانات ذات الصلة (مع موافقتك)</li>
            <li>حماية الموقع من الأنشطة الضارة</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">ملفات تعريف الارتباط</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك التحكم في استخدام ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك أو من خلال لوحة الموافقة على موقعنا. نستخدم أنواعًا مختلفة من ملفات تعريف الارتباط، بما في ذلك ملفات تعريف الارتباط الضرورية للعمل الأساسي للموقع، وملفات تعريف الارتباط التحليلية لفهم كيفية استخدام الموقع، وملفات تعريف الارتباط الإعلانية لعرض إعلانات مخصصة.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">حقوقك</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            بموجب نظام حماية البيانات الشخصية، لديك الحقوق التالية:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 pe-4">
            <li>الحق في الوصول إلى بياناتك الشخصية</li>
            <li>الحق في تصحيح البيانات غير الدقيقة</li>
            <li>الحق في حذف بياناتك الشخصية</li>
            <li>الحق في الاعتراض على معالجة بياناتك</li>
            <li>الحق في سحب الموافقة في أي وقت</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">الأمان</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            نتخذ إجراءات أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف. يستخدم موقعنا تشفير SSL/TLS لحماية البيانات أثناء النقل، ونحن نقوم بمراجعة منتظمة لممارساتنا الأمنية لضمان حماية بياناتك.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">روابط خارجية</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية لتلك المواقع. ننصحك بمراجعة سياسة الخصوصية الخاصة بكل موقع تزوره.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">التغييرات على سياسة الخصوصية</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بنشر أي تغييرات على هذه الصفحة مع تحديث تاريخ «آخر تحديث». ننصحك بمراجعة هذه السياسة بشكل دوري للبقاء على اطلاع بأي تغييرات.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">اتصل بنا</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارساتنا المتعلقة بالبيانات، يرجى التواصل معنا عبر صفحة{" "}
            <a href="/contact" className="text-primary hover:underline">اتصل بنا</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
